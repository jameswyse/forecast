var Client = require('request-json').JsonClient;

var DarkSky = module.exports = function (options) {
  this.options = options || {};
  this.client = new Client('https://api.darksky.net/forecast/' + this.options.key + '/');
};

DarkSky.prototype.query = function (latlong, callback) {
  if (!this.options.key) {
    return callback('No API key specified - Get one from https://darksky.net/dev');
  }

  var apiQuery = [];

  if (this.options.units.charAt(0).toLowerCase() === 'c') {
    apiQuery.push('units=si');
  }

  if (this.options.lang) {
    apiQuery.push('lang=' + this.options.lang);
  }

  var params = [
    latlong.join(','),
    apiQuery.join('&')
  ].join('?');

  return this.client.get(params, callback);
};

DarkSky.prototype.get = function (apiParams, callback) {
  this.query(apiParams, function (err, res, body) {
    if (err || !body || !body.currently) {
      return callback(err);
    }
    return callback(null, body);
  });
};
