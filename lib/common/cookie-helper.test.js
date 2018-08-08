jest.mock('jwt-decode');

describe('cookie-helper', () => {
  let cookieHelper;
  const AUTH_TOKEN =
    '35ea90e6241bc7f6e41baf3c1383dea2206d3b3913ceb2714aaf3820a19f75d1';
  const COOKIE = `mwm.userAccessToken=%7B%22access_token%22:%22${AUTH_TOKEN}%22,%22refresh_token%22:%22a_refresh_token%22,%22expires_in%22:1209600,%22expiration_date%22:%222100-05-16T22:48:22Z%22%7D`;

  beforeEach(() => {
    cookieHelper = require('./cookie-helper');
  });

  describe('cookie-helper', () => {
    it('should exist', () => {
      expect(cookieHelper).toBeDefined();
    });

    it('should get isAuthenticated', () => {
      expect(cookieHelper.isAuthenticated(COOKIE)).toBe(true);
    });

    it('should get token', () => {
      expect(cookieHelper.getToken(COOKIE)).toBe(AUTH_TOKEN);
    });

    it('should get the refresh token', () => {
      expect(cookieHelper.getRefreshToken(COOKIE)).toBe('a_refresh_token');
    });

    it('should get isAuthenticated', () => {
      expect(cookieHelper.isAuthenticated(COOKIE)).toBe(true);
    });
  });
});
