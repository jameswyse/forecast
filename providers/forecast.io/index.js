var Client = require('request-json').JsonClient;

var ForecastIO = module.exports = function(options) {
  this.options = options || {};
  this.client = new Client('https://api.forecast.io/forecast/' + this.options.key + '/');
};

ForecastIO.prototype.query = function(lat, lon, callback) {
  if(!this.options.key) return callback('No API key specified - Get one from developer.forecast.io');

  var units = this.options.units.charAt(0).toLowerCase() === 'c' ? '?units=si' : '';
  this.client.get(lat + ',' + lon + units, callback);
};

ForecastIO.prototype.get = function(location, callback) {
  this.query(location[0], location[1], function(err, res, body) {
    if(err || !body || !body.currently) return callback(err);
    return callback(null, body);
  });
};
