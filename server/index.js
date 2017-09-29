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

/**
 * Socket.io server
 */
const server = http.createServer(app);
let io = socket(server);

/**
 * Middleware
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', express.static(path.resolve(__dirname + '/../client/build/')));
app.use('/resources', express.static(path.resolve(__dirname + '/../client/resources/')));


/**
 * Real time web socket connection with the browser
 */
let twitterIO = null;
io.on('connection', function (socket) {
    twitterIO = _twitterIO(socket);
    twitterIO.listen(['iPhone X', 'iPhone 8'], ['Google Pixel', 'Pixel', 'Pixel 2'])
});

/**
 * The main route
 */
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})