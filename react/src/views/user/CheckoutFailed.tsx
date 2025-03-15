import { Link } from "react-router-dom";
import Authenticator from "../auth/Authenticator"

import "./CheckoutSuccess.css"

export default () => {
  return (
    <Authenticator type="user">
      <Message />
    </Authenticator>
  )
}

function Message() {
  return (
    <div className="checkout-msg flex flex--a-center">
      <img src="/illustration/error.svg" alt="Error image" />
      <div className="checkout-msg__details">
        <h4>Payment failed!</h4>
        <h1>Could not process payment!</h1>
        <p>Continue to requests <span style={{ color: '#1e00ff' }}><Link to={`/u/requests`}>here</Link></span></p>
      </div>
    </div>
  )
}