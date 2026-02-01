import { Server } from "socket.io";
import { verifyJWTToken } from "../utils/jwt.js";
import registerChatHandlers from "./chat.socket.js";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token || socket.handshake.headers?.token;
      const decoded = verifyJWTToken(token);
      socket.data.userID = decoded.id;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id);
    registerChatHandlers(io, socket);
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
