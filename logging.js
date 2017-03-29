module.exports = {
    logUserBan: function(bot, user, guild) {
        this.getLoggingChannel(message.guild, function(loggingChannel) {
            loggingChannel.sendMessage(`:skull: **User Banned** :skull:
                                       \n**User**: ${user.username}`);   
        });            
    },

    logMessageDelete: function(bot, message) {
        this.getLoggingChannel(message.guild, function(loggingChannel) {
            loggingChannel.sendMessage(`:x: **Message Deleted** :x:
                                       \n**User**: ${message.author.username}
                                       \n**Message**: ${message.content}`);    
        });        
    },

    logMessageUpdate: function(bot, oldMessage, newMessage){                
        this.getLoggingChannel(oldMessage.guild, function(loggingChannel) {
            loggingChannel.sendMessage(`:pencil2: **Message Updated** :pencil2:
                                        \n**User**: ${newMessage.author.username}
                                        \n**Old Message**: ${oldMessage.content}
                                        \n**New Message**: ${newMessage.content}`);            
        });
    },

    getLoggingChannel: function(guild, callback){                
        var loggingChannel = guild.channels.find('name', 'mannersbot-logging');
        var override = {
            id: guild.id,
            type: 'role',
            allow: 1024,
            deny: 2048
        };
        
        if(loggingChannel == null){                        
            guild.createChannel('mannersbot-logging', 'text', [override])
            .then(newChannel => callback(newChannel))
            .catch(console.error);
        }
        else {
            callback(loggingChannel);
        }                   
    }
}