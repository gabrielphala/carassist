import { useContext } from "react";
import { AuthContext } from "../../views/auth/Authenticator";
import "./header.css"
import { getElementById } from "../../helpers/dom";

import { cutstr } from "../../helpers/str";

export const openMainDropdownMenu = () => {
  if (getElementById('dropdown-menu').classList.contains('open')) {
    getElementById('dropdown-menu').classList.remove('open')

    return;
  }

  getElementById('dropdown-menu').classList.add('open')
}

export default () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="header flex flex--a-center flex--j-space-between">
      <div className="flex flex--a-center">
        <img src="/logo/logo.png" alt="" />
        <div>
          <p className="header__dash"><b>DASHBOARD</b></p>
          <p>Administrator</p>
        </div>
      </div>
      <div className="header__user flex flex--a-center">
        <p className="margin--right-1"><b>{cutstr(user.name)}</b></p>
        <i className="fa-solid fa-bars" onClick={openMainDropdownMenu}></i>
      </div>
    </header>
  )
}