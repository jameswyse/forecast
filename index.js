/**
 * Forecast - Weather Info for Node.js
 * By James Wyse <james@jameswyse.net>
 *
 * https://github.com/jameswyse/forecast/
 */

var defaults  = require('lodash-node/modern/objects/defaults');
var crypto    = require('crypto');
var moment    = require('moment');
var providers = require('./providers');


/**
 * Forecast Constructor
 * @param {Object} options Options
 */
var Forecast = module.exports = function(options) {
  this.options   = options || {};
  this.providers = providers;
  this.cache     = {};

  defaults(this.options, {
    service: 'forecast.io',
    units:   'celcius',
    cache:   true,
    ttl:     { minutes: 30 }
  });

  if(this.options.key === 'your-api-key') {
    this.options.key = null;
  }

  this.options.ttl = moment.duration(this.options.ttl);
};


/**
 * Expired - Checks if the given `key` has expired.
 * @param  {String} key Cache key
 * @return {Boolean}    `true` if expired, `false` otherwise.
 */
Forecast.prototype.expired = function(key) {

  if(this.cache[key] === undefined) return true;

  var isOld = this.cache[key].expires < (new Date().getTime());
  if(isOld) delete this.cache[key];

  return isOld;
};


/**
 * Get the current weather conditions
 * @param  {Array}    location     Accepts a latitude and longitude pair as an `Array`
 * @param  {Boolean}  ignoreCache  If true then the cache will be ignored
 * @param  {Function} callback     Callback, signature: callback(err, result)
 */
Forecast.prototype.get = function(location, ignoreCache, callback) {
  var self = this;
  var key  = crypto.createHash('md5')
    .update(this.options + location)
    .digest('hex');

  if(typeof ignoreCache === 'function') {
    callback = ignoreCache;
    ignoreCache = false;
  }

  if(typeof ignoreCache !== 'boolean') ignoreCache = false;

  if(!ignoreCache && this.options.cache && this.cache[key] && !this.expired(key)) {
    console.log('cached!');
    return callback(null, this.cache[key]);
  }

  var Service = this.providers[this.options.service.toLowerCase()];
  var service = new Service(this.options);

  service.get(location, function(err, result) {
    if(err) return callback(err);

    if(self.options.cache) {
      self.cache[key] = result;
      self.cache[key].expires = new Date().getTime() + self.options.ttl.asMilliseconds();
    }

    return callback(null, result);
  });
};
