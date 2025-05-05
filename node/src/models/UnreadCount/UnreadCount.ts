import Model from "../Model";

import { Types } from "mongoose";

export default class Count extends Model {
  constructor(mongoose, QueryBuilder) {
    const schema = new mongoose.Schema({
      userId: { type: Types.ObjectId, ref: 'User' },
      userType: { type: String, default: 'user' },
      chats: [{ type: String }],
    });

    super(mongoose, "count", QueryBuilder, schema);
  }

  getByUser (userId: any, userType: string) {
    return this.model.findOne({
      condition: {userId, userType}
    });
  }

  // Add a chat ID to the user's count document
  async addChat(userId: Types.ObjectId, userType: 'employee' | 'driver', chatId: string) {
    return this.model.updateOneAndGet(
      { userId, userType },
      { $addToSet: { chats: chatId } }, // prevent duplicates
      true
    );
  }

  // Remove a chat ID from the user's count document
  async removeChat(userId: Types.ObjectId, userType: 'employee' | 'driver', chatId: string) {
    return this.model.updateOneAndGet(
      { userId, userType },
      { $pull: { chats: chatId } },
    );
  }
}
