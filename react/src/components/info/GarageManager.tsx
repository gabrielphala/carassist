import { Link, useNavigate } from "react-router-dom"
import Authenticator from "../../views/auth/Authenticator"
import Header from "../header/Header"
import Sidenav from "../sidenav/Garage"

import "./info.css"
import { postWithAuth } from "../../helpers/http"

export default ({ children }: any) => {
  const nav = useNavigate();

  const signOut = () => {
    postWithAuth('/sign-out', {}, true)

    nav('/g/sign-in');
  }

  return (
    <Authenticator type="garage">
      <Header/>
      <Sidenav/>
      <div className="info">
        <div id="dropdown-menu" className="dropdown-menu">
          <p><Link to="/g/requests">Requests</Link></p>
          <p><Link to="/g/services">Services</Link></p>
          <p><Link to="/g/employees">Employees</Link></p>
          <p><Link to="/g/chat">Chat</Link></p>
          <p onClick={signOut}>Sign Out</p>
        </div>
        {children}
      </div>
    </Authenticator>
  )
}