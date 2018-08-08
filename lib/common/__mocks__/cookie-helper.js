class CookieHelper {
  cookie = {};

  setMockCookie(mockCookieObj) {
    this.cookie = mockCookieObj;
  }

  clear() {
    this.cookie = {};
  }

  setCookie(key, value) {
    this.cookie[key] = value;
  }

  getCookie(key) {
    return this.cookie[key];
  }
}

export default new CookieHelper();
