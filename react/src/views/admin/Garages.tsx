import { useEffect, useState } from "react";
import AdminManager from "../../components/info/AdminManager";
import { BASEURL, postWithAuth } from "../../helpers/http";

import "./Garage.css"

const getGarages = async (): Promise<any> => {
  const res = await postWithAuth('/garages/get/unverified', {})

  return res.garages;
}

export async function downloadImage(filename: string) {
  const url = await (await fetch(`${BASEURL()}/assets/uploads/documents/${filename}`)).text()

  const link = document.createElement('a')
  link.href = url
  link.download = 'Registration document'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default () => {
  const [garages, setGarages] = useState([]) as any;

  useEffect(() => {
    (async () => {
      setGarages(await getGarages());
    })()
  }, [])

  const acceptGarage = async (garageId: string) => {
    await postWithAuth('/garages/accept', {
      garageId
    })

    setGarages(await getGarages());
  }

  const declineGarage = async (garageId: string) => {
    await postWithAuth('/garages/decline', {
      garageId
    })

    setGarages(await getGarages());
  }

  return (
    <AdminManager>
      <div className="info__page-heading">
        <h1>Garages</h1>
        <p>Accept or Decline garages</p>
      </div>

      <div className="info__pad" style={{ padding: '0 15%' }}>
        <h4>Verification.</h4>
        <p>Verify garages</p>

        <table className="table margin--top-2" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Garage</th>
              <th>Location</th>
              <th>Registration Number</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              garages?.map((garage: any, i: number) => (
                <tr key={garage._id}>
                  <td>{i + 1}</td>
                  <td>{garage.name}</td>
                  <td>{garage.locationName}</td>
                  <td>{garage.registrationNumber}</td>
                  <td className="flex" style={{ justifyContent: 'flex-end' }}>
                    <span style={{ marginRight: '1rem' }}>
                      {!garage.isRegistrationDocumentPhoto ?
                        (<a href={`${BASEURL()}/assets/uploads/documents/${garage.registrationDocument}`} download={true}>Download Document</a>) :
                        (<p onClick={() => downloadImage(garage.registrationDocument)}>Download document</p>)
                      }
                    </span>
                    <span onClick={() => acceptGarage(garage._id)} style={{ color: 'blue' }} className="margin--right-1 hover">Accept</span>
                    <span onClick={() => declineGarage(garage._id)}  style={{ color: 'darkred' }} className="hover">Decline</span>
                  </td>
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