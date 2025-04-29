import Model from "../Model";

import { Types } from "mongoose";

export default class Request extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      requester: { type: Types.ObjectId, ref: "User" },
      employee: { type: Types.ObjectId, ref: "GarageAdmin" },
      garage: { type: Types.ObjectId, ref: "Garage" },
      service: { type: String },
      price: { type: Number },
      distance: { type: Number },
      location: {
        lat: { type: Number },
        lng: { type: Number },
      },
      employeeLocation: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
      },
      hasPaid: { type: Boolean, default: false },
      isDeleted: { type: Boolean, default: false },
      hasDistance: { type: Boolean, default: false },
      isAccepted: { type: Boolean, default: false },
      isDeclined: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    });

    super(mongoose, "Request", QueryBuilder, schema);
  }

  getById(id: string | Types.ObjectId) {
    return this.model.findOne({
      condition: { _id: id }
    });
  }

  getAll() {
    return this.model.find({
      condition: { isDeleted: false },
      populate: [["requester", "name"], ["garage", "name"], ['employee', 'name']],

    });
  }

  getRequestsByEmployee(id: string | Types.ObjectId) {
    return this.model.find({
      condition: { employee: id },
      populate: [["requester", "name"], ["garage", "name"], ['employee', 'name']],
    });
  }

  getRequestsByUser(id: string | Types.ObjectId) {
    return this.model.find({
      condition: { requester: id },
      populate: [["requester", "name"], ["garage", "name"], ['employee', 'name']],
    });
  }

  getRequestsByGarage(id: string | Types.ObjectId) {
    return this.model.find({
      condition: { garage: id },
      populate: [["requester", "name"], ['employee', 'name']],
    });
  }
}
