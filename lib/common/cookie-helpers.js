import jsHttpCookie from 'cookie';

export default function getCookies(req = {}) {
  let jsonCookies = {};
  if (req && req.headers) {
    const { cookie } = req.headers;
    if (typeof cookie === 'string') {
      jsonCookies = jsHttpCookie.parse(cookie);
    }
  }
  return jsonCookies;
}
