var providers = {
  'darksky': require('./darksky')
};

var aliases = {
  'darksky.net': 'darksky',
  'forecast.io': 'darksky'
};

module.exports = function getProvider (name) {
  return providers[name] || providers[aliases[name]];
}
