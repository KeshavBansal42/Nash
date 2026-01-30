import { Request, Response, NextFunction } from "express";
import { verifyJWTToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];

  try {
    const decoded = verifyJWTToken(token);

    req.user = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
