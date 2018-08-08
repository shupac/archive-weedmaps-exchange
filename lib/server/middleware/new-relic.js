const logger = require('../../common/logger');
// This file is ignored from jest testing, because the
// newrelic pack throws errors while being mocked
const newrelic = process.env.NEW_RELIC_LICENSE_KEY
  ? require('newrelic')
  : false;

module.exports = function NewRelic(req, res, next) {
  if (newrelic) {
    logger.debug('Enabling New Relic monitoring');
    newrelic.setTransactionName(req.url.slice(1));
  }
  next();
};
