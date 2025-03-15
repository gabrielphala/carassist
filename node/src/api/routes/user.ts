import { Application } from "express";

import BaseController from "../controllers/base";
import userServices from "../../services/User";
import garageAdminServices from "../../services/GarageAdmin";
import { anyFiles } from "../../config/multer";

export default (app: any) => {
  app.post(
    "/sign-up",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/documents", "pdf")(
        req,
        res,
        async (err) => {
          try {
            await userServices.createUser(req.body, req, res);

          } catch (error) {
            req['error'] = error;
          }

          next();
        }
      );
    },
    BaseController.wrapWithRequest(function (body: any, req: any) {
      this.error = req["error"];
      this.successful = req["successful"];
      // this.portrait = req["portrait"];

      return this;
    })
  );

  app.post("/sign-in", BaseController.wrap(userServices.authUser));

  // app.post(
  //   "/g/sign-up",
  //   BaseController.wrap(garageAdminServices.createGarageAdmin)
  // );

  app.post(
    "/g/sign-in",
    BaseController.wrap(garageAdminServices.authGarageAdmin)
  );

  app.post(
    "/user/get/session",
    BaseController.wrapWithUser(userServices.getUserSession)
  );

  app.post(
    "/users/get/employees",
    BaseController.wrapWithUser(garageAdminServices.getEmployees)
  );

  app.post(
    "/users/get/all/employees",
    BaseController.wrapWithUser(garageAdminServices.getAllGarageEmployees)
  );

  app.post(
    "/users/get/drivers",
    BaseController.wrapWithUser(userServices.getDrivers)
  );

  app.post(
    "/users/get/unverified",
    BaseController.wrapWithUser(userServices.getAllByUnverified)
  );


  app.post(
    "/g/sign-up",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/documents", "pdf")(
        req,
        res,
        async (err) => {
          try {
            await garageAdminServices.createGarageAdmin(req.body, req, res);

          } catch (error) {
            req['error'] = error;
          }

          next();
        }
      );
    },
    BaseController.wrapWithRequest(function (body: any, req: any) {
      this.error = req["error"];
      this.successful = req["successful"];
      // this.portrait = req["portrait"];

      return this;
    })
  );

  app.post("/drivers/accept", BaseController.wrap(userServices.acceptDriver));
  app.post("/drivers/decline", BaseController.wrap(userServices.declineDriver));

  app.post("/sign-out", BaseController.signOut);
};
