var Punishment = require('./punishment.js');
var Logging = require('./logging.js');
var Initialize = require('./initialize.js');

const Discord = require('discord.js');
const settings = require('./settings.json');
const bot = new Discord.Client();
var bannedWords = Initialize.loadBannedWords();
var bannedUsers = require('./bannedUsers.json');

bot.on('ready', () => {
    console.log('I am ready to make your server a better place!')
    Logging.checkForLoggingChannel(bot);    
});

bot.on('disconnect', () => {
    fs.writeFile('bannedUsers.json', bannedUsers, 'utf8', function(err, data) {
        if(err) { console.log(err); }
        else { console.log('Saved banned user states.'); }      
    });
})

bot.on('message', message => {
    if(message.channel.type != "dm") {
        if(!Punishment.checkPermissions(message.member)){
            if(Punishment.checkProfanity(message.content, bannedWords)){
                message.delete()
                .then(msg => Punishment.doleOutPunishment(bot, msg.member, msg.guild, bannedUsers))
            }
        } 
    }      
});

bot.login(settings['BOT_LOGIN_TOKEN']);