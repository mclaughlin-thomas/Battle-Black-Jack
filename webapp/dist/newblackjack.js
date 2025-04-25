"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
function createDeck() {
    const deck = []; //make it empty
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
function printDeck(deck) {
    var dummyCard;
    for (let i = 0; i < deck.length; i++) {
        dummyCard = deck[i];
        console.log(dummyCard.suit, dummyCard.value);
    }
}
//https://www.geeksforgeeks.org/javascript-program-to-shuffle-deck-of-cards/
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
var deck = createDeck();
printDeck(deck);
console.log("------------");
deck = shuffleDeck(deck);
printDeck(deck);
// export const blackjackStart = (req: Request, res: Response) => {
//     const deck = createDeck();
//     printDeck(deck);
// };
