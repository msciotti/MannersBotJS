const Discord = require('discord.js');
module.exports = {
    logUserBan: function(bot, user, guild) {
        var loggingChannel = guild.channels.find('name', 'mannersbot-logging');
        if(loggingChannel === null){
            guild.createChannel("mannersbot-logging", "text")
            .then(loggingChannel => loggingChannel.sendMessage(`:skull: **User Banned** :skull:
                                    \n**User**: ${user.username}`))
        }
        loggingChannel.sendMessage(`:skull: **User Banned** :skull:
                                    \n**User**: ${user.username}`);
    },

    logMessageDelete: function(bot, message) {
        var loggingChannel = message.guild.channels.find('name', 'mannersbot-logging');
        if(loggingChannel === null){
            message.guild.createChannel("mannersbot-logging", "text")
            .then(loggingChannel => loggingChannel.sendMessage(`:x: **Message Deleted** :x:
                                    \n**User**: ${message.author.username}
                                    \n**Message**: ${message.content}`))
        }
        loggingChannel.sendMessage(`:x: **Message Deleted** :x:
                                    \n**User**: ${message.author.username}
                                    \n**Message**: ${message.content}`);
    },

    logMessageUpdate: function(bot, oldMessage, newMessage){
        var loggingChannel = newMessage.guild.channels.find('name', 'mannersbot-logging');
        if(loggingChannel === null){
            message.guild.createChannel("mannersbot-logging", "text")
            .then(loggingChannel => loggingChannel.sendMessage(`:pencil2: **Message Updated** :pencil2:
                                    \n**User**: ${newMessage.author.username}
                                    \n**Old Message**: ${oldMessage.content}
                                    \n**New Message**: ${newMessage.content}`))
        }
        loggingChannel.sendMessage(`:pencil2: **Message Updated** :pencil2:
                                    \n**User**: ${newMessage.author.username}
                                    \n**Old Message**: ${oldMessage.content}
                                    \n**New Message**: ${newMessage.content}`);
    }
}