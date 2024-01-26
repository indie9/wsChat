import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import roomsRouther from "./roomsRouther.js";
import fileUpload from "express-fileupload";
import { Server as SocketServer } from "socket.io";
import http from "http";

import MessageController from "./MessageController.js";

const PORT = 80;
const DBurl =
  "mongodb+srv://user:123@cluster0.4ng1c9p.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: '*',
}));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use("/api", router);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/rooms", roomsRouther);

const httpServer = http.createServer(app);
const io = new SocketServer(httpServer,{cors: {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE",],
  allowedHeaders: ["*"],
  transports: ['websocket', 'polling'],
  credentials: true
},
allowEIO3: true
});
io.on("connection", (socket) => {

  const currentConnections = io.engine.clientsCount;
  io.emit("online", JSON.stringify({count: currentConnections}) );

  socket.on("joinRoom", (data) => {

    socket.rooms.forEach(room => {

      if (room !== socket.id) { // Не покидаем комнату с socket.id, т.к. это обязательная комната
        socket.leave(room); // Покидаем остальные комнаты
      }
    });

    socket.join(data.room);
  });

  socket.on("chatMessage", (data) => {
    const messageData = JSON.parse(data.message);
    MessageController.create(messageData).then(() => {
      io.to(data.room).emit("message", JSON.stringify(messageData));
    });
  });

  socket.on("disconnect", () => {
    const currentConnections = io.engine.clientsCount;
    console.log(`Текущее количество подключений: ${currentConnections }`);
    io.emit("online", JSON.stringify({count: currentConnections }) );
  });
});

async function startApp() {
  try {
    await mongoose.connect(DBurl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    httpServer.listen(PORT, () => console.log("server start" + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
