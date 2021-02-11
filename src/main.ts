import { Client, GuildMember, Message } from "discord.js";
import * as fs from 'fs';

 
export class Bot {

    private client: Client;
    private config;
    
    constructor(){
        this.config = JSON.parse(fs.readFileSync("src/res/config.json", "utf8"))
        this.client = new Client();
        this.client.user.setActivity("Karten", {type: "PLAYING"})
        this.client.on('message', (msg: Message) => this.messageEvent(msg));
        this.client.on('guildMemberAdd', member => this.joinEvent(member));
        this.client.on("ready", () => console.log(`Logged in as ${this.client.user.username}`));
        this.client.login(this.config.token);
    }
    
    private cardsGot = 0;
    
    private messageEvent(msg: Message) {
        let content = msg.content;

        if(content.startsWith(this.config.prefix)){
            var calledCommand = content.split(' ')[0].substr(this.config.prefix.length),
            args = content.split(' ').slice(1)
    
            console.log(calledCommand, args)
    
            switch(calledCommand) {
                case 'say':
                    this.cmd_say(msg, args);
                    break;
                case 'test':
                    this.cmd_test(msg, args);
                    break;
                case 'randomCard':
                    this.cmd_card(msg, args);
                    break;
                case 'cmd_new_cards':
                    this.cmd_new_cards;
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
    
    private cmd_test(msg, args){
        console.log("test")
    }
    
    private cmd_card(msg, args){
        if (this.cardsGot < 32){
            let rdm = Math.floor(Math.random() * 13);
            let value;
            switch(rdm){
                case 0:
                    value = 2;
                    break;
                case 1:
                    value = 3;
                    break;
                case 2:
                    value = 4;
                    break;
                case 3:
                    value = 5;
                    break;
                case 4:
                    value = 6;
                    break;
                case 5:
                    value = 7;
                    break;
                case 6:
                    value = 8;
                    break;
                case 7:
                    value = 9;
                    break;    
                case 8:
                    value = 10;
                    break;
                case 9:
                    value = "Bube";
                    break;
                case 10:
                    value = "Dame";
                    break;
                case 11:
                    value = "König";
                    break;
                case 12:
                    value = "Ass";
                    break;
                default:
                    value = "FAIL "+ Math.floor(Math.random() * 13);
                    break;
            } 
            this.cardsGot++;
            msg.channel.send('Karte: ' + this.cardKind() + " " + value + '\nGezogene Karte Nr.'+ this.cardsGot)
            msg.channel.send()
    
    
        } else {
            msg.channel.send('Kartendeck ist durch nutze "newCards" für ein neues Deck')
        }
    }
        
        
    private cmd_new_cards(msg){
            this.cardsGot = 0;
            msg.channel.send('Neues Kartendeck wurde gemischt')
        }
        
        
    private cardKind(){
        let rdm = Math.floor(Math.random() * 4);
        switch(rdm){
            case 0:
                return ":clubs: ";
                break;
            case 1:
                return ":diamonds: ";
                break;
            case 2:
                return ":spades: ";
                break;
            case 3:
                return ":heart: ";
                break;
            default:
                return "Fail Karten Art " + Math.floor(Math.random() *4);

        }
    }
       
}

new Bot();