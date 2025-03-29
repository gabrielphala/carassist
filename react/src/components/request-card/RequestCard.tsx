import { Link } from "react-router-dom"
import { formatTime } from "../../helpers/date"
import { cutstr } from "../../helpers/str";
import { getUserBySession, postWithAuth } from "../../helpers/http";
import { useEffect, useState } from "react";
import "./request-card.css"

export default (props: any) => {
  const [user, setUser] = useState<any>(null);

  let start = props.isGarage ? props.employeeLocation : props.location;
  let end = !props.isGarage ? props.employeeLocation : props.location;

  useEffect(() => {
    (async () => {
      setUser(await getUserBySession())
    })()
  }, [])

  const addToForm = (value: string, name: string, form: HTMLFormElement) => {
    let input = document.createElement('input');
    input.value = value
    input.type = 'hidden'
    input.name = name;

    form.appendChild(input)
  }

  const sign = async (e: any) => {
    e.preventDefault();

    const res = await postWithAuth('/payments/payfast/sign', {
      name_first: user?.firstName,
      name_last: user?.lastName,
      email_address: user?.email,
      price: props.price,
      item_name: `Car Assist Hub - ${props.service}`
    });

    addToForm(res.merchant_id, 'merchant_id', e.target);
    addToForm(res.merchant_key, 'merchant_key', e.target);
    addToForm(res.return_url, 'return_url', e.target);
    addToForm(res.cancel_url, 'cancel_url', e.target);
    addToForm(res.notify_url, 'notify_url', e.target);

    addToForm(user.firstName, 'name_first', e.target);
    addToForm(user.lastName, 'name_last', e.target);
    addToForm(user.email, 'email_address', e.target);

    addToForm(res.m_payment_id, 'm_payment_id', e.target);
    addToForm(props.price, 'amount', e.target);
    addToForm(`Car Assist Hub - ${props.service}`, 'item_name', e.target);

    addToForm(res.signature, 'signature', e.target);

    e.target.submit()
  }

  return (
    <div className="request-card">
      <div className="flex" style={{ padding: "1rem 1rem .5rem" }}>
        <div className="request-card__icon margin--right-1">
          {
            <i className="fa fa-industry"></i>
          }
        </div>
        <div className="request-card__details">
          <p><b>{props.service}</b></p>
          <p>{props.isGarage ? props?.requester.name : props?.garage.name}</p>
          <p>{formatTime(new Date(props.createdAt))}</p>
          {(props.employee && <p>Assigned to {cutstr(props.employee.name)}</p>) || <p>Waiting for employee</p>}
        </div>
      </div>
      <div className="flex flex--a-center flex--j-space-between" style={{
        padding: ".5rem 1rem .3rem",
        backgroundColor: "#d6e9f9"
      }}>
        <p>
          {props.isAccepted ? 'Accepted' : (props.isDeclined ? 'Declined' : 'Pending')}
        </p>
        {
          !props.hasPaid && !props.isGarage && (
            <form action="https://www.payfast.co.za/eng/process" onSubmit={sign} method="post">
              <input type="submit" id="submit-btn" style={{ border: 'none', background: 'transparent', padding: '0rem' }} value="Pay now" />
            </form>
            // <span style={{ marginLeft: '2rem' }}><Link to={`/u/requests/pay?request=${props._id}`}>Pay now</Link></span>
          )

        }
        <p><span onClick={() => props.calcRoute(start, end)}>Track</span></p>
        {
          props.employee ?
            <p><Link to={`/${props.isGarage ? 'g' : 'u'}/chat?r=${props.isGarage ? props.requester._id : props.employee._id}&a=${props._id}`}>Chat</Link></p> :
            <></> 
        }
        {
          (!props.isAccepted && !props.isDeclined && props.isGarage) ? (
            <p>
              <span className="margin--right-2" onClick={() => props.accept(props._id)}>Accept</span>
              <span onClick={() => props.decline(props._id)}>Decline</span>
            </p>
          ) :
          (!props.employee && props.isGarage) ? (
            <p><i className="fa-solid fa-user-plus" onClick={(e: any) => props.showEmployees(e, props._id)}></i></p>
          ) :
            (<></>)
        }
      </div>
    </div>
  )
}