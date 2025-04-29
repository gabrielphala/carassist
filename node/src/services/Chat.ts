import { IResponse } from "../interfaces";
import Chat from "../models/Chat";
import Message from "../models/Message";
import User from "../models/User";
import GarageAdmin from "../models/GarageAdmin";
import Garage from "../models/Garage/Garage";
import { sendSMS } from "./Sms";

export async function create (body: any, user: any) {
  try {
    const {employeeId, userId} = body; 

    let chat = await Chat.getByUserAndEmployee(userId, employeeId);

    if (!chat) {
      chat = await Chat.add({
        employeeId,
        userId
      })
    }

    this.chatId = chat._id;
    this.successful = true;
  } catch (e) { throw e; }

  return this;
}

export async function send(body, user) {
  try {
    let sender = user._id;

    let chat = await Chat.getById(body.chatId);

    const senderUser = `${chat.employeeId}` == `${user._id}` ?
      await GarageAdmin.getById(chat.employeeId) :
      await User.getById(chat.userId);

    const receiverUser = `${chat.employeeId}` == `${user._id}` ?
      await User.getById(chat.userId) :
      await GarageAdmin.getById(chat.employeeId)

    if (receiverUser.phone) sendSMS(receiverUser.phone, `You have a message from mechanic - ${senderUser.name}`)

    await Message.add({
      sender,
      chat: body.chatId,
      message: body.message,
    });

    this.successful = true;
  } catch (e) {
    throw e;
  }

  return this;
}

export async function getAll(body, user) {
  try {
    this.messages = await Message.getByChat(body.chatId)

    this.successful = true;
  } catch (e) {
    throw e;
  }

  return this;
}

export async function getChatsByUser(body, user) {
  try {
    const chats = (await Chat.getByUser(user._id)), res = [];

    for (let i = 0; i < chats.length; i++) {
      let _msg = (await Message.getOneMessageByChat(chats[i]._id));

      if (!_msg) continue;

      res.push({
        ...chats[i].toObject(),
        message: _msg.message,
        messageDate: _msg.createdAt
      })

    }

    this.chats = res;
    
    this.successful = true;
  } catch (e) {
    throw e;
  }

  return this;
}

export async function getChatsByEmployee(body, user) {
  try {
    const chats = (await Chat.getByEmployee(user._id)), res = [];

    for (let i = 0; i < chats.length; i++) {
      let _msg = (await Message.getOneMessageByChat(chats[i]._id));

      if (!_msg) continue;

      res.push({
        ...chats[i].toObject(),
        message: _msg.message,
        messageDate: _msg.createdAt
      })

    }

    this.chats = res;

    this.successful = true;
  } catch (e) {
    throw e;
  }

  return this;
}
