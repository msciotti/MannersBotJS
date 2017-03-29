module.exports = {
    logUserBan: function(bot, user, guild) {
        var loggingChannel = this.getLoggingChannel(guild);
        loggingChannel.sendMessage(`:skull: **User Banned** :skull:
                                    \n**User**: ${user.username}`);
    },

    logMessageDelete: function(bot, message) {
        var loggingChannel = this.getLoggingChannel(message.guild);
        loggingChannel.sendMessage(`:x: **Message Deleted** :x:
                                    \n**User**: ${message.author.username}
                                    \n**Message**: ${message.content}`);
    },

    logMessageUpdate: function(bot, oldMessage, newMessage){
        var loggingChannel = this.getLoggingChannel(newMessage.guild);
        loggingChannel.sendMessage(`:pencil2: **Message Updated** :pencil2:
                                    \n**User**: ${newMessage.author.username}
                                    \n**Old Message**: ${oldMessage.content}
                                    \n**New Message**: ${newMessage.content}`);
    },

    getLoggingChannel: function(guild){
        var loggingChannel = guild.channels.find('name', 'mannersbot-logging');
        if(loggingChannel === null){
            message.guild.createChannel("mannersbot-logging", "text")
            .then(loggingChannel => { return loggingChannel });
        }
        else {
            return loggingChannel;
        }
    }
}