import { Card } from "./card";

export class CardSet {

    private cards: Card[] = [];
    private cardTypes: string[] = [':clubs:', ':diamonds:', ':spades:', ':heart:'];
    private cardPictures: string[] = [':boy:', ':girl:' ,':crown:', ':regional_indicator_a:' ];

    constructor(cardSetType: CardSetType) {
        this.generateCards(cardSetType);
    }

    public generateCards(cardSetType: CardSetType) {
        for(let cardType of this.cardTypes) {
            for(let i = cardSetType; i <= 10; i++) {
                this.cards.push(new Card(cardType, i));
            }
            for(let cardPicture of this.cardPictures) {
                this.cards.push(new Card(cardType, cardPicture));
            }
        }
    }

    public getRandomCard(): Card {
        let random = Math.floor(Math.random()* this.cards.length);
        let returnCard = this.cards[random];
        this.cards.splice(random, 1);
        return returnCard;
    }

}

export enum CardSetType {
    SKAT = 7, 
    POKER = 2,
}