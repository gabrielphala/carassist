import Model from "../Model";

import { Types } from "mongoose";

export default class Payment extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      requester: { type: Types.ObjectId, ref: "User" },
      garage: { type: Types.ObjectId, ref: "Garage" },
      service: { type: String },
      price: { type: Number },
      party_pay_id: { type: String },
      item: { type: String },
      amount_gross: { type: Number },
      amount_fee: { type: Number },
      amount_net: { type: Number },
      status: { type: String, default: 'INITIALIZED' },
      party: { type: String, default: 'payfast' },
      createdAt: { type: Date, default: Date.now },
      completedAt: { type: Date }
    });

    super(mongoose, "Payment", QueryBuilder, schema);
  }

  getAll() {
    return this.model.find({
      condition: { },
      populate: [["requester", "name"], ["garage", "name"]],

    });
  }

  updatePayment = async (_id: string, data) =>
    this.model.updateOneAndGet(
      { _id },
      data
    );
}
