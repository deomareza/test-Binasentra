import {Navbar, UserUpdate, UserRequestForm, UserCheckPremi} from '../components/'
import {useHistory, Switch, Route, useRouteMatch} from 'react-router-dom'
import {useQuery} from '@apollo/client'

export function CustomerDashboard() {
  const history = useHistory()
  const match = useRouteMatch()

  function navigateTo(path) {
    history.push(path)
  }
  return(
    <Switch>
      <Route path={`${match.path}/new-req/check`}>
        <UserCheckPremi />
      </Route>
      <Route path={`${match.path}/new-req`}>
        <UserRequestForm />
      </Route>
      <Route path={match.path}>
        <div className="flex flex-row justify-start items-center py-10">
          <div className="flex flex-col items-center w-2/3">
            <h1 className="text-2xl">Update Details</h1>
            <UserUpdate />
          </div>
          <button onClick={() => navigateTo(`${match.url}/new-req`)} className="bg-green-200 p-5">Submit New Request</button>
        </div>
      </Route>
    </Switch>
  )
}