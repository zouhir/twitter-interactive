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
const geocoder = require('./geocode')
// used to generate random numbers for prototype purposes
const faker = require('faker');
// events emitter


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
 * This function is responsible for listing to Twitter and emitting events to the browser
 * @returns {{listen: (function(*=, *=))}}
 */
module.exports = function () {
    let keywords = []
    let stream = null;
    const listen  = (pKeywords) => {
        console.log(`🍕 listening toooooooo ${pKeywords[0]} and ${pKeywords[1]}`);
        keywords = pKeywords;
        stream = twitter.stream('statuses/filter', { track: pKeywords })
        return stream;
    };
    const stopStream = () => {
        if(stream) {
            console.log('STOOOOOOOOOOOOOOP');
            stream.stop();
            stream = null;
        }
    };
    /**
     * Accepts a Tweet and returns a formatted object to be sent to the browser
     * @param tweet
     * @returns {{name, user: string, text, coordinates: {latitude, longitude}, location, type: *}}
     */
    const composer = (tweet, keywords) => {
        let type = 'one';
        if(tweet.text.indexOf(keywords[0]) > -1) {
            type = 'one';
        }
        if(tweet.text.indexOf(keywords[1]) > -1) {
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
    };

    return { listen,  stopStream, keywords, composer }
}