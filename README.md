# restify-jsonapi
Package comprise JSON:API plugins and formatter for the restify server.

## Plugins

### JSONAPIRequest
The plugin sends response with '415 Unsupported Media Type' status code if the request specifies the header Content-Type: application/vnd.api+json with any media type parameters, or sends response '406 Not Acceptable' status code if a request’s Accept header contains the JSON:API media type and all instances of that media type are modified with media type parameters, otherwise calls the next().
```javascript
const restify = require('restify');
const JSONAPIRequest = require('restify-jsonapi').JSONAPIRequest;

const server = restify.createServer();
server.pre(JSONAPIRequest);
```

### JSONAPIResponse
The plugin attachs 'application/vnd.api+json' header to every response.
```javascript
const restify = require('restify');
const JSONAPIResponse = require('restify-jsonapi').JSONAPIResponse;

const server = restify.createServer();
server.pre(JSONAPIResponse);
```
## Formatter
The formatter converts given data to a JSON string. If the data is an instance of the Error , converts it to appropriate 'application/vnd.api+json'. Result will be like that
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