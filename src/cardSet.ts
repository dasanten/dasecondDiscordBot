
export class CardSet {

    private cards: string[] = [];
    private cardTypes: string[] = [':clubs:', ':diamonds:', ':spades:', ':heart:'];
    private cardPictures: string[] = [':boy:', ':girl:' ,':crown:', ':regional_indicator_a:' ];

    constructor(cardSetType: CardSetType) {
        this.generateCards(cardSetType);
    }

    public generateCards(cardSetType: CardSetType) {
        for(let cardType of this.cardTypes) {
            for(let i = cardSetType; i <= 10; i++) {
                this.cards.push(cardType + ' ' + i)
            }
            for(let cardPicture of this.cardPictures) {
                this.cards.push(cardType + ' ' + cardPicture)
            }
        }
    }

    public getRandomCard(): string {
        let random = Math.floor(Math.random()* this.cards.length);
        let returnCard = this.cards[random];
        this.cards.slice(random);
        return returnCard;
    }

}

enum CardSetType {
    SKAT = 7, 
    POKER = 2,
}