import { Application } from "express";

import BaseController from "../controllers/base";

import {
  getAll,
  send,
  create,
  getChatsByEmployee,
  getChatsByUser,
  markAsRead,
  getCount
} from "../../services/Chat"

import GarageServices from "../../services/Garage"

export default (app: any) => {
  app.post("/chat/create", BaseController.wrapWithUser(create));
  app.post("/chat/send", BaseController.wrapWithUser(send));
  app.post("/chat/get", BaseController.wrapWithUser(getAll));
  app.post("/chat/get/count", BaseController.wrapWithUser(getCount));
  app.post("/chat/read", BaseController.wrapWithUser(markAsRead));
  app.post("/chat/get/by/user", BaseController.wrapWithUser(getChatsByUser));
  app.post("/chat/get/by/employee", BaseController.wrapWithUser(getChatsByEmployee));
};
