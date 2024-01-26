import Room from "./Room.js";
import Message from "./Message.js";
class RoomService {
  async create(room) {
  const createdRoom = await Room.create(room);
  return createdRoom;
}
  async getAll() {
    const rooms = await Room.find();
    return rooms;
  }
  async getOne(id) {

    const room = await Room.findById(id);
    return room;
  }
  async delete(id) {
    const room = await Room.findByIdAndDelete(id);
    await Message.deleteMany({ roomId: id})
    return room;
  }
  async update(room) {
    const newRoom = await Room.findByIdAndUpdate(room._id,room,{
      new: true,
    });
    return newRoom;
  }
}
export default new RoomService();
