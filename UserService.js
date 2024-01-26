import User from "./User.js";
import FileService from "./FileService.js";
class UserService {
  async getAll() {
    const users = await User.find();
    return users;
  }
  async getAllByIds(idList) {
    const users = await User.find({
      '_id': { $in: idList}
    })
    return users;
  }

  async delete(id) {
    const users = await User.findByIdAndDelete(id);
    return users;
  }
  async update(user,avatar) {
    const oldUser =  await User.findById(user._id);
    const newAvatarName = avatar ? FileService.saveFiles(avatar) : null;
    let userData = Object.assign(oldUser, user);
    if (newAvatarName) {
      userData.avatar = newAvatarName
    }
    const newUuser = await User.findByIdAndUpdate(user._id,userData,{
      new: true,
    });
    return newUuser;
  }
}
export default new UserService();
