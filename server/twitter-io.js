/**
 * @module: Server Module
 * @description: Responsible for listening to Twitter realtime and emitting relevant tweets
 *
 * @developer: Zouhir Chahoud - 11763745
 */

// Twitter Nodejs module
const Twit = require('twit');
// Secret keys
const keys = require('./keys.json');
// local geocode module
const geocode = require('./geocode')
// used to generate random numbers for prototype purposes
const faker = require('faker');

/**
 * Initialise Twitter agent
 */
const twitter = new Twit({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token: keys.access_token,
    access_token_secret: keys.access_token_secret
});

/**
 * Accepts a Tweet and returns a formatted object to be sent to the browser
 * @param tweet
 * @returns {{name, user: string, text, coordinates: {latitude, longitude}, location, type: *}}
 */
function compose(tweet) {
    let type = 'one';
    if(tweet.text.indexOf('Google') > -1 || tweet.text.indexOf('Pixel') > -1 ) {
        type = 'one';
    }
    if(tweet.text.indexOf('iPhone') > -1) {
        type = 'two';
    }
    return {
        name: tweet.user.name,
        user: `@${tweet.user.screen_name}`,
        text: tweet.text,
        coordinates: { latitude: faker.address.latitude(), longitude: faker.address.longitude() },
        location: faker.address.country(),
        type: type
    }
}

/**
 * This function is responsible for listing to Twitter and emitting events to the browser
 * @returns {{listen: (function(*=, *=))}}
 */
module.exports = function () {
    let streaming = false;
    let stream;
    let keywords = []
    const listen  = (pKeywords) => {

        console.log(`🍕 listening toooooooo ${keywords1} and ${keywords2}`);
        keywords = pKeywords;
        stream = twitter.stream('statuses/filter', { track: pKeywords })
        stream.on('tweet', function (tweet) {

            socket.emit('tweet', compose(tweet))
            streaming = true;
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
    };
    const stopStream = () => {
        if(stream) {
            console.log('STOOOOOOOOOOOOOOP');
            stream.stop();
        }
    }
    return { listen,  stopStream, streaming, keywords }
}