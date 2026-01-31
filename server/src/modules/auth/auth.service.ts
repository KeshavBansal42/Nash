import bcrypt from "bcrypt";
import pool from "../../config/db.js";
import { generateJWTToken, generateRefreshToken } from "../../utils/jwt.js";
import * as userRepository from "../users/users.repository.js";
import * as authRepository from "./auth.repository.js";
import { AuthResponseDTO } from "./dtos/auth-response.dto.js";
import { LoginRequestDTO } from "./dtos/login.dto.js";
import { LogoutRequestDTO } from "./dtos/logout.dto.js";
import { RefreshRequestDTO } from "./dtos/refresh.dto.js";
import { RegisterRequestDTO } from "./dtos/register.dto.js";

export const register = async (
  input: RegisterRequestDTO,
): Promise<AuthResponseDTO> => {
  const existing = await userRepository.findUserByEmail(input.email);

  if (existing) throw new Error("User already registered!");

  const passwordHash = await bcrypt.hash(input.password, 10);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const user = await userRepository.createUser(
      input.username,
      input.email,
      client,
    );
    await authRepository.createUser(user.id, passwordHash, client);
    await client.query("COMMIT");

    const accessToken = generateJWTToken(user.id);
    const refreshToken = generateRefreshToken();

    await authRepository.createRefreshToken(user.id, refreshToken);

    return {
      id: user.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  } catch (err: any) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const login = async (
  input: LoginRequestDTO,
): Promise<AuthResponseDTO> => {
  const user = await userRepository.findUserByEmail(input.email);

  if (!user) throw new Error("User does not exist!");

  const authUser = await authRepository.findUserByID(user.id);

  if (!(await bcrypt.compare(input.password, authUser.passwordHash)))
    throw new Error("Invalid credentials!");

  try {
    await userRepository.performDailyCheckIn(authUser.id);
  } catch (err) {}

  const accessToken = generateJWTToken(user.id);
  const refreshToken = generateRefreshToken();

  await authRepository.createRefreshToken(user.id, refreshToken);

  return {
    id: user.id,
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

export const refresh = async (
  input: RefreshRequestDTO,
): Promise<AuthResponseDTO> => {
  const token = await authRepository.getRefreshToken(input.refresh_token);

  if (!token) throw new Error("Bad request. Login again");

  if (token.revoked || new Date(Date.now()) >= token.expiresAt)
    throw new Error("Refresh token is expired. Login again");

  const accessToken = generateJWTToken(token.userID);
  const refreshToken = generateRefreshToken();

  await authRepository.createRefreshToken(token.userID, refreshToken);
  await authRepository.revokeRefreshToken(token.token);

  return {
    id: token.userID,
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

export const logout = async (input: LogoutRequestDTO) => {
  await authRepository.revokeRefreshToken(input.refresh_token);
};
