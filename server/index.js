const express = require('express')

const Twit = require('twit');

const keys = require('./keys.json');

const app = express();

const server = require('http').Server(app);
var io = require('socket.io')(server);

function stream(keywords1, keywords2) {
    const twitter = new Twit({
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        access_token: keys.access_token,
        access_token_secret: keys.access_token_secret
    });
    var keywords = [].concat(keywords1, keywords2);

    var stream = twitter.stream('statuses/filter', { track: keywords })

    stream.on('tweet', function (tweet) {
        console.log(tweet)
    })

}



io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

stream([1, 2], [3, 45]);