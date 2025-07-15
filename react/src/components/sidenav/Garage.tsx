import { Link, useNavigate } from "react-router-dom"
import { $cls } from "../../helpers/dom"
import { postWithAuth } from "../../helpers/http"
import { useEffect, useState } from "react"

export const getChatCount = async () => {
  const res = await postWithAuth('/chat/get/count', {})

  return res.count || 0;
}

export const toggleSidenav = () => {
  let sidenav = $cls('sidenav')[0]

  let header = $cls('header')[0]
  let info = $cls('info')[0]

  if (!sidenav.classList.contains('sidenav--open')) {
    header.classList.add('header--open');
    info.classList.add('info--open');
    sidenav.classList.add('sidenav--open')

    return;
  }

  header.classList.remove('header--open');
  info.classList.remove('info--open');
  sidenav.classList.remove('sidenav--open')
}

export default () => {
  const [count, setCount] = useState<number>(0);
  const nav = useNavigate();

  const signOut = () => {
    postWithAuth('/sign-out', {}, true)

    nav('/g/sign-in');
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

        <Link to="/g/requests" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-regular fa-file-lines" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Requests</p>
          </div>
        </Link>
        <Link to={"/g/chat"} className="sidenav__top__item flex flex--a-center">
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
        <Link to="/g/services" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-solid fa-store" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Services</p>
          </div>
        </Link>
        <Link to="/g/employees" className="sidenav__top__item flex flex--a-center">
          <div className="sidenav__top__item__icon">
            <i className="fa-solid fa-users" aria-hidden="true"></i>
          </div>
          <div className="sidenav__top__item__text">
            <p>Employees</p>
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