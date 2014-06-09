/**
 * Forecast - Weather Info for Node.js
 * By James Wyse <james@jameswyse.net>
 *
 * https://github.com/lemoncreative/forecast/
 */

var _         = require('underscore')
  , crypto    = require('crypto')
  , moment    = require('moment')
  , providers = require('./providers');

/**
 * Forecast Constructor
 * @param {Object} options Options
 */
var Forecast = module.exports = function(options) {
  this.options = options || {};
  this.providers = providers;
  this.cache = {};

  _.defaults(this.options, {
      service: 'forecast.io'
    , units: 'celcius'
    , cache: true
    , ttl: { minutes: 30 }
  });

  if(this.options.key === 'your-api-key') this.options.key = null;

  this.options.ttl = moment.duration(this.options.ttl);
};

/**
 * Expired - Checks if the given `key` has expired.
 * @param  {String} key Cache key
 * @return {Boolean}    `true` if expired, `false` otherwise.
 */
Forecast.prototype.expired = function(key) {
  var isOld = this.cache[key].expires < (new Date().getTime());
  if(isOld) delete this.cache[key];
  return isOld;
};

/**
 * Get the current weather conditions
 * @param  {Array}   location  Accepts a latitude and longitude pair as an `Array`
 * @param  {Function} callback Callback, signature: callback(err, result)
 */
Forecast.prototype.get = function(location, callback) {
  var self = this
    , key = crypto.createHash('md5').update(this.options + location).digest('hex');

  if(this.options.cache && this.cache[key] && !this.expired(key)) {
    return callback(null, this.cache[key]);
  }

  var Service = this.providers[this.options.service.toLowerCase()] || this.providers['forecast.io']
    , service = new Service(this.options);

  service.get(location, function(err, result) {
    if(err) return callback(err);

    if(self.options.cache) {
      self.cache[key] = result;
      self.cache[key].expires = new Date().getTime() + self.options.ttl.asMilliseconds();
    }

    return callback(null, result);
  });
};
