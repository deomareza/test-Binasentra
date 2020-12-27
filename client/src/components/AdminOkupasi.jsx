import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GET_OKUPASI, INSERT_OKUPASI, EDIT_OKUPASI } from "../query/"
import { currencify } from "../helpers/currencify"
import { biayaTotal } from "../helpers/premiCalculate"

export function AdminOkupasi() {
  const { loading, error, data, refetch } = useQuery(GET_OKUPASI)
  const [editMode, setEditMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [addInput, setAddInput] = useState({ name: "", rate: 0 })

  const [insertOkupasi] = useMutation(INSERT_OKUPASI, {
    refetchQueries: [{ query: GET_OKUPASI }],
    onCompleted: () => {
      refetch()
    }
  })

  if (loading) return null

  function toggleEdit() {
    if (editMode) {
      setEditMode(false)
    } else {
      setEditMode(true)
    }
  }
  function toggleAdd() {
    if (addMode) {
      setAddMode(false)
    } else {
      setAddMode(true)
    }
  }

  function cancelSubmit(){
    setAddInput({name:'', rate: 0})
    toggleAdd()
  }

  function handleInputChange(e) {
    let key = e.target.name
    let value = e.target.value

    if (key === "rate") value = +value

    setAddInput({ ...addInput, [key]: value })
  }

  function addOkupasi(e) {
    e.preventDefault()
    insertOkupasi({
      variables: {
        name: addInput.name,
        rate: addInput.rate,
      },
    })
    toggleAdd()
  }


  return (
    <div className="bg-blue-100 p-5">
      <h1 className="text-lg mb-4">Okupasi List</h1>

      {data.okupasi?.map((okupasi) => {
        return (
          <div className="flex flex-row justify-between">
            <h1>{okupasi.name}</h1>
            <h1>{okupasi.rate}</h1>
          </div>
        )
      })}

      {addMode ? (
        <form onSubmit={addOkupasi} className="flex flex-col px-2 mt-4">
          <h1>Add Okupasi</h1>
          <input
            onChange={handleInputChange}
            name="name"
            className="px-2 py-1"
            type="text"
            placeholder="Name"
          />
          <input
            onChange={handleInputChange}
            name="rate"
            className="mt-1 px-2 py-1"
            type="number"
            placeholder="Rate"
            min="0"
            max="3"
            step="0.0005"
          />
          <input className="mt-3 px-2 py-1" type="submit" />
          <button onClick={cancelSubmit} className="bg-red-200 mt-2">Cancel</button>
        </form>
      ) : (
        ""
      )}
      <button onClick={toggleAdd} className="bg-green-300 px-3 py-1 mt-4 mr-5">
        Add
      </button>
    </div>
  )
}
