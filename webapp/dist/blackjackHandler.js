"use strict";
// blackjackHandlerNew.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.blackjackStand = exports.blackjackHit = exports.blackjackStart = void 0;
const crypto_1 = require("crypto");
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const gameSessions = new Map();
function createDeck() {
    const deck = [];
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
// https://medium.com/@khaledhassan45/how-to-shuffle-an-array-in-javascript-6ca30d53f772
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
function printDeck(deck) {
    var dummyCard;
    for (let i = 0; i < deck.length; i++) {
        dummyCard = deck[i];
        console.log(dummyCard.suit, dummyCard.value);
    }
}
function getCardValue(card) {
    if (["J", "Q", "K"].includes(card.value))
        return 10;
    if (card.value === "A")
        return 11;
    return parseInt(card.value);
}
function calculateScore(hand) {
    let score = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    let aces = hand.filter(card => card.value === "A").length;
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}
function cardToString(card) {
    return `${card.value} `;
}
function handToString(hand) {
    return hand.map(cardToString);
}
const blackjackStart = (req, res) => {
    const deck = shuffleDeck(createDeck());
    const player = [deck.pop(), deck.pop()];
    const dealer = [deck.pop()];
    const gameId = (0, crypto_1.randomUUID)();
    console.log("game id:" + gameId);
    gameSessions.set(gameId, { deck, player, dealer, status: "playing" });
    res.json({
        gameId,
        player: handToString(player),
        dealer: handToString(dealer),
        status: "playing"
    });
};
exports.blackjackStart = blackjackStart;
const blackjackHit = (req, res) => {
    const gameId = req.body.gameId;
    const game = gameSessions.get(gameId);
    if (!game || game.status !== "playing") {
        return res.status(400).json({ error: "Invalid game" });
    }
    const newCard = game.deck.pop();
    game.player.push(newCard);
    const score = calculateScore(game.player);
    if (score > 21) {
        game.status = "lost";
        return res.json({
            gameId,
            player: handToString(game.player),
            dealer: handToString(game.dealer),
            status: game.status,
            result: "You busted! Dealer wins!"
        });
    }
    res.json({
        gameId,
        player: handToString(game.player),
        dealer: handToString(game.dealer),
        status: game.status
    });
};
exports.blackjackHit = blackjackHit;
const blackjackStand = (req, res) => {
    const gameId = req.body.gameId;
    const game = gameSessions.get(gameId);
    if (!game || game.status !== "playing") {
        return res.status(400).json({ error: "Invalid game" });
    }
    while (calculateScore(game.dealer) < 17) {
        const newCard = game.deck.pop();
        game.dealer.push(newCard);
    }
    const playerScore = calculateScore(game.player);
    const dealerScore = calculateScore(game.dealer);
    let result;
    if (dealerScore > 21 || playerScore > dealerScore) {
        game.status = "won";
        result = "You win!";
    }
    else if (playerScore < dealerScore) {
        game.status = "lost";
        result = "Dealer wins!";
    }
    else {
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
exports.blackjackStand = blackjackStand;
