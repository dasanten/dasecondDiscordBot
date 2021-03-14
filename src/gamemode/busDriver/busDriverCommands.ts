import { Message } from "discord.js";
import { Bot } from "../../main";
import { CardGame } from "../../model/game";
import { BusDriverGame } from "./busDriverGame";

export class BusDriverCommands{
    
    public static commandMapping(msg: Message, args) {
        switch(args[0]) {
            case 'start':
                this.startGame(msg);
                break;
            case 'next':
            case 'n':
                this.nextCard(msg, args)
                break;
            case 'help':
                msg.channel.send("`Prefix: :busDriver \nstart: Beginne ein neues spiel! \nnext was?: Ziehe die nächste Karte \nclose: Stoppe das laufende Spiel!)`")
                break;
            case 'close':
                this.closeGame(msg);
                break;
            default:
                msg.channel.send(args[0] + " ist kein busDriver command! \n`nutze :busdriver help um alle busDriver Befehle zu sehen!`")
                break;
        }
    }

    private static startGame(msg: Message) {
        if(!this.checkForExisting(msg.guild.id)) {
            Bot.games.push(new BusDriverGame(msg.guild.id));
            msg.channel.send("Es wurde ein Game erstellt!")
        } else {
            msg.channel.send("Es existiert bereits ein Game!")
        }
    }

    private static nextCard(msg: Message, args) {
        let game = this.checkForExisting(msg.guild.id);
        if (game) {
            game.nextCard(msg, args);
        } else {
            msg.channel.send("Es muss erst ein Game erstellt werden!")
        }
    }

    private static closeGame(msg: Message) {
        let delteIndex = Bot.games.findIndex((game)=>{
            return game.serverId == msg.guild.id
        });
        if(delteIndex != -1) {
            Bot.games.splice(delteIndex, 1);
            msg.channel.send("Das Spiel wurde gestoppt!")
        } else {
            msg.channel.send("Es wurde kein laufendes Spiel gefunden!")
        }
    }

    private static checkForExisting(guildId: string): BusDriverGame {
        for(let game of Bot.games) {
            if(game.serverId == guildId && game instanceof BusDriverGame) {
                return game;
            }
        }
        return null;
    }
}