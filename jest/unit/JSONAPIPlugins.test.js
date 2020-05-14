/* eslint-disable no-undef */
const JSONAPIPlugins = require('../../src/JSONAPIPlugins');

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
  const plugin = new JSONAPIPlugins();

  expect(plugin.validateContentTypeHeader('application/vnd.api+json'))
    .toBeTruthy();

  expect(plugin.validateContentTypeHeader('application/vnd.api+json;q=0.9'))
    .toBeFalsy();
});

test('validateAcceptHeader() works', () => {
  const plugin = new JSONAPIPlugins();

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
