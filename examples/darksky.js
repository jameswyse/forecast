//
// Darksky / Forecast.io example
//

// Require the forecast module
var Forecast = require('../');

// Initialize with custom settings
var forecast = new Forecast({
  service: 'darksky.net',
  key: 'your-api-key',
  units: 'celcius',
  cache: true,
  ttl: {
    minutes: 5
  }
});

// Retrieve weather information using coordinates (Sydney, Australia)
forecast.get([-33.8683, 151.2086], function (err, result) {
  if (err) {
    return console.dir(err);
  }

  console.log('Latitude: %s', result.latitude);
  console.log('Longitude: %s', result.longitude);
  console.log('Timezone: %s', result.timezone);
  console.log();
  console.log('Current Weather Conditions:');
  console.log();
  console.log(
    ' %s, %s°C, %s% humidity',
    result.currently.summary,
    Math.round(parseFloat(result.currently.temperature, 10)),
    result.currently.humidity * 100
  );
});
