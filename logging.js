module.exports = {
    logUserBan: function(user) {

    },

    logMessageDelete: function(message) {

    },

    checkForLoggingChannel: function(bot) {
        for(var guild in bot.guilds.values){
            for(var channel in guild.channels.values){
                if(channel.name === "mannersbot-logging"){
                    break;
                }
            }
            guild.createChannel("mannersbot-logging", "text");
        };
    }
}