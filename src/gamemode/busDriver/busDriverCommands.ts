import { Message } from "discord.js";
import { Bot } from "../../main";
import { BusDriverGame } from "./busDriverGame";

export class BusDriverCommands{
    
    public static commandMapping(msg: Message, args) {
        switch(args[0]) {
            case 'start':
                this.startGame(msg);
                break;
            case 'next':
                this.nextCard(msg)
                break;
            default:
                msg.channel.send(args[0] + " ist kein busDriver command!")
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

    private static nextCard(msg: Message) {
        let game = this.checkForExisting(msg.guild.id);
        if (game) {
            game.nextCard(msg);
        } else {
            msg.channel.send("Es muss erst ein Game erstellt werden!")
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