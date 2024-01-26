import jwt from "jsonwebtoken";
import tokenData from "./config.js";

const authCheck = (req, res, next) => {
  if (req.methods === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(400).json({ message: "authCheck errore" });
    }
    const decodedData = jwt.verify(token,tokenData.secret)
    req.user = decodedData
    next()
  } catch (error) {
    return res.status(400).json({ message: "authCheck errore" + error });
  }
};
export default authCheck
