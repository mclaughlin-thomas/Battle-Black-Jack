// blackjackHandlerNew.ts

import { Request, Response } from "express";
import { randomUUID } from "crypto";

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

type Card = {
    suit: string;
    value: string;
};

type GameState = {
    deck: Card[];
    player: Card[];
    dealer: Card[];
    status: string;
};

const gameSessions = new Map<string, GameState>();

function createDeck(): Card[] {
    const deck: Card[] = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push({
                suit: suits[i],
                value: values[j],
            });
        }
    }
    return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function printDeck(deck: Card[]): void {
    var dummyCard: Card;
    for (let i = 0; i < deck.length; i++) {
        dummyCard = deck[i];
        console.log(dummyCard.suit, dummyCard.value);
    }
}

function getCardValue(card: Card): number {
    if (["J", "Q", "K"].includes(card.value)) return 10;
    if (card.value === "A") return 11;
    return parseInt(card.value);
}

function calculateScore(hand: Card[]): number {
    let score = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    let aces = hand.filter(card => card.value === "A").length;
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

function cardToString(card: Card): string {
    return `${card.value} of ${card.suit}`;
}

function handToString(hand: Card[]): string[] {
    return hand.map(cardToString);
}

export const blackjackStart = (req: Request, res: Response) => {
    const deck = shuffleDeck(createDeck());
    const player = [deck.pop()!, deck.pop()!];
    const dealer = [deck.pop()!];

    const gameId = randomUUID();
    gameSessions.set(gameId, { deck, player, dealer, status: "playing" });

    res.json({
        gameId,
        player: handToString(player),
        dealer: handToString(dealer),
        status: "playing"
    });
};

export const blackjackHit = (req: Request, res: Response) => {
    const { gameId } = req.body;
    const game = gameSessions.get(gameId);
    if (!game || game.status !== "playing") {
        return res.status(400).json({ error: "Invalid game" });
    }

    const newCard = game.deck.pop()!;
    game.player.push(newCard);

    const score = calculateScore(game.player);
    if (score > 21) {
        game.status = "lost";
        return res.json({
            gameId,
            player: handToString(game.player),
            dealer: handToString(game.dealer),
            status: game.status,
            result: "You busted! Dealer wins! The House Will Always Wins In The End!"
        });
    }

    res.json({
        gameId,
        player: handToString(game.player),
        dealer: handToString(game.dealer),
        status: game.status
    });
};

export const blackjackStand = (req: Request, res: Response) => {
    const { gameId } = req.body;
    const game = gameSessions.get(gameId);
    if (!game || game.status !== "playing") {
        return res.status(400).json({ error: "Invalid game" });
    }

    while (calculateScore(game.dealer) < 17) {
        const newCard = game.deck.pop()!;
        game.dealer.push(newCard);
    }

    const playerScore = calculateScore(game.player);
    const dealerScore = calculateScore(game.dealer);

    let result: string;
    if (dealerScore > 21 || playerScore > dealerScore) {
        game.status = "won";
        result = "You win!";
    } else if (playerScore < dealerScore) {
        game.status = "lost";
        result = "Dealer wins!";
    } else {
        game.status = "Push";
        result = "It's a Push!";
    }

    res.json({
        gameId,
        player: handToString(game.player),
        dealer: handToString(game.dealer),
        status: game.status,
        result
    });
};
