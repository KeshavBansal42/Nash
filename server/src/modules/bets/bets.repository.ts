import { title } from "node:process";
import pool from "../../config/db.js";
import { User } from "../users/users.model.js";
import { Bet, PlacedBet, PoolInfo, UserBet} from "./bets.model.js";

const mapRowToBet = (row: any): Bet => {
    return {
        title: row.title,
        created_at: row.created_at,
        created_by: row.created_by,
        creator_id: row.creator_id,
        expires_at: row.expires_at,
        group_id: row.group_id,
        id: row.id,
        status: row.status,
        winning_option: row.winning_option,
        total_pot: row.total_pot
    }
}

const mapRowToPlacedBet = (row:any): PlacedBet => {
    return {
        amount: row.amount,
        option: row.option
    }
}

const mapRowToPoolInfo = (row:any): PoolInfo => {
    return {
        pool_against: row.pool_against,
        pool_for: row.pool_for,
        total_pot: row.total_pot
    }
}

export const getBetFromDB = async (betId: string): Promise<Bet> => {
    const result = await pool.query(`SELECT * FROM bets WHERE id=$1`,[betId])
    return mapRowToBet(result.rows[0]);
}

export const getAllBetsOfGroupFromDB = async (groupId: string): Promise<Bet[]> => {
    const result = await pool.query(`SELECT * FROM bets WHERE group_id=$1`,[groupId])
    return result.rows.map((row)=> mapRowToBet(row));
}

export const getAllUserBetsFromDB = async (): Promise<UserBet[]> => {
    const result = await pool.query(`SELECT * FROM user_bets`)
    return result.rows.map((row)=> mapRowToBet(row));
}

export const postBet = async (user: User, groupId: string, title: string, expires_at: Date): Promise<Bet> => {
    const result = await pool.query(`INSERT INTO bets (group_id, creator_id, title, status, expires_at) VALUES ($1,$2,$3,'open',$4) RETURNING *`,[groupId,user.id,title, expires_at])
    return mapRowToBet(result.rows[0]);
}