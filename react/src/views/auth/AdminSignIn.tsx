import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postWithAuth } from "../../helpers/http";
import { getElementById, getValueById } from "../../helpers/dom";

import "./auth.css"
import { showError } from "../../helpers/error";

export default () => {
  const [isAuth, setAuth] = useState(null) as any;

  const nav = useNavigate();

  const signIn = async (e: any) => {
    (e as PointerEvent).preventDefault();
    getElementById('auth').style.pointerEvents = 'none';

    const res = await postWithAuth('/a/sign-in', {
      email: getValueById('email'),
      password: getValueById('password')
    }, true)

    setAuth(res.successful);

    getElementById('auth').style.pointerEvents = 'auto';

    if (res.error) {
      showError('auth', res.error)
    }
  }

  useEffect(() => {
    if (isAuth) nav(`/a/garages`);;
  }, [isAuth]);

  return (
    <div className="admin-login">
      <div className="admin-login__main">
        <h4>Administrator Sign In</h4>
        
        <form className="admin-login__main__form" onSubmit={signIn}>
          <div id="auth-error" className="error hide">
            <p><b>Sorry, </b><span className="error-msg"></span></p>
          </div>

          <div className="input">
            <input type="email" id="email" placeholder="Email address." />
          </div>

          <div className="input margin--top-2">
            <input type="password" id="password" placeholder="Password." />
          </div>

          <button id="auth" className="btn btn--primary margin--top-2">Sign in</button>

          <p className="admin-login__main__form__home margin--top-2"><Link to="/">Go home instead</Link></p>
        </form>
      </div>
    </div>
  )
}