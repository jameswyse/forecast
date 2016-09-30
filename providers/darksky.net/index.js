var Client = require('request-json').JsonClient;

var DarkSky = module.exports = function(options) {
  this.options = options || {};
  this.client  = new Client('https://api.darksky.net/forecast/' + this.options.key + '/');
};

DarkSky.prototype.query = function(apiParams, callback) {
  if(!this.options.key) return callback('No API key specified - Get one from https://darksky.net/dev');

  var units = this.options.units.charAt(0).toLowerCase() === 'c' ? '?units=si' : '';
  this.client.get(apiParams.join(',') + units, callback);
};

DarkSky.prototype.get = function(apiParams, callback) {
  this.query(apiParams, function(err, res, body) {
    if(err || !body || !body.currently) return callback(err);
    return callback(null, body);
  });
};
