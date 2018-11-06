var bannedUsers = {};
const MAX_WARNINGS = 1;

module.exports = {
  doleOutPunishment: function(bot, member, guild) {
    if (!bannedUsers[guild.id]) {
      bannedUsers[guild.id] = {};
    }
    var warnings = bannedUsers[guild.id][member.id];
    if (!warnings) {
      this.warnUser(bot, member);
      bannedUsers[guild.id][member.id] = 1;
    } else if (warnings < MAX_WARNINGS) {
      this.warnUser(bot, member);
      bannedUsers[guild.id][member.id]++;
    } else if (warnings == MAX_WARNINGS) {
      this.banUser(member);
      bannedUsers[guild.id][member.id] = 0;
    }
  },

  banUser: function(member) {
    member.user.send('You have been banned for posting profanity.');
    member.ban(7).catch(console.error);
  },

  warnUser: function(bot, member) {
    bot.fetchUser(member.id).then(user => user.send('Your message has been deleted for profanity and logged.'));
  },

  checkProfanity: function(message, bannedWords) {
    var words = message.split(' ');
    for (var word of words) {
      if (bannedWords.indexOf(word) > -1) return true;
    }
    return false;
  },
};
