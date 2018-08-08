// @flow
import mock from 'lib/jest/typed-mock';
import AxiosWrapper from './axios';

jest.mock('axios', () => ({
  create: () => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    request: jest.fn(),
    delete: jest.fn(),
    get: jest.fn(),
    head: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
  }),
  defaults: { headers: {} },
}));

describe('The Axios Wrapper', () => {
  describe('when creating an instance', () => {
    it('stores the request', () => {
      const req = {
        headers: { cookies: 'some cookies here' },
      };
      const axios = new AxiosWrapper(mock(req));
      expect(axios.req).toBe(req);
    });
  });

  describe('request interceptor', () => {
    describe('with user auth config', () => {
      let axios;
      let getToken;
      beforeEach(() => {
        axios = new AxiosWrapper();
        getToken = jest.spyOn(axios, 'getToken');
      });

      it('adds headers to the config with a token', async () => {
        getToken.mockReturnValue('a token');
        expect(await axios.requestSuccessInterceptor({})).toEqual({
          headers: { Authorization: 'Bearer a token' },
        });
      });
    });
  });

  describe('response error interceptor', () => {
    let axios;
    beforeEach(() => {
      axios = new AxiosWrapper();
    });

    it('passes through errors from already retried requests', async () => {
      const error = {
        response: {
          status: 401,
          config: {
            url: 'https://weedmaps.com/oauth/token',
          },
        },
      };
      const response = axios.responseErrorInterceptor(mock(error));
      await expect(response).rejects.toEqual(
        new Error('Unable to authenticate 401'),
      );
    });
  });

  describe('getting the cookie string', () => {
    let axios;
    describe('on the server', () => {
      beforeEach(() => {
        axios = new AxiosWrapper(
          mock({
            headers: { cookie: 'some header cookies' },
          }),
        );
      });

      it('gets the cookie string from the request headers', () => {
        const cookieString = axios.getCookieString();
        expect(cookieString).toBe('some header cookies');
      });
    });

    describe('on the client', () => {
      beforeEach(() => {
        global.document.cookie = 'some client cookies';
        axios = new AxiosWrapper();
      });

      afterEach(() => {
        global.document.cookie = '';
      });

      it('gets the cookie string from the document', () => {
        const cookieString = axios.getCookieString();
        expect(cookieString).toBe('some client cookies');
      });
    });
  });

  describe('getting a fresh access token', () => {
    it('makes the correct request', async () => {
      const axios = new AxiosWrapper();
      jest.spyOn(axios, 'getRefreshToken').mockReturnValue('a refresh token');
      jest
        .spyOn(axios, 'post')
        .mockReturnValue(
          Promise.resolve({ data: { access_token: 'a new token' } }),
        );
      await expect(axios.refreshToken()).resolves.toEqual({
        access_token: 'a new token',
      });
      expect(axios.post).toHaveBeenCalledWith(
        'https://weedmaps.com/oauth/token',
        {
          grant_type: 'refresh_token',
          refresh_token: 'a refresh token',
        },
      );
    });
  });

  describe('updating the token cookie', () => {
    describe('on the server', () => {
      beforeEach(() => {
        jest.spyOn(Date, 'now').mockReturnValue(0);
      });

      afterEach(() => {
        Date.now.mockRestore();
      });

      it('sets the Set-Cookie header', () => {
        const axios = new AxiosWrapper(null, mock({ setHeader: jest.fn() }));
        axios.updateTokenCookie({
          access_token: 'a new access token',
          refresh_token: 'a new refresh token',
        });
        expect(axios.res && axios.res.setHeader).toHaveBeenCalledWith(
          'Set-Cookie',
          'mwm.userAccessToken=%7B%22access_token%22%3A%22a%20new%20access%20token%22%2C%22refresh_token%22%3A%22a%20new%20refresh%20token%22%7D; Domain=.weedmaps.com; Path=/; Expires=Sun, 11 Jan 1970 00:00:00 GMT; Secure',
        );
      });
    });
  });

  describe('client proxy methods', () => {
    it('calls the underlying client', () => {
      const axios = new AxiosWrapper();
      const url = 'some url';
      const config = {};
      const data = { foo: 'bar' };
      axios.request(config);
      expect(axios.client.request).toHaveBeenCalledWith(config);
      ['delete', 'get', 'head'].forEach(method => {
        mock(axios)[method](url, config);
        expect(mock(axios.client)[method]).toHaveBeenCalledWith(url, config);
      });
      ['post', 'put', 'patch'].forEach(method => {
        mock(axios)[method](url, data, config);
        expect(mock(axios.client)[method]).toHaveBeenCalledWith(
          url,
          data,
          config,
        );
      });
    });
  });
});
