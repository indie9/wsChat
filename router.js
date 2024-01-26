import Router from "express";
import PostController from "./PostController.js";
import authCheck from "./authMiddleware.js";
import roleCheck from "./roleMiddleware.js";
const router = new Router();

router.post("/forumposts", PostController.create);
router.get("/forumposts", [authCheck,roleCheck("ADMIN")],PostController.getAll);
router.get("/forumposts/:id", PostController.getOne);
router.put("/forumposts", PostController.update);
router.delete("/forumposts/:id", PostController.delete);

export default router;
