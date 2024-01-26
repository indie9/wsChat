import UserService from "./UserService.js";
import Role from "./Role.js";
class UserContoller {
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getAllByIds(req,res) {
    try {
      const users = await UserService.getAllByIds(req.body.ids);
      res.status(200).json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await UserService.delete(id);
      res.status(200).json(deletedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async edit(req, res) {
    try {
      let user = {
        _id: req.body. _id,
        username: req.body.username,
      }
      const adminRole = await Role.findOne({ value: "ADMIN" });
      const userRole = await Role.findOne({ value: "USER" });
      if (req.body.isadmin){
        user.roles = [adminRole.value,userRole.value]
      } else {
        user.roles = [userRole.value]
      }
      const updatedUser = await UserService.update(user,req.files && req.files.avatar);
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

}

export default new UserContoller();
