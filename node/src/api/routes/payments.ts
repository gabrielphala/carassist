import { Application } from "express";

import controller from "../controllers/base";

import {
  getAll,
} from "../../services/Payment";

import { sign, updatePayment } from "../../services/Payfast";
import { urls } from "../../globals";

export default (app: any) => {
  app.post(
    "/payments/get",
    controller.wrap(getAll)
  );

  app.post("/payments/payfast/sign", controller.wrapWithUser(sign));

  app.get("/payments/payfast/success", (req, res) => {
    res.status(200).redirect(`${urls['FRONT_END']}u/requests/pay/success`);
  });

  app.get("/payments/payfast/cancel", (req, res) => {
    res.status(200).redirect(`${urls['FRONT_END']}u/requests/pay/failed`);
  });

  app.post("/payments/payfast/notify", controller.wrap(updatePayment));
};
