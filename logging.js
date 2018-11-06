module.exports = {
  logUserBan: function(user, guild) {
    const channel = this.getLoggingChannel(guild);
    channel.send(`:skull: **User Banned** :skull:
                                       \n**User**: ${user.username}`);
  },

  logMessageDelete: function(message) {
    const channel = this.getLoggingChannel(message.guild);
    channel.send(
      `:x: **Message Deleted** :x:
                                       \n**User**: ${message.author.username}
                                       \n**Message**: ${message.content}`
    );
  },

  logMessageUpdate: function(oldMessage, newMessage) {
    const channel = this.getLoggingChannel(oldMessage.guild);
    channel.send(
      `:pencil2: **Message Updated** :pencil2:
                                        \n**User**: ${newMessage.author.username}
                                        \n**Old Message**: ${oldMessage.content}
                                        \n**New Message**: ${newMessage.content}`
    );
  },

  getLoggingChannel: function(guild) {
    var loggingChannel = guild.channels.find(x => x.name === 'mannersbot-logging');

    if (loggingChannel == null) {
      var plebRoles = guild.roles.filter(x => x.hasPermission('MANAGE_MESSAGES'));
      var roleArray = [];
      for (var role of plebRoles) {
        var override = {
          id: role[0],
          type: 'role',
          allow: 1024,
          deny: 2048,
        };
        roleArray.push(override);
      }
      roleArray.push({
        id: guild.id,
        type: 'role',
        deny: 3072,
      });

      console.log(roleArray);
      guild
        .createChannel('mannersbot-logging', 'text', roleArray)
        .then(newChannel => (loggingChannel = newChannel))
        .catch(console.error);
    }
    return loggingChannel;
  },
};
