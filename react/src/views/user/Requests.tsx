import { useEffect, useRef, useState } from "react";
import { getElementById, getValueById } from "../../helpers/dom";
import { postWithAuth } from "../../helpers/http";
import { maps, initMap } from "../../helpers/map"
import UserManager from "../../components/info/UserManager";
import RequetModal from "./RequetModal";
import RequestCard from "../../components/request-card/RequestCard";
import Notification, { showNotification } from "../../components/notification/Notification";

const getRequests = async (): Promise<any> => {
  const res = await postWithAuth('/requests/get/by/user', {})

  return res.requests;
}

export default () => {
  const con = useRef(null);
  const [requests, setRequests] = useState(null) as any;
  const [garages, setGarages] = useState(null) as any;
  const [location, setLocation] = useState(null) as any;
  const [query, setQuery] = useState('');
  const [services, setServices] = useState(null) as any;
  const [garageName, setGarageName] = useState(null) as any;
  const [garageId, setGarageId] = useState(null) as any;
  const [directionsService, setDirectionsService] = useState([]) as any;
  const [directionsRenderer, setDirectionsRenderer] = useState([]) as any;
  const [map, setMap] = useState([]) as any;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setUserLocation, (error: any) => {
        console.log(error)

        showNotification(error.message + ', please ensure location is turned on and allowed')
      });

      return;
    }
  }

  const setUserLocation = (position: any) => {
    setLocation(`${position.coords.latitude},${position.coords.longitude}`)
  }

  const openRequestModal = () =>{
    getElementById('request-modal')
      .classList.remove('modal--closed');
  }

  useEffect(() => {
    (async () => {
      setRequests(await getRequests());
      getLocation();
    })()
  }, [])


  const sendRequest = async (e: any, garageId: string, service: string, price: string) => {
    let parent = e.target.parentElement;

    let input = parent.getElementsByClassName('price-input')[0];

    getElementById('request-modal').style.pointerEvents = 'none';

    await postWithAuth('/requests/add', {
      garageId,
      service,
      price: price || input.value,
      location
		})

    setRequests(await getRequests());

    getElementById('request-modal')
      .classList.add('modal--closed')

    getElementById('request-modal').style.pointerEvents = 'auto';

    setQuery('')

    setGarages(null)
  };

  const searchGaragesByServices = async () => {
    const res = await postWithAuth('/garages/search/by/services', {
      query:  getValueById('search-service'),
      location
    })

    setGarages(res.garages)
  }

  const viewServices = (e: any) => {
    const services = JSON.parse(e.target.parentElement.dataset.services);

    setServices(services)
    setGarageName(e.target.parentElement.dataset.garage)
    setGarageId(e.target.parentElement.dataset.garageid)

    openRequestModal()
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

    var request = {
      origin: new maps.LatLng(start.lat, start.lng),
      destination: new maps.LatLng(end.lat, end.lng),
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result: any, status: any) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
        directionsRenderer.setMap(map)
      }
    });
  }

  function closeMapModal() {
    getElementById('maps-con')?.classList.add('hide')
  }

  return (
    <UserManager>
      <div className="info__page-heading">
        <h1>Requests</h1>
        <p>Requests for help from garages.</p>

        {/* <div className="info__page-heading__hr"></div> */}
      </div>

      <div className="info__pad">
        <div className="search-services" style={{ margin: '5rem 15% 3rem' }}>
          <p><b>Search a garage</b></p>
          <div className="input">
            <input type="text" id="search-service" onChange={(e) => setQuery(e.target.value)} onKeyUp={() => searchGaragesByServices()} value={query} placeholder="Search garages by services..." />
          </div>
          <div className="garage-list">
            <table style={{ width: '100%' }} className="margin--top-2">
              <tbody>
                {
                  garages?.map((garage: any) => (
                    <tr key={garage._id} data-garageid={garage._id} data-garage={garage.name} data-services={`${JSON.stringify(garage.services)}`}>
                      <td>{garage.name}</td>
                      <td>{garage.distance.toFixed(2)}k Away</td>
                      <td>{garage.services.length} Services</td>
                      <td style={{ textAlign: 'right' }} onClick={viewServices}>View services</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            
          </div>
        </div>
        <div className="info__requests">
          {requests && requests.map((item: any) => <RequestCard calcRoute={calcRoute} key={item._id} {...item} />) }
        </div>

        {/* <button className="btn btn--primary margin--top-2" onClick={openRequestModal}>
          <i className="fa fa-add margin--right-1"></i>
          <span>New request</span>
        </button> */}
      </div>

      <div className="map-popup-overlay hide" id="maps-con">
        <div className="map-popup" ref={con} id="google-maps"></div>
        <button className="btn pos--abs pos--horizontal margin--top-2" onClick={closeMapModal}>Close</button>
      </div>

      <RequetModal garageId={garageId} garageName={garageName} services={services} sendRequest={sendRequest}/>
      <Notification/>
    </UserManager>
  )
}