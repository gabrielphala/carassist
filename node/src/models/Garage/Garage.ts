import Model from "../Model";

import { Types } from "mongoose";

export default class Garage extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      name: { type: String },
      type: { type: String },
      phone: { type: String },
      registrationNumber: { type: String },
      registrationDocument: { type: String },
      isRegistrationDocumentPhoto: { type: Boolean, default: false },
      location: {
        lat: { type: Number },
        lng: { type: Number },
      },
      locationName: { type: String },
      credit: { type: Number, default: 0 },
      isVerified: { type: Boolean, default: false },
      isDeclined: { type: Boolean, default: false },
      isDeleted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    });

    super(mongoose, "Garage", QueryBuilder, schema);
  }

  getAllByType(type: string) {
    return this.model.find({
      condition: { type, isDeleted: false },
    });
  }

  getById(id: string | Types.ObjectId) {
    return this.model.findOne({
      condition: { _id: id, isDeleted: false },
    });
  }

  getAllByUnverified() {
    return this.model.find({
      condition: { isVerified: false, isDeclined: false },
    });
  }

  getAll() {
    return this.model.find({
      condition: { isDeclined: false },
    });
  }
}
