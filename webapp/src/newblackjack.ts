import { Request, Response } from "express";
import { randomUUID } from "crypto";

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

let card = {
    suit: suits,
    value: values,
}


function createDeck(): card[] {
    
}


export const blackjackStart = (req: Request, res: Response) => {
    const deck = createDeck();
    // const player = [deck.pop()!, deck.pop()!];
    // const dealer = [deck.pop()!];

    // const gameId = randomUUID();
    // gameSessions.set(gameId, { player, dealer, status: "playing" });

    // res.json({ gameId, player, dealer, status: "playing" });
};