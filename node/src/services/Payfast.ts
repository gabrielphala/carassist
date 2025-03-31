import hasher from "../helpers/Hasher";
import { urls } from "../globals";
import Payment from "../models/Payment";
import User from "../models/User";

let today = new Date();
export async function sign (body, user) {
  try {
    this.merchant_id =  ['development', 'staging'].includes(process.env.NODE_ENV) ? process.env.DEV_MERCH_ID : process.env.MERCH_ID;
    this.merchant_key =  ['development', 'staging'].includes(process.env.NODE_ENV) ? process.env.DEV_MERCH_KEY : process.env.MERCH_KEY;
    this.return_url = `${urls['BASE_PUBLIC']}/payments/payfast/success`;
    this.cancel_url = `${urls['BASE_PUBLIC']}/payments/payfast/cancel`;
    this.notify_url = `${urls['BASE_PUBLIC']}/payments/payfast/notify`;

    const payment = await Payment.add({
      user: user._id,
      item: body.item_name,
      price: body.price
    })

    this.m_payment_id = payment._id;
    this.amount = body.price
    this.item_name = body.item_name;

    console.log('ID', this.merchant_id);
    console.log('KEY', this.merchant_key);
    

    this.signature = hasher.signObject(new Map([
      ['merchant_id', this.merchant_id], // ,
      ['merchant_key', this.merchant_key], //,
      ['return_url', this.return_url],
      ['cancel_url', this.cancel_url],
      ['notify_url', this.notify_url],

      ['name_first', body.name_first],
      ['name_last', body.name_last],
      ['email_address', body.email_address],

      ['m_payment_id', payment._id],
      ['amount', this.amount],
      ['item_name', this.item_name],

      // ['payment_method', body.payment_method],
    ]),  ['development', 'staging'].includes(process.env.NODE_ENV) ? process.env.DEV_MERCH_PASSP : process.env.MERCH_PASSP);


  } catch (e) { throw e; }

  return this;
}

export async function updatePayment (body) {
  try {
    const payment = await Payment.updatePayment(body.m_payment_id, {
      status: body.payment_status,
      amount_gross: body.amount_gross,
      amount_fee: body.amount_fee,
      amount_net: body.amount_net
    })

    return this;

  } catch (e) { throw e; }
}