const JSONAPIPlugins = require('./JSONAPIPlugins');
const JSONAPIFormatter = require('./JSONAPIFormatter');

const plugins = new JSONAPIPlugins();

module.exports = {
  JSONAPIMediaType: plugins.JSONAPIMediaType,
  plugins: {
    JSONAPIRequest: () => plugins.validateRequest.bind(plugins),
    JSONAPIResponse: () => plugins.JSONAPIResponse.bind(plugins),
  },
  formatJSONAPI: () => JSONAPIFormatter.formatJSONAPI,
};
