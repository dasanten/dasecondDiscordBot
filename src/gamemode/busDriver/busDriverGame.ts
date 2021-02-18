import { Message } from "discord.js";
import { CardSet, CardSetType } from "../../model/cardSet";
import { CardGame } from "../../model/game";

export class BusDriverGame extends CardGame {

    private cardSet: CardSet;

    constructor(guild) {
        super(guild);
        this.cardSet = new CardSet(CardSetType.POKER)
    }

    public nextCard(msg: Message) {
        let card = this.cardSet.getRandomCard();
        if(card) {
            msg.channel.send("Karte: " + card.type + card.value)
        } else {
            this.cardSet.generateCards(CardSetType.POKER);
            msg.channel.send("Das Set ist durch es wurde ein neues gemischt!");
        }
    }

}