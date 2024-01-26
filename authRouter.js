import Router from "express";
import AuthContoller from "./AuthContoller.js";
import validator from "express-validator";
const check = validator.check;
const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Cannot be empty").notEmpty(),
    check("email", "Cannot be empty").notEmpty(),
    check("password", "Must be longer then 3 and chorter then 10").isLength({
      min: 4,
      max: 10,
    }),
  ],
  AuthContoller.registration
);

router.post("/login",AuthContoller.login);
router.post("/check",AuthContoller.userCheck);

export default router;
