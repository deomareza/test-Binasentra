import {AdminRequestList, AdminOkupasi} from '../components/'
import {useHistory} from 'react-router-dom'

export function AdminDashboard() {
  const history = useHistory()

  function adminLogout(){
    localStorage.clear()
    history.push('/login')
  }
  
  
  return(
    <div className="flex flex-col px-12 py-8">
      <div className="flex flex-row justify-between items-center">
      <h1 className="text-3xl mb-5">Admin Dashboard</h1>
      <button className="px-4 py-2 bg-red-300" onClick={adminLogout}>Logout</button>
      </div>

      <div className="w-1/4">
        <AdminOkupasi />
      </div>
      <div className="mt-8">
        <AdminRequestList />
      </div>
    </div>
  )
}