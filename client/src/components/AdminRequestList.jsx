import { useQuery, useMutation } from "@apollo/client"
import { GET_ALL_REQUESTS, GET_OKUPASI, ADMIN_UPDATE_STATUS } from "../query/"
import { currencify } from "../helpers/currencify"
import { biayaTotal } from "../helpers/premiCalculate"

export function AdminRequestList() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_REQUESTS)
  const { loading: loadingOku, data: dataOku } = useQuery(GET_OKUPASI)

  const [adminUpdateStatus] = useMutation(ADMIN_UPDATE_STATUS, {
    onCompleted: () => {
      refetch()
    },refetchQueries:[{query:GET_ALL_REQUESTS}]
  })

  const okupasiSearch = (value) => {
    return dataOku.okupasi.find((item) => item._id === value)
  }

  const unApprovedData = () => {
    return data.request.filter(el => el.status !== "approved")
  }

  function updateStatus(_id, invoice, status) {
    console.log(_id)
    adminUpdateStatus({ variables: { _id, invoice, status } })
  }


  if (loading || loadingOku) return null

  return (
    <div className="flex flex-col bg-gray-100 p-5">
      <h1 className="text-xl mb-2">Request List</h1>

      <table className="">
        <thead>
          <tr className="bg-gray-700 text-white font-bold">
            <th className="py-2">No Invoice</th>
            <th>Alamat</th>
            <th>Tipe Okupasi</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
          data.request?.map((request) => {
            return (
              <tr className="text-center py-2 bg-gray-200">
                <td>{request.invoice}</td>
                <td>{request.alamat}</td>
                <td>{okupasiSearch(request.okupasi).name}</td>
                <td>
                  Rp.{" "}
                  {currencify(
                    biayaTotal(
                      request.harga,
                      okupasiSearch(request.okupasi).rate,
                      request.time
                    )
                  )}
                </td>
                <td>{request.status}</td>
                <td>
                  <button onClick={()=>{updateStatus(request._id, request.invoice, "approved")}} className="bg-green-100 px-3 py-1 my-1">
                    Approve
                  </button>
                  <button onClick={()=>{updateStatus(request._id, request.invoice, "rejected")}} className="bg-red-200 px-3 py-1 my-1 ml-2">
                    Reject
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
