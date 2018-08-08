const cookieHelper = require('../../common/cookie-helper');
const logger = require('../../common/logger');

module.exports = function Auth(req, res, next) {
  if (!req.url.includes('on-demand-entries-ping')) {
    req.isAuthenticated = cookieHelper.isAuthenticated(req.headers.cookie);
    logger.debug('Is authenticated:', req.isAuthenticated, req.url);
  }
  next();
};
