import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool: Pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.DBPORT,
});

pool.on("error", (err: any) => {
  console.error("[db] unexpected error on client", err);
});

export default pool;
