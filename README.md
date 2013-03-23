Forecast - Weather information for Node.js
=================================================

Work in progress..

The aim of this module is to provide a common API for multiple weather providers and to return the results as a normalized Object.

I've only implemented Yahoo! so far so the resulting object will be changing a lot as I discover what information is available from each weather provider.

##Current Features

 * Get the current weather details from a latitude/longitude pair.
 * Support for multiple weather providers. Currently only Yahoo! is supported.

##TO-DO and ideas for possible features
 * Handle API timeouts / parsing errors in a more robust way.
 * Find the creator of XML and `[omitted]`
 * Fall back to another service if an API is down or unavailable?
 * API Authentication
 * API Limits
   * Allow a maximum query limit to be set per-service
   * Keep a count of API hits for each service
   * Cycle to another service if the limit is reached?
   * If the limit is known then the cache TTL could also be calculated automatically.
 * Other ways to look up weather details
   * City Name
   * Weather Station Name / ID
   * etc
 * 3-day & 7-day forecasts
 * Weather history
 * Fancy stats, graphs, radar images, maps, etc

##Install
```bash
$ npm install forecast
```

##Usage
```javascript
var Forecast = require('forecast');

var forecast = new Forecast({
    service: 'yahoo'
  , units: 'celcius' // Only the first letter is parsed so you can type Fahrenheit, Celcius, centigrade, FahrenPoop, etc.
  , cache: true      // Cache API requests?
  , ttl: {           // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
        minutes: 27
      , seconds: 45
    }
});

forecast.get([-33.8683, 151.2086], function(err, weather) {
  if(err) console.dir(err);
  else console.dir(weather);
});
```

##Example Output
```json
{
  "title": "Conditions for Sydney, AU at 12:29 pm AEDT",
  "provider": "yahoo",
  "simple": "cloudy",
  "units": {
    "temperature": "C",
    "distance": "km",
    "pressure": "mb",
    "speed": "km/h"
  },
  "location": {
    "city": "Sydney",
    "region": "NSW",
    "country": "Australia",
    "lat": "-33.87",
    "lon": "151.21"
  },
  "conditions": {
    "date": "Sat, 23 Mar 2013 12:29 pm AEDT",
    "day": "Sat",
    "code": "30",
    "text": "Partly Cloudy",
    "temperature": "27",
    "low": "18",
    "high": "28",
    "wind": {
      "chill": "27",
      "direction": "90",
      "speed": "19.31"
    },
    "atmosphere": {
      "humidity": "61",
      "visibility": "9.99",
      "pressure": "982.05",
      "rising": "2"
    },
    "astronomy": {
      "sunrise": "6:59 am",
      "sunset": "7:02 pm"
    }
  },
  "expires": 1364004169499
}
```

##API Documentation

Sorry pal.

