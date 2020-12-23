import { useState } from "react"
import { useMutation } from "@apollo/client"
import { useHistory} from 'react-router-dom'
import {client} from '../config/graphql'
import { ADD_ONE_REQUEST, GET_PREMI } from "../query/"

export function UserRequestForm() {
  const history = useHistory()
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const [addRequest] = useMutation(ADD_ONE_REQUEST)

  const [formInput, setFormInput] = useState({
    time: 1,
    okupasi: "rumah",
    harga: 0,
    konstruksi: "kelas 1",
    alamat: "",
    provinsi: "",
    kota: "",
    kabupaten: "",
    daerah: "",
    gempa: false,
    status: "pending"
  })

  const [inputError, setInputError] = useState(false)

  function handleInputChange(e) {
    let key = e.target.name
    let value = e.target.value

    setInputError(false)

    if (key === "time" || key === "harga") {
      value = +value
    }

    if (key === "gempa") {
      e.target.checked ? (value = true) : (value = false)
    }

    setFormInput({ ...formInput, [key]: value })
  }

  function checkFormInput() {
    for (const key in formInput) {
      if (formInput[key] === "" || formInput[key] === "0") {
        setInputError(true)
        return false
      }
    }

    return true
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    client.writeQuery({
      query: GET_PREMI,
      data: {
        premi: formInput
      }
    })
    // if (checkFormInput()) {

    //   addRequest({
    //     variables: {
    //       _id: userInfo._id,
    //       data: formInput,
    //     },
    //   })
    // }
  }

  return (
    <div className="flex px-12 py-5">
      <div className="w-full border">
        <h1 className="text-2xl mb-5 text-center py-5">
          Form Request Asuransi Kebakaran
        </h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col mx-14">
          <label>Jangka Waktu Pertanggungan</label>
          <select
            onChange={handleInputChange}
            name="time"
            className="border mb-4"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <label>Okupansi</label>
          <select
            onChange={handleInputChange}
            name="okupansi"
            className="border  mb-4"
          >
            // need to loop
            <option value="rumah">Rumah</option>
            <option value="ruko">Rumah</option>
          </select>

          <label>Harga Bangunan</label>
          <input
            onChange={handleInputChange}
            name="harga"
            type="number"
            min="0"
            placeholder="0"
            className="border  mb-4"
          />

          <label>Konstruksi</label>
          <select
            onChange={handleInputChange}
            name="konstruksi"
            className="border mb-4"
          >
            <option value="kelas 1">Kelas 1</option>
            <option value="kelas 2">Kelas 2</option>
            <option value="kelas 3">Kelas 3</option>
          </select>

          <label>Alamat Objek Pertanggungan</label>
          <input
            onChange={handleInputChange}
            name="alamat"
            className="border  mb-4"
            type="text"
          />

          <label>Provinsi</label>
          <input
            onChange={handleInputChange}
            name="provinsi"
            className="border  mb-4"
            type="text"
          />

          <label>Kota</label>
          <input
            onChange={handleInputChange}
            name="kota"
            className="border  mb-4"
            type="text"
          />

          <label>Kabupaten</label>
          <input
            onChange={handleInputChange}
            name="kabupaten"
            className="border  mb-4"
            type="text"
          />

          <label>Daerah</label>
          <input
            onChange={handleInputChange}
            name="daerah"
            className="border  mb-4"
            type="text"
          />

          <label>Gempa Bumi</label>
          <input
            onChange={handleInputChange}
            name="gempa"
            className="border  mb-4"
            type="checkbox"
          />
          {inputError ? (
            <h1 className="text-red-600">Please fill all input</h1>
          ) : (
            ""
          )}

          <input type="submit" value="Cek Premi" />
        </form>
        <button onClick={() => history.push('/customer/new-req/check')}>Go to Next Page</button>
      </div>
    </div>
  )
}
