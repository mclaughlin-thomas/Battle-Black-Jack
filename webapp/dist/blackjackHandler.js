"use strict";
// blackjackHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.blackjackStand = exports.blackjackHit = exports.blackjackStart = void 0;
const crypto_1 = require("crypto");
const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
function createDeck() {
    return suits.flatMap(suit => values.map(value => `${value}${suit}`));
}
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
function getCardValue(card) {
    const value = card.slice(0, -1);
    if (["J", "Q", "K"].includes(value))
        return 10;
    if (value === "A")
        return 11; // simplified, we’ll handle A=1 logic later
    return parseInt(value);
}
function calculateScore(hand) {
    let score = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    let aces = hand.filter(card => card.startsWith("A")).length;
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}
const gameSessions = new Map();
const blackjackStart = (req, res) => {
    const deck = shuffle(createDeck());
    const player = [deck.pop(), deck.pop()];
    const dealer = [deck.pop()];
    const gameId = (0, crypto_1.randomUUID)();
    gameSessions.set(gameId, { player, dealer, status: "playing" });
    res.json({ gameId, player, dealer, status: "playing" });
};
exports.blackjackStart = blackjackStart;
const blackjackHit = (req, res) => {
    const { gameId } = req.body;
    const game = gameSessions.get(gameId);
    if (!game || game.status !== "playing")
        return res.status(400).json({ error: "Invalid game" });
    const newCard = createDeck().sort(() => 0.5 - Math.random())[0]; // simulate draw
    game.player.push(newCard);
    const score = calculateScore(game.player);
    if (score > 21) {
        game.status = "lost";
        return res.json({ ...game, result: "Player busts! Dealer wins." });
    }
    res.json(game);
};
exports.blackjackHit = blackjackHit;
const blackjackStand = (req, res) => {
    const { gameId } = req.body;
    const game = gameSessions.get(gameId);
    if (!game || game.status !== "playing")
        return res.status(400).json({ error: "Invalid game" });
    while (calculateScore(game.dealer) < 17) {
        const newCard = createDeck().sort(() => 0.5 - Math.random())[0];
        game.dealer.push(newCard);
    }
    const playerScore = calculateScore(game.player);
    const dealerScore = calculateScore(game.dealer);
    if (dealerScore > 21 || playerScore > dealerScore) {
        game.status = "won";
        res.json({ ...game, result: "You win!" });
    }
    else if (playerScore < dealerScore) {
        game.status = "lost";
        res.json({ ...game, result: "Dealer wins!" });
    }
    else {
        game.status = "draw";
        res.json({ ...game, result: "It's a draw!" });
    }
};
exports.blackjackStand = blackjackStand;
