import Model from "../Model";

import { Types } from "mongoose";

export default class Service extends Model {
  private parseRegex: any

  constructor(mongoose, QueryBuilder, parseRegex?) {
    const schema = new mongoose.Schema({
      garage: { type: Types.ObjectId, ref: "Garage" },
      name: { type: String },
      price: { type: Number },
      isPriceUserDefined: { type: Boolean, default: false },
      isDeleted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    });

    super(mongoose, "Service", QueryBuilder, schema);

    this.parseRegex = parseRegex;
  }

  getServicesByGarage(id: string | Types.ObjectId) {
    return this.model.find({
      condition: { garage: id, isDeleted: false },
    });
  }

  getServicesByName(name: string) {
    return this.model.find({
      condition: { name: { $regex: this.parseRegex(`/${name}/i`) }, isDeleted: false },
      populate: [['garage', '']]
    });
  }

  getAll () {
    return this.model.find({
      condition: { isDeleted: false },
      populate: [['garage', '']]
    });
  }
}
