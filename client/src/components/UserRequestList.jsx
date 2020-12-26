import { useQuery } from "@apollo/client"
import {useHistory} from 'react-router-dom'
import { GET_USER_REQUESTS } from "../query/"

export function UserRequestList() {
  const history = useHistory()
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  console.log(userInfo)
  const { loading, error, data } = useQuery(GET_USER_REQUESTS, {
    variables: { _id: userInfo._id },
  })

  function goToRequestDetail(_id) {
    history.push(`/customer/premi/${_id}`)
  }

  if(loading) return null

  if(data.findUserRequests.length === 0 ) return(
    <div>
      <h1>No Requests found</h1>
    </div>
  )

  return (
  <div className="w-full">
    
    {/* {JSON.stringify(data)} */}

    <table className="w-full">
      <thead>
        <tr className="bg-gray-700 text-white font-bold">
          <th className="py-2">No Polis</th>
          <th>Jenis Penanggungan</th>
          <th>No Invoice</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {
          data.findUserRequests?.map(request => {
            return(
              <tr className="bg-gray-100 text-center">
                <td className="py-3">{request.polis?request.polis:'Belum Terbit'}</td>
                <td>Asuransi Kebakaran</td>
                <td>{request.invoice}</td>
                <td>{request.status==="approved"?'Sudah Dibayar':'Belum Dibayar'}</td>
                <td><button className="bg-green-200 px-5 py-1" onClick={() => {goToRequestDetail(request._id)}}>Cek Rincian</button></td>
              </tr>
            )
          })
        }


      </tbody>
    </table>
  
  </div>
  
  )
}
