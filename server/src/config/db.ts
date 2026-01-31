import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err: any) => {
  console.error("[db] unexpected error on client", err);
});

export default pool;
