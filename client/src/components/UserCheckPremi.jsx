import { client } from "../config/graphql"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { GET_ONE_REQUEST, GET_OKUPASI, GET_ONE_OKUPASI } from "../query/"
import { useQuery, useLazyQuery } from "@apollo/client"
import { premiDasar, adminFee, biayaTotal } from "../helpers/premiCalculate"
import { currencify } from "../helpers/currencify"

export function UserCheckPremi() {
  const { id } = useParams()
  const history = useHistory()
  const [
    getOneOkupasi,
    { loading: okupasiLoading, data: dataOku },
  ] = useLazyQuery(GET_ONE_OKUPASI)

  const { loading, error, data } = useQuery(GET_ONE_REQUEST, {
    variables: { _id: id },
    onCompleted: ({ findOneRequest }) => {
      getOneOkupasi({ variables: { _id: findOneRequest.okupasi } })
    },
  })

  function navigateTo(path) {
    history.push(path)
  }

  if (loading) return null

  if (!data || !dataOku) return null

  return (
    <div className="flex flex-col px-20 py-10 border">
      <h1 className="text-3xl mb-8">Premi Detail</h1>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl mb-5">Premi</h1>

          <h2>Asuransi Kebakaran</h2>
          <h2>Jenis Okupasi : {dataOku.findOneOkupasi.name}</h2>
          <h2>No. Invoice : {data.findOneRequest.invoice}</h2>
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl mb-5">Periode</h1>

          <h2>{data.findOneRequest.time} tahun</h2>
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl mb-5">Harga Bangunan</h1>

          <h2>Rp {currencify(data.findOneRequest.harga)}</h2>
        </div>
      </div>

      <div className="flex flex-col items-end mt-5">
        <h1 className="text-lg">
          Premi Dasar :{" "}
          <span>
            Rp.{" "}
            {currencify(
              premiDasar(
                data.findOneRequest.harga,
                dataOku.findOneOkupasi.rate,
                data.findOneRequest.time
              )
            )}
          </span>
        </h1>

        <h1 className="text-lg">
          Biaya Administrasi : <span>Rp. {currencify(adminFee)}</span>
        </h1>

        <h1 className="text-2xl mt-8">
          Total :{" "}
          <span>
            Rp.{" "}
            {currencify(
              biayaTotal(
                data.findOneRequest.harga,
                dataOku.findOneOkupasi.rate,
                data.findOneRequest.time
              )
            )}
          </span>
        </h1>
      </div>
      <div className="flex flex-row justify-between mt-10">
        <button
          onClick={() => {
            navigateTo("/customer")
          }}
          className="px-5 py-2 bg-yellow-200"
        >
          Back to Dashboard
        </button>
        {data.findOneRequest.status !== "approved" ? (
          <button className="px-5 py-2 bg-green-200 ">Pembayaran</button>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
