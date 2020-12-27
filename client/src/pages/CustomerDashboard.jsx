import {Navbar, UserUpdate, UserRequestForm, UserCheckPremi, UserRequestList} from '../components/'
import {useHistory, Switch, Route, useRouteMatch} from 'react-router-dom'
import {useQuery} from '@apollo/client'

export function CustomerDashboard() {
  const history = useHistory()
  const match = useRouteMatch()

  function navigateTo(path) {
    history.push(path)
  }

  function userLogout(){
    localStorage.clear()
    history.push('/login')
  }


  return(
    <Switch>
      <Route path={`/customer/premi/:id`}>
        <UserCheckPremi />
      </Route>
      
      <Route path={`${match.path}/new-req`}>
        <UserRequestForm />
      </Route>

      <Route path={match.path}>
        <div className="flex flex-col">
          <div className="flex flex-col justify-start items-center py-10">
              <div className="flex flex-row w-full justify-around items-center">
                <h1 className="text-3xl mb-8">Customer Dashboard</h1>

                <div>
                  <button onClick={() => navigateTo(`${match.url}/new-req`)} className="bg-green-200 px-5 py-2 mr-3">Submit New Request</button>
                  <button onClick={userLogout} className="bg-red-200 px-5 py-2">Logout</button>

                </div>
              </div>

              <div className="flex flex-row w-full px-20 mt-8">

                <div className="flex flex-col items-center bg-gray-100 p-4 w-1/4">
                  <h1 className="text-2xl">Update Details</h1>
                  <UserUpdate />
                </div>


                <div className="flex flex-col items-center w-3/4 mx-4">
                  <h1 className="text-2xl mb-5">User Request List</h1>
                  <UserRequestList />
                </div>

              </div>

          </div>
        </div>
      </Route>
    </Switch>
  )
}