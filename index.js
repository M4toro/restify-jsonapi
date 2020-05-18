const JSONAPIPlugins = require('./lib/JSONAPIPlugins');
const JSONAPIFormatter = require('./lib/JSONAPIFormatter');

const plugins = new JSONAPIPlugins();

module.exports = {
  JSONAPIMediaType: plugins.JSONAPIMediaType,
  plugins: {
    JSONAPIRequest: plugins.JSONAPIRequest.bind(plugins),
    JSONAPIResponse: plugins.JSONAPIResponse.bind(plugins),
  },
  formatJSONAPI: JSONAPIFormatter.formatJSONAPI,
};
