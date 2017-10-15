/**
 * @module: Node Geocoder
 * @description: Converts city name to an object with longtiude, latitude
 *
 * @developer: Zouhir Chahoud - 11763745
 */

const nodeGeocoder = require('node-geocoder')

/**
 * Node Geocoder options
 * @type {{provider: string, httpAdapter: string, apiKey: string, formatter: null}}
 */
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: '',
    formatter: null
};

const geocoder = nodeGeocoder(options);

module.exports = geocoder