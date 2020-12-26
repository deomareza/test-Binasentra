import "./App.css"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { Navbar } from "./components/"
import { Home, AdminDashboard, CustomerDashboard, Login } from "./pages/"
import { ApolloProvider } from "@apollo/client"
import { client } from './config/graphql'
 

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={ client }>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <AdminDashboard />
          </Route>
          <Route path="/customer">
            <CustomerDashboard />
          </Route>
          <Route path="/customer/premi">
            <CustomerDashboard />
          </Route>
          <Route exact path="/">
            { localStorage.getItem('userInfo')?<Redirect to="/customer"/>:<Redirect to="/login" />}
          </Route>
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
