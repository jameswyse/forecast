[![npm](http://img.shields.io/npm/v/forecast.svg?style=flat-square)](http://npmjs.org/package/forecast) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://jameswyse.mit-license.org) [![npm](http://img.shields.io/david/jameswyse/forecast.svg?style=flat-square)](http://npmjs.org/package/forecast) [![npm](http://img.shields.io/david/dev/jameswyse/forecast.svg?style=flat-square)](http://npmjs.org/package/forecast)
Forecast - Weather information for Node.js
=================================================

The aim of this module is to provide a common API for multiple weather providers and to return the results as a normalised Object.

Currently the only provider available is [darksky.net (forecast.io)](http://darksky.net)

## Install

[![NPM](https://nodei.co/npm/forecast.png)](https://nodei.co/npm/forecast/)

```bash
$ npm install --save forecast
```

## Usage
To use the darksky.net API you will need an API key which is available from https://darksky.net/dev/


```javascript
// Require the module
var Forecast = require('forecast');

// Initialize
var forecast = new Forecast({
  service: 'darksky',
  key: 'your-api-key',
  units: 'celcius',
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
  }
});

// Retrieve weather information from coordinates (Sydney, Australia)
forecast.get([-33.8683, 151.2086], function(err, weather) {
  if(err) return console.dir(err);
  console.dir(weather);
});

// Retrieve weather information, ignoring the cache
forecast.get([-33.8683, 151.2086], true, function(err, weather) {
  if(err) return console.dir(err);
  console.dir(weather);
});
```


## Example Output
```javascript
{
  latitude: -33.8683,
  longitude: 151.2086,
  timezone: 'Australia/Sydney',
  offset: 10,
  currently: {
    time: 1367471626,
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy-day', // For Skycons[https://github.com/darkskyapp/skycons]
    precipIntensity: 0.088,
    precipProbability: 0.07,
    precipType: 'rain',
    temperature: 20.4,
    dewPoint: 12.24,
    windSpeed: 5.83,
    windBearing: 178,
    cloudCover: 0.32,
    humidity: 0.65,
    pressure: 1024.35,
    ozone: 275.6
  },
  hourly: {
    summary: 'Partly cloudy until tomorrow morning.',
    icon: 'partly-cloudy-day',
    data: [
      {
        time: 1367470800,
        summary: 'Partly Cloudy',
        icon: 'partly-cloudy-day',
        precipIntensity: 0.087,
        precipProbability: 0.07,
        precipType: 'rain',
        temperature: 20.42,
        dewPoint: 12.26,
        windSpeed: 5.89,
        windBearing: 179,
        cloudCover: 0.32,
        humidity: 0.65,
        pressure: 1024.31,
        ozone: 275.72
      },
      {
        // additional hours suppressed
      }
    ]
  },
  daily: {
    summary: 'Sprinkling today; temperatures bottoming out at 19° on Sunday.',
    icon: 'rain',
    data: [
      {
        time: 1367416800,
        summary: 'Breezy in the morning.',
        icon: 'wind',
        sunriseTime: 1367440294,
        sunsetTime: 1367478912,
        precipIntensity: 0.061,
        precipIntensityMax: 0.009,
        precipIntensityMaxTime: 1367428500,
        precipType: 'rain',
        temperatureMin: 12.66,
        temperatureMinTime: 1367438400,
        temperatureMax: 20.42,
        temperatureMaxTime: 1367470800,
        dewPoint: 12.27,
        windSpeed: 5.79,
        windBearing: 194,
        cloudCover: 0.29,
        humidity: 0.72,
        pressure: 1023.87,
        ozone: 272.63
      },
      {
        // Additional days suppressed
      }
    ]
  },
  flags: {
    sources: [ 'isd', 'fnmoc', 'naefs', 'cmc', 'gfs' ],
    'isd-stations': [
      '947670-99999',
      '947675-99999',
      '947680-99999',
      '957640-99999',
      '957660-99999'
    ],
    units: 'si'
  },
  expires: 1367473292205
}
```

## [Contributors](https://github.com/jameswyse/forecast/graphs/contributors)

## License
The MIT License (MIT)

*Copyright (c) 2016 James Wyse <james@jameswyse.net>*

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
