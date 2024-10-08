import { loadScript } from "@paypal/paypal-js";
import { useNavigate } from "react-router-dom";
import { postWithAuth } from "../../helpers/http";
import { getQuery } from "../../helpers/URL";

export default () => {
  const nav = useNavigate();

  loadScript({ "clientId": "AZWCyYW2rW0pqEAwLOEbgjG5TAhM6vwpJCofVTvWNCpwZaAO9joZp3rVIKjagErBrvF9mevimAyqQhCK" })
    .then(async (paypal: any) => {
      if (!paypal) return;

      const res = await postWithAuth('/requests/get/by/id', {
        requestId: getQuery('request')
      })
      
      // const uuid = uuidv4();

      paypal.Buttons({
        // Set up the transaction
        createOrder: async function (_: any, actions: any) {
          // await postWithAuth('/order/place', {
          //   transactionId: uuid
          // })

          return actions.order.create({
            purchase_units: [{
              amount: {
                value: Math.ceil(parseFloat(`${(res.request.price / 18)}`))
              }
            }]
          });
        },


        // Finalize the transaction
        onApprove: function (_: any, actions: any) {
          return actions?.order?.capture().then(async function (_: any) {

            await postWithAuth('/request/update/pay', {
              requestId: getQuery('request'),
              price: res.request.price
            })

            nav('/u/requests/pay/success')
          });
        }


      }).render('#paypal-button-container');
    })
    .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
    });

  return (
    <div className="btn-container" style={{ width: '40rem', margin: '15rem auto 0' }}>
      <h1>Service Payment</h1>
      <p style={{ marginBottom: '2rem' }}>Finalize payment for your requested service</p>
      <div id="paypal-button-container"></div>
    </div>
  )
}