const nodeGeocoder = require('node-geocoder')



const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyCe8GelcW9HRd1Q7r2iFZUNROKUeAXKOVc',
    formatter: null
};


const geocoder = nodeGeocoder(options);

module.exports = function(address) {
    // Or using Promise
    return geocoder.geocode(address)
}