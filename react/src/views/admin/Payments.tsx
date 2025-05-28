import { useEffect, useState } from "react";
import AdminManager from "../../components/info/AdminManager";
import { postWithAuth } from "../../helpers/http";

import "./Garage.css"

const getPayments = async (): Promise<any> => {
  const res = await postWithAuth('/payments/get', {})

  return res.payments;
}

export default () => {
  const [payments, setPayments] = useState([]) as any;

  useEffect(() => {
    (async () => {
      setPayments(await getPayments());
    })()
  }, [])

  return (
    <AdminManager>
      <div className="info__page-heading">
        <h1>Payments</h1>
        <p>Monitor all monitory transactions</p>
      </div>

      <div className="info__pad" style={{ padding: '0 15%' }}>
        <table className="table margin--top-2" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {
              payments?.map((payment: any, i: number) => (
                <tr key={payment._id}>
                  <td>{i + 1}</td>
                  <td>R{payment.price || '0'}</td>
                  <td>{payment.item}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* <div className="info__employees">
        {employees.map((item: any) => <EmployeeCard key={item.id} {...item} />)}
      </div> */}

    </AdminManager>
  )
}