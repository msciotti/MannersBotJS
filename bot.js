var Punishment = require('./punishment.js');
var Logging = require('./logging.js');
var Initialize = require('./initialize.js');

const Discord = require('discord.js');
const settings = require('./settings.json');
const bot = new Discord.Client();
var bannedWords = Initialize.loadBannedWords();

bot.on('ready', () => {
    console.log('I am ready to make your server a better place!')
});

bot.on('message', message => {
    if(message.channel.type != "dm") {
        if(!Punishment.checkPermissions(message.member)){
            if(Punishment.checkProfanity(message.content, bannedWords)){
                message.delete()
                .then(msg => {                    
                    Punishment.doleOutPunishment(bot, msg.member, msg.guild);
                })
            }
        } 
    }      
});

bot.on('messageDelete', message => {
    Logging.logMessageDelete(bot, message);
})

bot.on('messageUpdate', (oldMessage, newMessage) => {
    Logging.logMessageUpdate(bot, oldMessage, newMessage);
})

bot.on('guildBanAdd', (guild, user) =>{
    Logging.logUserBan(bot, user, guild);
})

bot.login(settings['BOT_LOGIN_TOKEN']);