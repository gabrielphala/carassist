import { IResponse } from "../interfaces";
import Service from "../models/Service";
import { getDistance } from "../helpers/Distance";
import v, {Validation} from "../helpers/Validation";

export async function addService(body, user) {
  try {
    v.validate({
      'Service name': { value: body.name, min: 3, max: 50, type: Validation.TITLE },
      'Service price': { value: body.price, min: 1, max: 5, type: Validation.NUMBER, ntu: true },
    })

    if (body.isPriceUserDefined && body.price && parseFloat(body.price) > 0)
      throw 'You cannot allow custom prices and fixed price';

    if (!body.price && !body.isPriceUserDefined) throw 'Please specify price or allow users to input their own prices'

    await Service.add({
      name: body.name,
      garage: user.garage,
      isPriceUserDefined: body.isPriceUserDefined,
      price: body.price,
    });

    this.successful = true;
  } catch (e) {
    throw e;
  }

  return this;
}

export async function removeService(body) {
  try {
    await Service.removeOne(body.id);

    this.successful = true;
  } catch (e) {
    throw e;
  }

  return this;
}

export async function getServicesByGarage(_, user) {
  try {
    this.services = await Service.getServicesByGarage(user.garage);
  } catch (e) {
    throw e;
  }

  return this;
}

export async function getAll() {
  try {
    this.services = await Service.getAll();
  } catch (e) {
    throw e;
  }

  return this;
}

export async function searchGaragesByServices(body: any): Promise<IResponse> {
  try {
    let { query, location } = body;

    location = location ? location : '-26.2708,28.1123';
    
    const garages: Map<string, any> = new Map();

    const services = await Service.getServicesByName(query);

    services.forEach(service => {
      let garage = garages.get(service.garage.name) || {
        ...service.garage.toObject(),
        services: [],
        distance: 0
      };

      if (garage) {
        garage.services.push([
          service.name,
          service.price,
          service.isPriceUserDefined
        ])
      }

      const userPosArr = location.split(',');

      garage.distance = getDistance({ lat: service.garage.location.lat, lng: service.garage.location.lng }, {
        lat: parseFloat(userPosArr[0]),
        lng: parseFloat(userPosArr[1])
      })

      garages.set(service.garage.name, garage)
    });

    this.garages = Array.from(garages.values())

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}