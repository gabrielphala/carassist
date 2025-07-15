import { Link, useNavigate } from "react-router-dom";
import { getChatCount, toggleSidenav } from "./Garage"
import { postWithAuth } from "../../helpers/http";
import { useEffect, useState } from "react";

export default () => {
  const [count, setCount] = useState<number>(0);
  const nav = useNavigate();

  const signOut = () => {
    postWithAuth('/sign-out', {}, true)

    nav('/sign-in');
  }

  useEffect(() => {
    (async () => { setCount(await getChatCount()) })()
  }, [])

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

        <Link to={"/u/requests"} className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-regular fa-file-lines" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Requests</p>
          </div>
        </Link>

        <Link to={"/u/chat"} className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon pos--rel">
            <i className="fa-regular fa-comments" aria-hidden="true"></i>
            <p className="pos--abs" style={{
              top: '-1rem',
              right: '1rem',
              color: '#acacac'
            }} id="chat-count">{count}</p>
          </div>
          <div className="sidenav__top__item__text">
            <p>Inbox</p>
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