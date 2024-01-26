import AuthService from "./AuthService.js";

import validator from 'express-validator'
const validationResult  = validator.validationResult

class AuthContoller {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.errors});
      }

      const user = await AuthService.registration(req.body,req.files && req.files.avatar);
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({message: '' + e});
    }
  }
  async login(req, res) {
    try {
      const user = await AuthService.login(req.body);
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({message: '' + e});
    }
  }
  async userCheck(req, res) {
    try {
      const user = await AuthService.userCheck(req.body);
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({message: 'userCheck errore: ' + e});
    }
  }
}

export default new AuthContoller();
