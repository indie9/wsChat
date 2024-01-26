import jwt from "jsonwebtoken";
import tokenData from "./config.js";

const roleCheck = (roles) => {
  return (req, res, next) => {
    if (req.methods === "OPTIONS") {
      return next();
    }
    try {
      const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(400).json({ message: "roleCheck errore" });
      }
      const {roles: userRoles} = jwt.verify(token,tokenData.secret)
      let hasRole = false
      userRoles.forEach(x => {
        if (roles.includes(x)){ 
          hasRole = true
        }
      });
      if (!hasRole) {
        return res.status(400).json({ message: "roleCheck errore" });
      }
      next()
    } catch (error) {
      return res.status(400).json({ message: "roleCheck errore" + error });
    }
  };
}
export default roleCheck
