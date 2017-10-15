const express = require('express')
const bodyParser = require('body-parser');
const _twitterIO = require('./twitter-io');
const socket = require('socket.io');
const http = require('http');
const path = require('path');
/**
 * express app
 */
const app = express();
const session = require('express-session')

/**
 * Socket.io server
 */
const server = http.createServer(app);
let io = socket(server);
let twitterIO = _twitterIO();
let stream = null;
let keywords = [];
let clientSocket = null;

/**
 * Middleware
 */
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * The main route
 */
app.get('/', function (req, res) {

    /**
     * it is a demp app
     * we will stop twit & restart it on every new connection
     * because we can't afford to open multiple twitter streams
     * on our free plan.
     */
    if(req.query.keywords) {
        keywords = req.query.keywords.split(',')
    }
    if(keywords.length === 2) {
        console.log('initialising stream')
        /**
         * Real time web socket connection with the browser
         */
        twitterIO.stopStream();
        stream = twitterIO.listen(keywords)
        stream.on('tweet', function (tweet) {
            console.log('tweet');
            if(clientSocket) {
                clientSocket.emit('tweet', twitterIO.composer(tweet, keywords))
            }
        });
        stream.on('disconnect', function (disconn) {
            console.log('disconnect')
        });
        stream.on('connect', function (conn) {
            console.log('connecting')
        });
        stream.on('reconnect', function (reconn, res, interval) {
            console.log('reconnecting. statusCode:', res.statusCode)
        });
    }


    res.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});
// static routes
app.use('/', express.static(path.resolve(__dirname + '/../client/build/')));
app.use('/resources', express.static(path.resolve(__dirname + '/../client/resources/')));

io.on('connection', function (_s) {
    clientSocket = _s;
    console.log('connected.......');
    _s.on('disconnect', function () {
        // twitterIO.stopStream();
        io.emit('user disconnected');
    });
});


server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})