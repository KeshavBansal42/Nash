import { getIO } from "./socketServer.js";

export const emitToRoom = (roomId: string, event: string, payload: any) => {
  const io = getIO();
  io.to(roomId).emit(event, payload);
};
