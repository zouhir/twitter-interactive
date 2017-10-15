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
    let keywords = [];
    if(req.query.keywords) {
        keywords = req.query.keywords.split(',')
    }

    /**
     * Real time web socket connection with the browser
     */
    twitterIO.stopStream();
    twitterIO.listen(keywords)

    res.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});
// static routes
app.use('/', express.static(path.resolve(__dirname + '/../client/build/')));
app.use('/resources', express.static(path.resolve(__dirname + '/../client/resources/')));

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        twitterIO.stopStream();
        io.emit('user disconnected');
    });
});


server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})