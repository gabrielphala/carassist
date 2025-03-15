import axios from "axios";

export const sendSMS = (to: string, message: string) => {
  const accountSid = process.env.TWILLO_ACC;
  const authToken = process.env.TWILLO_TOK; // Replace with your auth token
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const data = new URLSearchParams({
    To: to,
    MessagingServiceSid: process.env.TWILLO_MSG,
    Body: message
  });

  axios.post(url, data, {
    auth: {
      username: accountSid,
      password: authToken
    }
  })
  .then(response => {
    // console.log('Message sent successfully:', response.data);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
}