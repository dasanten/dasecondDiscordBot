const Discord = require("discord.js")
const fs = require("fs")   

const config = JSON.parse(fs.readFileSync("config.json", "utf8"))

var client = new Discord.Client()
let cardsGot = 0;


client.on("ready", () =>{
    console.log(`Logged in as ${client.user.username}`)
})



var cmdmap = {
    say: cmd_say,
    test: cmd_test,
    randomCard: cmd_card,
    newCards: cmd_new_cards,
}

function cmd_say(msg, args){
    msg.channel.send(args.join(' '))
}

function cmd_test(msg, args){
    console.log("test")
}

function cmd_card(msg, args){
    if (cardsGot < 32){
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
                value = "FAIL "+ Math.floor(Math.random * 13);
                break;
        } 
        cardsGot++;
        msg.channel.send('Karte: ' + cardKind() + " " + value + '\nGezogene Karte Nr.'+ cardsGot)
        msg.channel.send()


    } else {
        msg.channel.send('Kartendeck ist durch nutze "newCards" für ein neues Deck')
    }
}
    
    
    function cmd_new_cards(msg){
        cardsGot = 0;
        msg.channel.send('Neues Kartendeck wurde gemischt')
    }
    
    
    function cardKind(){
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
                return "Fail Karten Art " + Math.floor(Math.random*4);
    
        }

    }
   




client.on('message', (msg)=> {
    var cont = msg.content,
    author = msg.member,
    channel = msg.channel,
    guild = msg.guild

    if(author.id != client.user.id && cont.startsWith(config.prefix)){
        var invoke = cont.split(' ')[0].substr(config.prefix.length),
        args = cont.split(' ').slice(1)

        console.log(invoke, args)
        

        

            if(invoke in cmdmap){
                cmdmap[invoke](msg, args)
            }
    }
})

client.on('guildMemberAdd', member => {
    const guild = member.guild;
    const defaultChannel = guild.channels.find(channel => channel.name === 'general');


    defaultChannel.send("Wilkommen zu Daniels Geburtstag. Saufen! :beer:"); 
});



client.login(config.token)