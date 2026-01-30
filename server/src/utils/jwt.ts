import { randomBytes } from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWTToken = (userID: string): string => {
  return jwt.sign(
    {
      id: userID,
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

export const generateRefreshToken = (): string => {
  const buf = randomBytes(32);

  return buf.toString("base64");
};

export const verifyJWTToken = (token: string): JwtPayload => {
  const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

  if (new Date(payload.exp * 1000) <= new Date(Date.now())) {
    throw new Error("Token expired");
  }

  return payload;
};
