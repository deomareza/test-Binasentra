import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GET_ONE_USER, UPDATE_USER } from "../query/"

export function UserUpdate() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  console.log(userInfo._id, '<< user info id')
  const [userInput, setUserInput] = useState({ name: "", email: "" })
  const { loading, error, data } = useQuery(GET_ONE_USER, {
    variables: { 
      _id: userInfo._id 
    },
  })

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ONE_USER }]
  })

  useEffect(() => {
    if(data) {
      setUserInput({
        name: data.findOneUser.name,
        email: data.findOneUser.email
      })
    }
  }, [data])

  function handleUserUpdate(e) {
    e.preventDefault()
    updateUser({
      variables: {
        _id: userInfo._id,
        data: {
          name: userInput.name,
          email: userInput.email
        }
      }
    })
  }

  function handleInput(e) {
    let key = e.target.name
    let value = e.target.value

    setUserInput({...userInput, [key] : value})
    console.log(userInput)
  }

  if (loading) return null

  return (
    <form className="mt-5 flex flex-col items-center">
      <div className="flex flex-col my-2">
        <label>Name</label>
        <input
          className="border px-1 py-2"
          onChange={handleInput}
          type="text"
          name="name"
          defaultValue={data.findOneUser.name}
        />
      </div>
      <div className="flex flex-col my-2">
        <label>Email</label>
        <input
          className="border px-1 py-2"
          onChange={handleInput}

          type="email"
          name="email"
          defaultValue={data.findOneUser.email}
        />
      </div>
      <button onClick={handleUserUpdate} className="p-2 bg-green-200 mt-5" type="submit">
        Update Data
      </button>
    </form>
  )
}
