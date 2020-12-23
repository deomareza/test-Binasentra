import {useHistory} from 'react-router-dom'

export function Home() {
  const history = useHistory()

  function navigateTo(path){
    history.push(path)
  }
  return (
    <div className="flex flex-col px-12 justify-center items-center py-20">
      <h1 className="text-2xl text-center">Choose Dashboard</h1>
      <div className="mt-5 flex flex-row">
        <button
          onClick={() => navigateTo("/customer")}
          className="bg-gray-300 px-10 py-3"
        >
          Customer
        </button>
        <button
          onClick={() => navigateTo("/admin")}
          className="bg-green-200 px-10 py-3"
        >
          Admin
        </button>
      </div>
    </div>
  )
}
