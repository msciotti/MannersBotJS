module.exports = {
    logUserBan: function(bot, user, guild) {
        this.getLoggingChannel(guild, function(loggingChannel) {
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
                
        if(loggingChannel == null){
            var plebRoles = guild.roles.filter(x => x.hasPermission('MANAGE_MESSAGES'));
            var roleArray = [];
            for(var role of plebRoles){
                var override = {
                    id: role[0],
                    type: 'role',
                    allow: 1024,
                    deny: 2048
                };
                roleArray.push(override);
            }
            roleArray.push({
                id: guild.id,
                type: 'role',
                deny: 3072
            });

            console.log(roleArray);
            guild.createChannel('mannersbot-logging', 'text', roleArray)
            .then(newChannel => callback(newChannel))
            .catch(console.error);
        }
        else {
            callback(loggingChannel);
        }                   
    }
}