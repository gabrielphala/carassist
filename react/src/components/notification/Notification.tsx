import { getElementById } from "../../helpers/dom";
import "./Notification.css";

export const showNotification = (msg: string, isError: boolean = true) => {
  const popup = getElementById('global-notification-popup')
  popup.classList.add('lr-notification-popup--open')

  getElementById('global-notification-popup-error-icon').style.display = isError ? 'inline-block' : 'none';
  getElementById('global-notification-popup-success-icon').style.display = !isError ? 'inline-block' : 'none'

  getElementById('global-notification-popup-msg').innerText = msg;
}

export const hideNotification = () => {
  const popup = getElementById('global-notification-popup')
  popup.classList.remove('lr-notification-popup--open')

  getElementById('global-notification-popup-msg').innerText = '';
}

const Notification = (props: any) => {
  return (
    <div className="lr-notification-popup pos--horizontal flex--j-space-between" id="global-notification-popup">
      <div className="margin--right-2 flex">
        <div className="lr-notification-popup__icon margin--right-1">
          <i className="fa-solid fa-triangle-exclamation" id="global-notification-popup-error-icon" style={{ color: '#940202' }}></i>
          <i className="fa-solid fa-check" id="global-notification-popup-success-icon"></i>
        </div>

        <p id="global-notification-popup-msg">Font awesome</p>
      </div>

      <div className="lr-notification-popup__icon hover pointer" onClick={hideNotification}>
        <i className="fa-solid fa-circle-xmark"></i>
      </div>
    </div>
  );
};

export default Notification;
