# restify-jsonapi
Package comprise JSON:API plugins and formatter for the restify server.

## Plugins

### JSONAPIRequest
The plugin sends response with '415 Unsupported Media Type' status code if the request specifies the header Content-Type: application/vnd.api+json with any media type parameters, or sends response '406 Not Acceptable' status code if a request’s Accept header contains the JSON:API media type and all instances of that media type are modified with media type parameters, otherwise calls the next().

```javascript
const restify = require('restify');
const JSONAPIRequest = require('restify-jsonapi').plugins.JSONAPIRequest;

const server = restify.createServer();
server.pre(JSONAPIRequest);
```

### JSONAPIResponse
The plugin attaches 'application/vnd.api+json' header to every response.

```javascript
const restify = require('restify');
const JSONAPIResponse = require('restify-jsonapi').plugins.JSONAPIResponse;

const server = restify.createServer();
server.pre(JSONAPIResponse);
```
## Formatter
The formatter converts given data to a JSON string.

```javascript
const restify = require('restify');
const restifyJSONAPI = require('restify-jsonapi');

const formatJSONAPI = restifyJSONAPI.formatJSONAPI;
const mediaType = restifyJSONAPI.JSONAPIMediaType;

const server = restify.createServer({
  formatters: {
    mediaType: formatJSONAPI
  }
});
server.pre(JSONAPIResponse);
```

If the data is an instance of the Error, the formatter converts it to appropriate 'application/vnd.api+json' string. Result will be like that

```javascript
{
  errors: [
    {
      status: data.statusCode,
      code: data.name,
      title: data.message,
    },
  ],
}
```

If the data includes 'errors' field, every element of the 'errors' will be converted into the object like above, and the data will be converted into JSON string. Otherwise the data will be converted into JSON string.
