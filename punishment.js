var bannedUsers = {};

module.exports = {
    doleOutPunishment: function(bot, member, guild) {
        if(bannedUsers[guild.id] == null){            
            bannedUsers[guild.id] = [];                 
        }

        var index = bannedUsers[guild.id].indexOf(member.id);        
        if(index > -1) {
            bannedUsers[guild.id].splice(index, 1);
            this.banUser(bot, member, guild)
        }
        else {
            bannedUsers[guild.id].push(member.id);
            this.warnUser(bot, member);
        }                     
    },

    banUser: function(bot, member, guild) {
        member.user.dmChannel.sendMessage('You have been banned for posting profanity.')              
        member.ban(7);
    },

    warnUser: function(bot, member) {    
        bot.fetchUser(member.id)
        .then(user => user.sendMessage('Your message has been deleted for profanity and logged.'))   
    },

    checkPermissions: function(member) {    
        return member.hasPermission("MANAGE_MESSAGES", false);        
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