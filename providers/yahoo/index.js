/**
 * Yahoo! Provider for Forecast
 */

var request = require('request')
  , xml2js  = require('xml2js');

/**
 * Yahoo Constructor
 * @param  {Object} options Options
 */
var Yahoo = module.exports = function(options) {
  this.options = options || {};
  return this;
};

/**
 * Parse XML and callback with JSON
 * @param  {String}   xml      XML
 * @param  {Function} callback Callback, signature: callback(err, json)
 */
Yahoo.prototype.parseXML = function(xml, callback) {
  var parser = new xml2js.Parser();
  return parser.parseString(xml, function (err, result) {
    return err ? callback(err) : callback(null, result);
  });
};

/**
 * Look up a longitude / Latitude pair and call back with the results
 * @param  {Array}   location  Array of latitude and longitude pair
 * @param  {Function} callback Callback, signature: callback(err, json)
 */
Yahoo.prototype.geoLookup = function(location, callback) {
  var query = {
        location: location.toString()
      , locale: 'en_AU'
      , count: 1
      , flags: 'J'
      , gflags: 'R'
      , format: 'json'
    }
    , api = 'http://where.yahooapis.com/geocode';

  return request({url: api, qs: query, json: true}, function(err, res, body) {
    return err ? callback(err) : callback(null, body);
  });
};

/**
 * Return the current weather conditions
 * @param  {Array}   location Array of latitude and longitude pair
 * @param  {Function} callback Callback, signature: callback(err, weather)
 */
Yahoo.prototype.get = function(location, callback) {
  var self = this;

  // Get woeid ('Where On Earth ID')
  this.geoLookup(location, function(err, result) {
    if(err) return callback(err);

    var query = {
        w: result.ResultSet.Results[0].woeid
      , u: self.options.units.charAt(0).toLowerCase() === 'f' ? 'f' : 'c'
      }
    , api = 'http://weather.yahooapis.com/forecastrss';

    return request({url: api, qs: query}, function(err, res, body) {
      if(err) return callback(err);

      self.parseXML(body, function(err, json) {
        if(err) return callback(err);

        var channel = json.rss.channel[0]
          , item = channel.item[0]
          , weather;

        // Simple mode: Only four possible outcomes: rain, hot, overcast, cloudy.
        // Maybe a little too simple, though!
        var conditions = {
            '00': 'rain'
          , '01': 'rain'
          , '02': 'rain'
          , '03': 'rain'
          , '04': 'rain'
          , '05': 'rain'
          , '06': 'rain'
          , '07': 'rain'
          , '08': 'rain'
          , '09': 'rain'
          , '10': 'rain'
          , '11': 'rain'
          , '12': 'rain'
          , '13': 'rain'
          , '14': 'rain'
          , '15': 'rain'
          , '16': 'rain'
          , '17': 'rain'
          , '18': 'rain'
          , '19': 'overcast'
          , '20': 'overcast'
          , '21': 'overcast'
          , '22': 'overcast'
          , '23': 'overcast'
          , '24': 'overcast'
          , '25': 'overcast'
          , '26': 'cloudy'
          , '27': 'cloudy'
          , '28': 'cloudy'
          , '29': 'cloudy'
          , '30': 'cloudy'
          , '31': 'hot'
          , '32': 'hot'
          , '33': 'hot'
          , '34': 'hot'
          , '35': 'rain'
          , '36': 'hot'
          , '37': 'rain'
          , '38': 'rain'
          , '39': 'rain'
          , '40': 'rain'
          , '41': 'rain'
          , '42': 'rain'
          , '43': 'rain'
          , '44': 'rain'
          , '45': 'rain'
          , '46': 'rain'
          , '47': 'rain'
          , '3200': 'rain'
        };

        try {
          weather = {
              title: item.title[0]
            , provider: 'yahoo'
            , simple: conditions[item['yweather:condition'][0].$.code]
            , units: channel['yweather:units'][0].$
            , location: {
                  city: channel['yweather:location'][0].$.city
                , region: channel['yweather:location'][0].$.region
                , country: channel['yweather:location'][0].$.country
                , lat: item['geo:lat'][0]
                , lon: item['geo:long'][0]
              }
            , conditions: {
                  date: item['yweather:condition'][0].$.date
                , day: item['yweather:forecast'][0].$.day
                , code: item['yweather:condition'][0].$.code
                , text: item['yweather:condition'][0].$.text
                , temperature: item['yweather:condition'][0].$.temp
                , low: item['yweather:forecast'][0].$.low
                , high: item['yweather:forecast'][0].$.high
                , wind: channel['yweather:wind'][0].$
                , atmosphere: channel['yweather:atmosphere'][0].$
                , astronomy: channel['yweather:astronomy'][0].$
              }
          };
          return callback(null, weather);

        } catch(e) {
          return callback(new Error(item.title || 'Could not retrieve weather conditions.'));
        }
      });
    });
  });
};
