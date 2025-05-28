import Garage from "../models/Garage";

import { IAny, IResponse } from "../interfaces";

async function getAllByUnverified(body: any): Promise<IResponse> {
  try {
    const garages = await Garage.getAllByUnverified();

    this.garages = garages;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getAll(body: any): Promise<IResponse> {
  try {
    const garages = await Garage.getAll();

    this.garages = garages;
  } catch (error) {
    throw error;
  }
  return this;
}

async function acceptGarage(body: any): Promise<IResponse> {
  await Garage.updateOne(
    { _id: body.garageId },
    { 
      isVerified: true
    }
  )

  this.successful = true;
  return this;
}

async function declineGarage(body: any): Promise<IResponse> {
  await Garage.updateOne(
    { _id: body.garageId },
    { 
      isDeclined: true
    }
  )

  this.successful = true;
  return this;
}

export default { getAllByUnverified, getAll, acceptGarage, declineGarage };
