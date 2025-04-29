import Model from "../Model";

import { Types } from "mongoose";

export default class Message extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      chat: { type: Types.ObjectId },
      sender: { type: Types.ObjectId  },
      message: { type: String, required: true },
      isDeleted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    });

    super(mongoose, "Message", QueryBuilder, schema);
  }

  getByChat (chat: any) {
    return this.model.find({
      condition: {chat, isDeleted: false}
    });
  }

  getOneMessageByChat (chat: any) {
    return this.model.findOne({
      condition: {chat, isDeleted: false},
    });
  }
}
