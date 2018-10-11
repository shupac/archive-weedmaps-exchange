// @flow
import type { $Request, $Response, NextFunction } from 'express';

jest.mock('../../routes');
jest.mock('newrelic', () => ({
  setTransactionName: jest.fn(),
}));

describe('newrelic middleware', () => {
  let routes;
  let newRelic;
  let handler;
  beforeEach(() => {
    process.env.NEW_RELIC_LICENSE_KEY = '123';
    routes = require('../../routes');
    newRelic = require('newrelic');
    handler = require('./new-relic');
  });
  afterEach(() => {
    delete process.env.NEW_RELIC_LICENSE_KEY;
  });

  describe('with the index page', () => {
    beforeEach(() => {
      routes.match.mockReturnValueOnce({
        route: { name: 'index', pattern: '/' },
        params: {},
      });
    });

    it('will set the transactionName to match', () => {
      const req = { url: '/' };
      const res = {};
      const next = jest.fn();
      handler(
        ((req: any): $Request),
        ((res: any): $Response),
        ((next: any): NextFunction),
      );
      expect(newRelic.setTransactionName).toHaveBeenCalledWith('');
    });
  });

  describe('with a user defined route', () => {
    beforeEach(() => {
      routes.match.mockReturnValueOnce({
        route: { name: 'mock', pattern: '/mock/:id' },
        params: {},
      });
    });

    it('will set the transactionName to match', () => {
      const req = { url: '/test' };
      const res = {};
      const next = jest.fn();
      handler(
        ((req: any): $Request),
        ((res: any): $Response),
        ((next: any): NextFunction),
      );
      expect(newRelic.setTransactionName).toHaveBeenCalledWith('test');
    });

    it('will call the next middleware', () => {
      const req = { url: '/test' };
      const res = {};
      const next = jest.fn();
      handler(
        ((req: any): $Request),
        ((res: any): $Response),
        ((next: any): NextFunction),
      );
      expect(next).toHaveBeenCalled();
    });
  });

  describe('with an unknown route', () => {
    beforeEach(() => {
      routes.match.mockReturnValueOnce({});
    });
    it('will call the next middleware', () => {
      const req = { url: '/test' };
      const res = {};
      const next = jest.fn();
      handler(
        ((req: any): $Request),
        ((res: any): $Response),
        ((next: any): NextFunction),
      );
      expect(next).toHaveBeenCalled();
      expect(newRelic.setTransactionName).not.toHaveBeenCalledWith();
    });
  });
});
