import User from "../models/User";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";
import jwt from "../helpers/Jwt";

import { IAny, IResponse } from "../interfaces";
import { getResponse } from "../helpers/response-wrap";

export function saveSession(user: any) {
  const tokens = jwt.get_cookie_tokens(user);

  // car assist hub session
  this.set_cookie("_cah_sesh", JSON.stringify(tokens));
}

export function removePassword(user: any) {
  delete user.password;

  return user;
}

async function createUser(body: any, req: any, res: any): Promise<IResponse> {
  try {
    if (!req.files[0]) throw 'Please select ID document or take photo';

    const newUser = await User.add({
      name: `${body.firstName} ${body.lastName}`,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      idDocument: req.files[0]?.filename,
      password: await hasher.hash(body.password),
    });

    saveSession.call(getResponse(res), removePassword(newUser.toJSON()));

    req.successful = true;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
  return this;
}

async function authUser(body: any): Promise<IResponse> {
  try {
    const user = await User.getByEmail(body.email);

    if (!user || (user && !(await hasher.isSame(user.password, body.password))))
      throw "Email address or password is incorrect";

    saveSession.call(this, removePassword(user.toJSON()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getDrivers(body: any): Promise<IResponse> {
  try {
    this.drivers = await User.getDrivers();
    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getUserSession(_, user: any): Promise<IResponse> {
  this.user = user;
  return this;
}

async function acceptDriver(body: any): Promise<IResponse> {
  await User.updateOne(
    { _id: body.driverId },
    { 
      isVerified: true
    }
  )

  this.successful = true;
  return this;
}

async function declineDriver(body: any): Promise<IResponse> {
  await User.updateOne(
    { _id: body.driverId },
    { 
      isDeclined: true
    }
  )

  this.successful = true;
  return this;
}

async function getAllByUnverified(body: any): Promise<IResponse> {
  try {
    const drivers = await User.getAllByUnverified();

    this.drivers = drivers;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { getDrivers, getAllByUnverified, getUserSession, acceptDriver, declineDriver, createUser, authUser };
