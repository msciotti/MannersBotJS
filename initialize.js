var fs = require('fs');
var readLine = require('readline');

module.exports = {
    loadBannedWords: function(){
        var bannedWords = [];
        var filename = 'en.txt';
        readLine.createInterface({
            input: fs.createReadStream(filename),
            terminal: false
        })
        .on('line', function(line){            
            bannedWords.push(line);
        });
        return bannedWords;
    }
}