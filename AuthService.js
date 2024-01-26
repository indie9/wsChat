import User from "./User.js";
import Role from "./Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tokenData from "./config.js";
import FileService from "./FileService.js";
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload,tokenData.secret,{expiresIn: "24h"});
};
class AuthService {
  async registration(userData,avatar) {
    const { username, password, email } = userData;

    const candidate = await User.findOne({ email: email });
    if (candidate) {
      throw new Error("User has been created");
    }
    const salt = bcrypt.genSaltSync(7);
    const hashPass = bcrypt.hashSync(password, salt);
    const adminRole = await Role.findOne({ value: "ADMIN" });
    const userRole = await Role.findOne({ value: "USER" });

    const avatarName = avatar ? FileService.saveFiles(avatar) : null;

    const user = new User({
      username,
      email,
      password: hashPass,
      roles: [userRole.value],
      avatar: avatarName
    });

    await user.save();
    // const createdUser = await AuthData.create(userData);
    // return createdUser;

    return userData;
  }
  async login(userData) {
    const { email, password } = userData;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Not user with login" + email);
    }
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      throw new Error("Password is wrong");
    }
    const token = generateAccessToken(user._id,user.roles);
    user.password = null
    return {token,user}
  }
  async userCheck(usertoken) {
    const userid = await jwt.verify( usertoken.token, tokenData.secret, (err, decoded) => {
        if (err) console.error(err)
        return decoded.id
      })
    if (!userid) {
      throw new Error("Bad token");
    }
    const user = await User.findById(userid);
    user.password = null
    return user
  }
}

export default new AuthService();
