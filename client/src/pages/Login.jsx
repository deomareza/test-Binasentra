import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {useQuery, useLazyQuery} from '@apollo/client'
import {GET_USERS, USER_LOGIN} from '../query/'

export function Login() {
  // const { loading, error, data } = useQuery(GET_USERS)
  const history = useHistory()
  const [inputEmail, setInputEmail] = useState('')
  const [ userLogin, {loading, data: userData} ] = useLazyQuery(USER_LOGIN)


  useEffect(() => {
    if(userData && userData.userLogin) {
      let userInfo = {
        _id : userData.userLogin._id,
        role : userData.userLogin.role
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      switch (userData.userLogin.role) {
        case 'customer':

          console.log('customer')
          history.push('/customer')
          break;
      
        case 'admin' : 
          console.log('admin')
          history.push('/admin')
          break;
      }
    }
  }, [loading, userData] )

  function handleInput(e) {
    setInputEmail(e.target.value)
  }

  function test(){
    console.log(localStorage.getItem('userInfo'))
  }

  function handleLogin(e) {
    e.preventDefault()
    userLogin({
      variables: {
        email: inputEmail
      }
    })
    
  }

  return(
    <div className="flex px-8 py-10 justify-center">
      <div className="flex flex-col justify-center items-center border">
        <h1 className="text-2xl py-12">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col items-center p-12">
          <label>Email</label>
          <input className="border px-5 py-2" onChange={handleInput} type="email"/>
          <input className="px-8 py-2 mt-5" type="submit" />
        </form>
      </div>
    </div>
  )
}