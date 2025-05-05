import { Link, useNavigate } from "react-router-dom";
import { toggleSidenav } from "./Garage"
import { postWithAuth } from "../../helpers/http";

export default () => {
  const nav = useNavigate();

  const signOut = () => {
    postWithAuth('/sign-out', {}, true)

    nav('/a/sign-in');
  }

  return (
    <div className="sidenav flex">
      <div className="sidenav__top">
        <div className="sidenav__top__item flex flex--a-center" onClick={toggleSidenav}>
          <div className="sidenav__top__item__icon">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Close</p>
          </div>
        </div>

        <Link to="/a/garages" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa fa-industry" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Garages</p>
          </div>
        </Link>
        <Link to="/a/employees" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-solid fa-users" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Employees</p>
          </div>
        </Link>
        <Link to="/a/users" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-solid fa-users" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Drivers</p>
          </div>
        </Link>
        <Link to="/a/requests" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-regular fa-file-lines" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Requests</p>
          </div>
        </Link>
        {/* <Link to="/a/payments" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-solid fa-file-invoice-dollar" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Payments</p>
          </div>
        </Link> */}
        <Link to="/a/services" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-solid fa-store" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Services</p>
          </div>
        </Link>
      </div>

      <div className="sidenav__bottom">
        {/* <div className="sidenav__bottom__item flex flex--a-center">
          <div className="sidenav__bottom__item__icon">
            <i className="fa fa-cog" aria-hidden="true"></i>
          </div>
          <div className="sidenav__bottom__item__text">
            <p>Settings</p>
          </div>
        </div> */}

        <div className="sidenav__bottom__item flex flex--a-center hover" onClick={signOut}>
          <div className="sidenav__bottom__item__icon">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </div>
          <div className="sidenav__bottom__item__text">
            <p>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  )
}