import Router from "express";
import RoomsController from "./RoomsController.js";
import MessageController from "./MessageController.js";

const router = new Router();

router.post("/create", RoomsController.create);

router.put("/edit", RoomsController.edit);

router.get("/all", RoomsController.getAll);

router.get("/messages/:id", MessageController.getAllByRoom);

router.get("/:id", RoomsController.getOne);

router.delete("/:id", RoomsController.delete);


export default router;
