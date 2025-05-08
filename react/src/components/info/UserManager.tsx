import { Link, useNavigate } from "react-router-dom"
import Authenticator from "../../views/auth/Authenticator"
import Header from "../header/UserHeader"
import Sidenav from "../sidenav/Sidenav"
import { postWithAuth } from "../../helpers/http"

import "./info.css"

export default ({ children }: any) => {
  const nav = useNavigate();

  const signOut = () => {
    postWithAuth('/sign-out', {}, true)

    nav('/sign-in');
  }

  return (
    <Authenticator type="user">
      <Header/>
      <Sidenav/>
      <div className="info">
        <div id="dropdown-menu" className="dropdown-menu">
          <p><Link to="/u/requests">Requests</Link></p>
          <p><Link to="/u/chat">Chat</Link></p>
          <p onClick={signOut}>Sign Out</p>
        </div>
        {children}
      </div>
    </Authenticator>
  )
}