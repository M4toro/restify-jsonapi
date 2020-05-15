/* eslint-disable no-undef */
const JSONAPIFormatter = require('../../src/JSONAPIFormatter');

test('formatError() works', () => {
  const err = {
    statusCode: 'someCode',
    name: 'someName',
    message: 'someMessage',
  }
  expect(JSONAPIFormatter.formatError(err)).toEqual({
    status: 'someCode',
    code: 'someName',
    title: 'someMessage',
  });
});

test('formatJSONAPI() works', () => {
  const err = new Error();
  err.statusCode = 'someCode';
  err.name = 'someName';
  err.message = 'someMessage';
  const errors = {
    errors: [
      err,
    ],
  };
  const resultError = JSON.stringify({
    errors: [
      {
        status: 'someCode',
        code: 'someName',
        title: 'someMessage',
      }
    ]
  });

  expect(JSONAPIFormatter.formatJSONAPI(null, null, err)).toEqual(resultError);
  expect(JSONAPIFormatter.formatJSONAPI(null, null, errors)).toEqual(resultError);
  expect(JSONAPIFormatter.formatJSONAPI(null, null, 'data')).toEqual('"data"');
});
