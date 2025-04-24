import { Request, Response } from "express";
import { randomUUID } from "crypto";

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

type Card = {
    suit: string,
    value: string,
}


function createDeck(): Card[] {
    const deck: Card[] = []; //make it empty

    for (let i=0; i< suits.length; i++ ){
        for (let j=0; j< values.length; j++ ){
            deck.push(
                {
                    suit: suits[i],
                    value: values[j],
                }
            )
        }
    }

    return deck;
}

function printDeck(deck: Card[]):  void{
    var dummyCard:Card;
    for (let i = 0; i < deck.length; i++ ){
        dummyCard = deck[i];
        console.log(dummyCard.suit, dummyCard.value);
    }
}

function shuffleDeck(deck: Card[]):  Card[]{
    const newDeck: Card[] = [];

    
    return newDeck;
}


var deck = createDeck();
printDeck(deck);
console.log("------------");
deck = shuffleDeck(deck);

// export const blackjackStart = (req: Request, res: Response) => {
//     const deck = createDeck();
//     printDeck(deck);

// };