import { Application } from "express";

import BaseController from "../controllers/base";

import {
  searchGaragesByServices
} from "../../services/Service"

import GarageServices from "../../services/Garage"

export default (app: any) => {
  app.post("/garages/search/by/services", BaseController.wrapWithUser(searchGaragesByServices));
  app.post("/garages/get/unverified", BaseController.wrap(GarageServices.getAllByUnverified));
  app.post("/garages/get/all", BaseController.wrap(GarageServices.getAll));
  app.post("/garages/accept", BaseController.wrap(GarageServices.acceptGarage));
  app.post("/garages/decline", BaseController.wrap(GarageServices.declineGarage));
};
