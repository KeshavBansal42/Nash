import * as betRespository from "./bets.repository.js";
import { BetResponseDTO } from "./dtos/bet-response.dto.js";
import { Bet, UserBet } from "./bets.model.js";
import { User } from "../users/users.model.js";
import { string } from "zod";

const hasUserBet = (bets: UserBet[], b_id: string): boolean => {
    const found = bets.find(bet => bet.bet_id === b_id)
    if(!found) return false
    else return true
}

export const getBet = async (betId: string, userId: string): Promise<BetResponseDTO> => {
    const bet = await betRespository.getBetFromDB(betId);
    const betsMade = (await betRespository.getAllUserBetsFromDB()).filter(singleBet => singleBet.bet_id === betId)

    const total_pot = betsMade.reduce(function(acc, singleBet) {
        return acc + singleBet.amount;
    },0);

    const forBetsMade = betsMade.filter(singleBet => singleBet.selected_option === "for")
    const againstBetsMade = betsMade.filter(singleBet => singleBet.selected_option === "against")

    const pool_for = forBetsMade.reduce(function(acc, singleBet) {
        return acc + singleBet.amount;
    },0);
    const pool_against = againstBetsMade.reduce(function(acc, singleBet) {
        return acc + singleBet.amount;
    },0);

    const betsMadeByUser = (await betRespository.getAllUserBetsFromDB()).filter(singleBet => singleBet.user_id === userId)

    let payout = 0;

    if(hasUserBet(betsMadeByUser, betId)) {
        const betMadeByUser = betsMade.find(singleBet => singleBet.user_id === userId)
        if(betMadeByUser.selected_option==="for") {
            payout = Math.round(betMadeByUser.amount/pool_for*total_pot)
        } else {
            payout = Math.round(betMadeByUser.amount/pool_against*total_pot)
        }

        return {
            created_at: bet.created_at,
            created_by: bet.created_by,
            creator_id: bet.creator_id,
            expires_at: bet.expires_at,
            group_id: bet.group_id,
            id: bet.id,
            status: bet.status,
            title: bet.title,
            winning_option: bet.winning_option,
            total_pot: total_pot,
            pool_against: pool_against,
            pool_for: pool_for,
            my_bet: {
                amount: betMadeByUser!.amount,
                option: betMadeByUser!.selected_option,
                payout: payout
            }
        }
    }
    return {
        created_at: bet.created_at,
        created_by: bet.created_by,
        creator_id: bet.creator_id,
        expires_at: bet.expires_at,
        group_id: bet.group_id,
        id: bet.id,
        status: bet.status,
        title: bet.title,
        winning_option: bet.winning_option,
        total_pot: total_pot,
        pool_against: pool_against,
        pool_for: pool_for,
    }
}

export const getAllBets = async (groupId: string): Promise<Bet[]> => {
    const bets = await betRespository.getAllBetsOfGroupFromDB(groupId);
    return bets;
}

export const postBet = async (user: User, groupId: string, title: string, expires_at: Date): Promise<Bet> => {
    const bet = await betRespository.postBet(user, groupId, title, expires_at);
    return bet;
}