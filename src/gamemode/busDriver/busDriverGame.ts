import { Message } from "discord.js";
import { type } from "os";
import { Card } from "../../model/card";
import { CardSet, CardSetType } from "../../model/cardSet";
import { CardGame } from "../../model/game";

export class BusDriverGame extends CardGame {

    private cardSet: CardSet;
    private lastCard: Card;

    constructor(guild) {
        super(guild);
        this.cardSet = new CardSet(CardSetType.POKER)
    }

    public nextCard(msg: Message, args) {
        let cardPrediction = args[1] = "higher" || "lower" || "equal" ? args[1]: null;   
        let card = this.cardSet.getRandomCard();
        if(card) {
            msg.channel.send("Karte: " + card.type + card.value)
                if(cardPrediction && this.lastCard) {
                let prediction: boolean;
                let valid: boolean = true;
                switch(cardPrediction){
                    case 'higher':
                    case '>':
                        prediction = card.getValue() > this.lastCard.getValue();
                        break;
                    case 'lower':
                    case "<":
                        prediction = card.getValue() < this.lastCard.getValue();
                        break;
                    case 'equal':
                    case '=':
                        prediction = card.getValue() == this.lastCard.getValue();
                        break;
                    default:
                        msg.channel.send("Ungültige vohersage");
                        valid = false;
                        break;
                }
                if(prediction) {
                    msg.channel.send("Die vorhersage war richtig")
                } else if(valid){
                    msg.channel.send("Die vorhersage war falsch")
                }
            }
            this.lastCard = card;
        } else {
            this.cardSet.generateCards(CardSetType.POKER);
            msg.channel.send("Das Set ist durch es wurde ein neues gemischt!");
        }
    }
}