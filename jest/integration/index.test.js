/* eslint-disable no-undef */
const restifyJSONAPI = require('../../index');

test('restifyJSONAPI includes JSONAPIMediaType field', () => {
  expect(restifyJSONAPI.JSONAPIMediaType).toBe('application/vnd.api+json');
});

test('restifyJSONAPI includes plugins and formatter', () => {
  expect(typeof restifyJSONAPI.plugins.JSONAPIRequest).toBe('function');
  expect(typeof restifyJSONAPI.plugins.JSONAPIResponse).toBe('function');
  expect(typeof restifyJSONAPI.formatJSONAPI).toBe('function');
});