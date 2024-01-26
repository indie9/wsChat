import mongoose from "mongoose";

const User = new mongoose.Schema({
  email:  { type: String, required: true ,unique: true },
  username: { type: String, required: true},
  password: { type: String, required: true },
  avatar: { type: String,},
  roles: [{type: String, ref: 'Role'}]
});


export default mongoose.model('User',User)
