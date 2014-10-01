var Client = require('request-json').JsonClient;

var ForecastIO = module.exports = function(options) {
  this.options = options || {};
  this.client  = new Client('https://api.forecast.io/forecast/' + this.options.key + '/');
};

ForecastIO.prototype.query = function(apiParams, callback) {
  if(!this.options.key) return callback('No API key specified - Get one from https://developer.forecast.io');

  var units = this.options.units.charAt(0).toLowerCase() === 'c' ? '?units=si' : '';
  this.client.get(apiParams.join(',') + units, callback);
};

ForecastIO.prototype.get = function(apiParams, callback) {
  this.query(apiParams, function(err, res, body) {
    if(err || !body || !body.currently) return callback(err);
    return callback(null, body);
  });
};
