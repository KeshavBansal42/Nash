import express, { Request, Response } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import betRoutes from "./modules/bets/bets.routes.js";
//import roomRoutes from "./modules/chat-room/chat-room.routes.js";

const app = express();

// Middleware initialisation
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(204).json({});
});

//app.use("/auth", authRoutes);
//app.use("/room", roomRoutes);

app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/group',betRoutes);

export default app;
