import Router from "express";
import UserContoller from "./UserContoller.js";
const router = new Router();

router.get("/all", UserContoller.getAll);

router.post("/find", UserContoller.getAllByIds);

router.delete("/:id", UserContoller.delete);

router.put("/edit", UserContoller.edit);

export default router;
