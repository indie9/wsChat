import mongoose from "mongoose";

const Message = new mongoose.Schema({
  event: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true },
  roomId: { type: String, required: true },
  message:{ type: String, required: true },
});


export default mongoose.model('messages',Message)
