import RoomsServisce from "./RoomsServisce.js";
import UserService from "./UserService.js";
import Role from "./Role.js";
class RoomsController {
  async create(req, res) {
    try {
      const createdRoom = await RoomsServisce.create(req.body);
      res.status(200).json(createdRoom);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const rooms = await RoomsServisce.getAll();
      const users = await UserService.getAllByIds(rooms.map(x=> x.author));
      const roomsWithAuthors = rooms.map(x => {
        return {
          ...x._doc,
          author: users.find(y => y._id == x._doc.author)
        }
      })
      res.status(200).json(roomsWithAuthors);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedRoom = await RoomsServisce.delete(id);
      res.status(200).json(deletedRoom);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const room = await RoomsServisce.getOne(id);
      res.status(200).json(room);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async edit(req, res) {
    try {
      let room =  req.body
      const updatedRoom = await RoomsServisce.update(room);
      res.status(200).json(updatedRoom);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new RoomsController();
