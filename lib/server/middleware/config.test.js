import configMiddleware from './config'; // eslint-disable-line import/first

describe('config middleware', () => {
  let config;
  beforeEach(() => {
    config = require('../../../config');
  });

  it('will return the config as a JS file', () => {
    const req = { headers: { cookie: '' } };
    const res = {
      type: jest.fn(),
      send: jest.fn(),
    };
    configMiddleware(req, res);
    expect(res.type).toHaveBeenCalledWith('application/javascript');
  });

  it('will match the app config', () => {
    const req = { headers: { cookie: '' } };
    const res = {
      type: jest.fn(),
      send: jest.fn(),
    };
    configMiddleware(req, res);
    expect(res.send).toHaveBeenCalledWith(
      `window.config = ${JSON.stringify(config)};`,
    );
  });
});
