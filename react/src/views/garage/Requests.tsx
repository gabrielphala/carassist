import { useEffect, useRef, useState } from "react";
import GarageManager from "../../components/info/GarageManager";
import RequestCard from "../../components/request-card/RequestCard";
import { postWithAuth } from "../../helpers/http";
import { getElementById } from "../../helpers/dom";
import { maps, initMap } from "../../helpers/map"
import { allEmpty } from "../../helpers/array";


const getRequests = async (): Promise<any> => {
  const res = await postWithAuth('/requests/get/by/garage', {})

  return res.requests;
}

export default () => {
  const con = useRef(null);
  const [requests, setRequests] = useState([]) as any;
  const [employees, setEmployees] = useState([]) as any;
  const [directionsService, setDirectionsService] = useState([]) as any;
  const [directionsRenderer, setDirectionsRenderer] = useState([]) as any;
  const [map, setMap] = useState([]) as any;
  const [location, setLocation] = useState(null) as any;
  const [requestId, setRequestId] = useState('');

  useEffect(() => {
    (async () => {
      setRequests(await getRequests());
      setEmployees(await getEmployees())
      getLocation()
    })()
  }, [])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setUserLocation, (error: any) => {
        console.log(error)
      });

      return;
    }
  }

  const setUserLocation = (position: any) => {
    setLocation(`${position.coords.latitude},${position.coords.longitude}`)
  }

  async function getEmployees () {
    const res = await postWithAuth('/users/get/employees', {});

    return res.employees;
  }

  async function assignEmployee (employeeId: string) {
    await postWithAuth('/requests/assign/employee', { employeeId, requestId })

    setRequests(await getRequests());
  }

  async function accept(requestId: string) {
    await postWithAuth('/requests/accept/one', {
      requestId,
      location
    })

    setRequests(await getRequests());
  }

  async function decline(requestId: string) {
    await postWithAuth('/requests/decline/one', { requestId })

    setRequests(await getRequests());
  }

  function showEmployees (e: any, requestId: string) {
    setRequestId(requestId);

    getElementById('popup-employees-con').classList.remove('hide')

    const { pageX, pageY } = (e as PointerEvent);

    const el = getElementById('popup-employees');

    el.style.top = `${pageY}px`
    el.style.left = `${pageX}px`
  }

  function hideEmployees () {
    getElementById('popup-employees-con').classList.add('hide')
  }

  useEffect(() => {
    if (!con.current) return;
    const { map: a } = initMap();
    setMap(a)
    
    setDirectionsService(new maps.DirectionsService())

    var directionsRenderer = new maps.DirectionsRenderer()

    setDirectionsRenderer(directionsRenderer)
    directionsRenderer.setMap(a);
  }, [con.current])

  function calcRoute(start: any, end: any) {
    getElementById('maps-con')?.classList.remove('hide')

    console.log(start, end);
    

    var request = {
      origin: new maps.LatLng(start.lat, start.lng),
      destination: new maps.LatLng(end.lat, end.lng),
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result: any, status: any) {
      console.log(result, status);
      
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
        directionsRenderer.setMap(map)
      }
    });
  }

  function closeMapModal () {
    getElementById('maps-con')?.classList.add('hide')
  }

  return (
    <GarageManager>
      <div className="info__page-heading">
        <h1><i className="fa-regular fa-file-lines margin--right-1"></i>Requests</h1>
        <p>Received requests from drivers.</p>
        <div className="info__page-heading__hr"></div>
      </div>

      <div className="info__pad">
        <div className="info__requests">
          {requests.map((item: any) => <RequestCard
            key={item._id}
            isGarage={true}
            calcRoute={calcRoute}
            showEmployees={showEmployees}
            accept={accept}
            decline={decline} {...item} />)
          }
        </div>

        {allEmpty(requests) && (
          <div className="garage-list__result-msg flex flex--a-center">
            <img src="/illustration/no-data.svg" alt="Happy bird" />
            <h1 className="margin--top-1">Nothing to see here.</h1>
            <p>No requests from drivers.</p>
          </div>
        )}
      </div>

      <div className="popup-overlay hide" id="popup-employees-con" onClick={hideEmployees}>
        <div className="popup" id="popup-employees">
          {employees?.map((employee: any) => (
            <p key={employee._id} className="popup__item" onClick={() => assignEmployee(employee._id)}>{employee.name}</p>
          ))}
        </div>
      </div>

      <div className="map-popup-overlay hide" id="maps-con">
        <div className="map-popup" ref={con} id="google-maps"></div>
        <button className="btn pos--abs pos--horizontal margin--top-2" onClick={closeMapModal}>Close</button>
      </div>

    </GarageManager>
  )
}