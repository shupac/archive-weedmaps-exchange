const get = require('lodash.get');

module.exports = req => {
  let ip = get(req, 'headers.x-forwarded-for') || req.ip || '';

  // get left most if multiple, or use original
  const splitProxyIps = ip.split(',');
  ip = splitProxyIps[0] || ip;

  // convert to IPv4 for geolocation API
  ip = ip.replace('::ffff:', '');

  return ip;
};
