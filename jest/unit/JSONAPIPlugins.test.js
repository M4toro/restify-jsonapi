/* eslint-disable no-undef */
const JSONAPIPlugins = require('../../src/JSONAPIPlugins');

const plugin = new JSONAPIPlugins();
const Next = function () {
  this.result = false;
  this.next = function () {
    this.result = true;
  };
};
const CodeResponse = function () {
  this.result = null;
  this.sended = false;
  this.status = function (status) {
    this.result = status;
  };
  this.send = function () {
    this.sended = true;
  };
};

test('parseAccetpHeader() works', () => {
  const accept = 'text/html ,  application/xhtml+xml ,application/xml;q=0.9,image/webp, */*;q=0.8';
  const result = [
    'text/html',
    'application/xhtml+xml',
    'application/xml;q=0.9',
    'image/webp',
    '*/*;q=0.8',
  ];

  expect(JSONAPIPlugins.parseAcceptHeader(accept)).toEqual(result);
});

test('parseMediaType() works', () => {
  const type = 'application/xml;q=0.9;param=value';
  const result = {
    type: 'application/xml',
    params: [
      'q=0.9',
      'param=value',
    ],
  };

  expect(JSONAPIPlugins.parseMediaType(type)).toEqual(result);
});

test('validateContentTypeHeader() works', () => {
  expect(plugin.validateContentTypeHeader('application/vnd.api+json'))
    .toBeTruthy();

  expect(plugin.validateContentTypeHeader('application/vnd.api+json;q=0.9'))
    .toBeFalsy();
});

test('validateAcceptHeader() works', () => {
  expect(plugin.validateAcceptHeader('application/vnd.api+json'))
    .toBeTruthy();
  expect(plugin.validateAcceptHeader('application/vnd.api+json, text/html;q=0.9'))
    .toBeTruthy();
  expect(plugin.validateAcceptHeader('application/vnd.api+json, application/vnd.api+json;q=0.9, text/html;q=0.9'))
    .toBeTruthy();

  expect(plugin.validateAcceptHeader('application/vnd.api+json;q=0.9'))
    .toBeFalsy();
  expect(plugin.validateAcceptHeader('application/vnd.api+json;q=0.9, text/html;q=0.9'))
    .toBeFalsy();
});

test('JSONAPIResponse() works', () => {
  const type = 'application/vnd.api+json';
  const res = {
    result: {},
    header: function (header, value) {
      this.result[header] = value;
    },
  }
  const next = new Next();

  plugin.JSONAPIResponse(null, res, next.next.bind(next));
  expect(res.result['Content-Type']).toBe(type);
  expect(next.result).toBeTruthy();
});

test('JSONAPIRequest() works, 415 code sended, next was not called', () => {
  const res = new CodeResponse();
  const next = new Next();
  const req = {
    header: () => 'application/vnd.api+json;q=0.9'
  };

  plugin.JSONAPIRequest(req, res, next.next.bind(next));
  expect(res.result).toBe(415);
  expect(res.sended).toBeTruthy();
  expect(next.result).toBeFalsy();
});

test('JSONAPIRequest() works, 406 code sended, next was not called', () => {
  const res = new CodeResponse();
  const next = new Next();
  const req = {
    header: (header) => {
      if (header === 'Accept') return 'application/vnd.api+json;q=0.9'
    }
  };

  plugin.JSONAPIRequest(req, res, next.next.bind(next));
  expect(res.result).toBe(406);
  expect(res.sended).toBeTruthy();
  expect(next.result).toBeFalsy();
});

test('JSONAPIRequest() works, next was called', () => {
  const next = new Next();
  const req = {
    header: () => false
  };

  plugin.JSONAPIRequest(req, null, next.next.bind(next));
  expect(next.result).toBeTruthy();
});
