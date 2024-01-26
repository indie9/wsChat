import MessageService from "./MessageService.js";

class MessageController {
  async create(messageData) {
    try {
      const message = await MessageService.create(messageData);
      return message
    } catch (e) {
      console.log(e);
    }
  }
  async getAllByRoom(req, res) {
    try {
      const { id } = req.params;
      const messages = await MessageService.getAllByRoom(id);
      res.status(200).json(messages);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    // try {
    //   const { id } = req.params;
    //   const deletedPost = await PostService.delete(id);
    //   res.status(200).json(deletedPost);
    // } catch (e) {
    //   res.status(500).json(e);
    // }
  }
}

export default new MessageController();
