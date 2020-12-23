import {Link} from 'react-router-dom'

export function Navbar() {
  return(
    <nav className="flex flex-row py-3 px-10 bg-gray-100">
      <Link to="/customer">User Dashboard</Link>
      <div className="ml-5">|</div>
      <Link className="ml-5" to="/admin">Admin Dashboard</Link>
    </nav>
  )
}