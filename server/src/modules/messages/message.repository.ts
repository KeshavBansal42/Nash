import pool from "../../config/db.js";
import { Message } from "./message.model.js";

const mapRowToMessage = (row: any): Message => ({
  id: row.id,
  roomID: row.room_id,
  senderID: row.sender_id,
  content: row.content,
  createdAt: row.created_at,
});

export const createMessage = async (
  roomID: string,
  senderID: string,
  content: string,
): Promise<Message> => {
  const result = await pool.query(
    `INSERT INTO messages (bet_id, sender_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [roomID, senderID, content],
  );

  return mapRowToMessage(result.rows[0]);
};
