    // Imports
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

    // Main
console.log('**\nTwitDice Bot Init\n**\n');

    // Declare Variables
var diceAmt;
var diceVal;
var loops;
var dRolled;
var eDice = '🎲';

    // Random Func
function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
}

    // Stream
var stream = T.stream('user');
stream.on('tweet', tweetEvent);

    // Tweet Computation
function tweetEvent(eventMsg) {
    var tweetFrom = eventMsg.user.screen_name;
    var tweetTo = eventMsg.in_reply_to_screen_name;
    var tweetText = eventMsg.text;
    
    if (tweetTo === 'TwitDiceBot' && (tweetText.includes('D') || tweetText.includes('🎲')) ) {
        diceAmt = 2;
        diceVal = 10;
        
        loops = 1;
        while (loops <= diceAmt) {
            var diceRoll = getRandomInt(1, diceVal);
            dRolled = dRolled + " [" + diceRoll + "]";
        }
        loops += 1;
        
        var tweetOut = '@' + tweetFrom + ' ' + diceAmt + eDice + diceVal + ' > ' + dRolled;
        tweetSend(tweetOut);
    
    } else {
        var tweetOut = '@' + tweetFrom + 'Your syntax is incorrect :/\nTry: D20 or 2D6 as an example.';
        tweetSend(tweetOut);
    }
}

    // Sending Tweet
function tweetSend(txt) {
    T.post('statuses/update', { status: txt }, tweetInfo);
}

    // Success/Error
function tweetInfo(err, data, response) {
    if (err) {
        console.log('\n >Error Tweeting.\n');
    } else {
        console.log('\n >Successfully Tweeted:\n' + tweetOut.replace(/,/g, '').replace(/"     "/g, '') + '\n__\n');
    }
}