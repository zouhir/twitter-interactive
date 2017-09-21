const express = require('express')
const bodyParser = require('body-parser');
const _twitterIO = require('./twitter-io');
const socket = require('socket.io');
const http = require('http');
/**
 * express app
 */
const app = express();

/**
 * Socket.io server
 */
const server = http.createServer(app);
let io = socket(server);

/**
 * Middleware
 */

app.use(bodyParser.urlencoded({ extended: false }))

let twitterIO = null;

io.on('connection', function (socket) {
    twitterIO = _twitterIO(socket);

    twitterIO.listen(['iphone'], ['android'])

});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})