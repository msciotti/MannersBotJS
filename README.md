# MannersBotJS

MannersBot is a bot to help keep your Discord servers clean from profanity. MannersBot will search messages sent to channels for profanity, deleting profane text and logging edited messages, deleted messages, and banned users to a special channel.

MannersBot will also automatically ban users from your server on their second offense.

If you would like to add or remove profanity from the filter, you may edit the `en.txt` file. To remove a word or phrase, delete it from the file; to add, add the new word or phrase on a new line.

MannersBot is dependent on NodeJS. In order to run locally, please ensure that your machine has all of the necessary components. NodeJS can be installed from https://nodejs.org/en/download/ if you do not already have it.

To run MannersBot, clone this repository and navigate to the downloaded folder. Type `npm install` to install the necessary packages, and `node bot.js` to run the bot. The bot will not automatically be added to your server. In order to add it to a server over which you have administrative control, follow the link at https://discordapp.com/oauth2/authorize?client_id=296433784453332993&scope=bot&permissions=2080898175.

# A note on management

By default, MannersBot will log all edited and deleted messages and banned users to a `#mannersbot-logging` channel (don't worry, it will create one for you). This channel will only be visible to members who have the "MANAGE MESSAGES" permission on the server. Those users will only be able to read the logging channel. Administrator rights override these restrictions.

MannersBot will also ignore the profanity filter for messages sent by users with the same "MANAGE MESSAGE" permission.
