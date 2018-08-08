const cookie = require('cookie');
const jsCookie = require('js-cookie');
const config = require('../../config');

const KEY = 'mwm.userAccessToken';

module.exports = class CookieHelper {
  static isAuthenticated(cookieString) {
    return !!CookieHelper.getToken(cookieString);
  }

  static getToken(cookieString) {
    const cookies = cookie.parse(cookieString || '');
    return cookies[KEY] ? JSON.parse(cookies[KEY]).access_token : false;
  }

  static getRefreshToken(cookieString) {
    const cookies = cookie.parse(cookieString || '');
    return cookies[KEY] ? JSON.parse(cookies[KEY]).refresh_token : false;
  }

  static setAuthCookie(payload, res) {
    const maxAge = 60 * 60 * 24 * 10; // 10 days
    const expires = new Date(Date.now() + maxAge * 1000);
    const cookieOptions = {
      expires,
      domain: config.cookieDomain,
      path: '/',
      secure: config.envName !== 'development',
    };
    if (res) {
      return res.setHeader(
        'Set-Cookie',
        cookie.serialize(KEY, JSON.stringify(payload), cookieOptions),
      );
    }
    return jsCookie.set(KEY, payload, cookieOptions);
  }

  static clearAuthCookie(res) {
    const cookieOptions = {
      domain: config.cookieDomain,
      path: '/',
      secure: config.envName !== 'development',
    };
    if (res) {
      return res.clearCookie(KEY, cookieOptions);
    }
    return jsCookie.remove(KEY, cookieOptions);
  }
};
