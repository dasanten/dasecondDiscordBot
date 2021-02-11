import { Client, Game, GuildMember, Message } from "discord.js";
import * as fs from 'fs';
import { BusDriverCommands } from "./gamemode/busDriver/busDriverCommands";
import { CardGame } from "./model/game";

 
export class Bot {

    private client: Client;
    private config;
    public static games: CardGame[] = [];
    
    constructor(){
        this.config = JSON.parse(fs.readFileSync("src/res/config.json", "utf8"))
        this.client = new Client();
        // this.client.user.setActivity("Karten", {type: "PLAYING"})
        this.client.on('message', (msg: Message) => this.messageEvent(msg));
        this.client.on('guildMemberAdd', member => this.joinEvent(member));
        this.client.on("ready", () => console.log(`Logged in as ${this.client.user.username}`));
        this.client.login(this.config.token);
    }
    
    private messageEvent(msg: Message) {
        let content = msg.content;

        if(content.startsWith(this.config.prefix)){
            var calledCommand = content.split(' ')[0].substr(this.config.prefix.length),
            args = content.split(' ').slice(1);
    
            switch(calledCommand) {
                case 'say':
                    this.cmd_say(msg, args);
                    break;
                case 'busDriver':
                    this.cmd_startBusDriver(msg, args);
                    break;
                default:
                    msg.channel.send(calledCommand + " is no valid command!");
                    break;
            }  
        }
    }

    private joinEvent(member: GuildMember) {
        const guild = member.guild;
        const defaultChannel: any = guild.channels.find(channel => channel.name === 'general');
            
        defaultChannel.send("Wilkommen zu Daniels Geburtstag. Saufen! :beer:"); 
    }
        

    private cmd_say(msg: Message, args){
        msg.channel.send(args.join(' '))
    }
    
    private cmd_startBusDriver(msg: Message, args) {
        BusDriverCommands.commandMapping(msg, args);
    }
       
}

new Bot();