const Twit = require('twit');
const keys = require('./keys.json');
const geocode = require('./geocode')

const twitter = new Twit({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token: keys.access_token,
    access_token_secret: keys.access_token_secret
});

function compose(tweet) {
    return {
        name: tweet.user.name,
        user: `@${tweet.screen_name}`,
        text: tweet.text,
        coordinates: tweet.coordinates,
        location: tweet.user.location
    }
}

module.exports = function (socket) {

    const listen  = (keywords1, keywords2) => {
        var keywords = [].concat(keywords1, keywords2);

        var stream = twitter.stream('statuses/filter', { track: keywords })

        stream.on('tweet', function (tweet) {
            if(! tweet.coordinates && tweet.user.location) {
                geocode(tweet.user.location).then(res => {
                    let latlong, _res;
                    if (res.length) {
                        _res = res[0]
                    } else {
                        _res = res
                    }
                    let latlong = {latitude: _res.latitude, longitude: _res.latitude }
                    tweet.coordinates = latlong
                    socket.emit('tweet', compose(tweet))
                })
            } else {
                socket.emit('tweet', compose(tweet))
            }

        })
    }

    return { listen: listen }

}