import Message from "./Message.js";

class MessageService {
  async create(mess) {
    const message = await Message.create(mess);
    return message
  }
  async getAllByRoom(room) {
    const messages = await Message.find({ roomId: room});
    return messages;
  }
}

export default new MessageService();
