import Model from "../Model";

import { Types } from "mongoose";

export default class Chat extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      employeeId: { type: Types.ObjectId, ref: 'GarageAdmin' },
      userId: { type: Types.ObjectId, ref: 'User' },
      isDeleted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    });

    super(mongoose, "Chat", QueryBuilder, schema);
  }

  getByUserAndEmployee (userId: any, employeeId: any) {
    return this.model.findOne({
      condition: {userId, employeeId}
    });
  }

  getByUser (userId: any) {
    return this.model.find({
      condition: {userId},
      populate: [['employeeId', 'name']]
    });
  }

  getByEmployee (employeeId: any) {
    return this.model.find({
      condition: {employeeId},
      populate: [['userId', 'name']]

    });
  }

  getById (_id: any) {
    return this.model.findOne({
      condition: {_id}
    });
  }
}
