const Discord = require('discord.js');

module.exports = {
    doleOutPunishment: function(bot, member, guild, bannedUsers) {
        if(bannedUsers[guild.id] == null){
            bannedUsers[guild.id] = [];
        }

        if(bannedUsers[guild.id].indexOf(member.id) > -1) {
            this.banUser(member, bannedUsers[guild.id]);
        }
        else {
            this.warnUser(bot, member, bannedUsers[guild.id]);
        }
    },

    banUser: function(member, bannedUsers) {
        member.ban(7);
        member.user.dmChannel.sendMessage('You have been banned for posting profanity.')
        delete bannedUsers[member.id];
    },

    warnUser: function(bot, member, bannedUsers) {    
        bannedUsers.push(member.id);
        bot.fetchUser(member.id)
        .then(user => user.sendMessage('Your message has been deleted for profanity and logged. Another infraction will automatically trigger a ban from the server.'))   
    },

    checkPermissions: function(member) {    
        return member.hasPermission("MANAGE_MESSAGES", true);        
    },

    checkProfanity: function(message, bannedWords) {
        var words = message.split(" ");
        for(var word of words){
            if(bannedWords.indexOf(word) > -1)
                return true;
        }
        return false;
    }
}