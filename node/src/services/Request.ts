import Request from "../models/Request";
import Payment from "../models/Payment";
import Garage from "../models/Garage";
import { getDistance } from "../helpers/Distance";
import axios from "axios";
import { sendSMS } from "./Sms";

export async function add(body, user) {
  try {
    const { garageId, service, location, price, isPriceUserDefined } = body;

    const userPosArr = location.split(',');

    await Request.add({
      service,
      requester: user._id,
      garage: garageId,
      price,
      isPriceUserDefined,
      location: {
        lat: parseFloat(userPosArr[0]),
        lng: parseFloat(userPosArr[1])
      }
    });

    let _garage = await Garage.getById(garageId);

    if (_garage.phone) sendSMS(_garage.phone, `You have recieved a request for ${service} at R${price}, sign in to see more www.carassisthub.info/g/sign-in`)

  } catch (e) {
    throw e;
  }

  return this;
}

export async function updatePay(body) {
  try {
    const { requestId } = body;

    const request = await Request.getById(requestId);

    request.hasPaid = true;

    request.save();

    await Payment.add({
      garage: request.garage,
      requester: request.requester,
      price: request.price,
      service: request.service
    })

    return this;
  } catch (e) {
    throw e;
  }
}

export async function accept(body, user) {
  try {
    const { requestId, location } = body;

    const garage = await Garage.getById(user.garage);

    const userPosArr = location.split(',');

    const distance = getDistance({ lat: garage.location.lat, lng: garage.location.lng }, {
      lat: parseFloat(userPosArr[0]),
      lng: parseFloat(userPosArr[1])
    })

    await Request.updateOne({ _id: requestId }, {
      isAccepted: true,
      isDeclined: false,
      distance,
      hasDistance: true,
      employeeLocation: {
        lat: parseFloat(userPosArr[0]),
        lng: parseFloat(userPosArr[1])
      }
    })

    if (user.phone) sendSMS(user.phone, `Your request to garage - ${garage.name} has been accepted`)
  } catch (e) {
    throw e;
  }

  return this;
}

export async function assignEmployee(body, user) {
  try {
    const { requestId, employeeId } = body;

    await Request.updateOne({ _id: requestId }, {
      employee: employeeId
    })
  } catch (e) {
    throw e;
  }

  return this;
}

export async function getById(body) {
  try {
    const request = await Request.getById(body.requestId)

    this.request = request.toObject()

  } catch (e) {
    throw e;
  }

  return this;
}

export async function getAll() {
  try {
    this.requests = await Request.getAll()
  } catch (e) {
    throw e;
  }
  return this;
}

export async function updateDistanceOfEmployee(body, user) {
  try {
    const { location } = body;

    const userPosArr = location.split(',');

    const requests = await Request.getRequestsByEmployee(user._id)

    requests.forEach((request) => {
      request.distance = getDistance({ lat: request.location.lat, lng: request.location.lng }, {
        lat: parseFloat(userPosArr[0]),
        lng: parseFloat(userPosArr[1])
      })

      request.employeeLocation = {
        lat: parseFloat(userPosArr[0]),
        lng: parseFloat(userPosArr[1])
      }

      request.save()
    })
    
  } catch (e) {
    throw e;
  }

  return this;
}

export async function decline(body, user) {
  try {
    const { requestId } = body;

    await Request.updateOne({_id: requestId}, {
      isAccepted: false,
      isDeclined: true
    })
  } catch (e) {
    throw e;
  }

  return this;
}

export async function getRequestsByUser(_, user) {
  try {
    this.requests = await Request.getRequestsByUser(user._id);
  } catch (e) {
    throw e;
  }

  return this;
}

export async function getRequestsByGarage(_, user) {
  try {
    this.requests = await Request.getRequestsByGarage(user.garage);
  } catch (e) {
    throw e;
  }

  return this;
}
