const config = require('./app');
const logger = require('../lib/common/logger');

if (
  !(typeof window !== 'undefined' && window.document) ||
  process.env.NODE_ENV === 'test'
) {
  // on the server
  let configEnv = process.env.DEPLOY_ENVIRONMENT || 'development';

  if (process.env.NODE_ENV === 'test') {
    // we are running tests, so use the test config
    configEnv = 'test';
  }

  const builtConfig = Object.assign({}, config.defaults, config[configEnv]);
  logger.info(`Admin loaded with ${configEnv} config settings`);
  module.exports = builtConfig;
} else {
  module.exports = window.config; // use the runtime config
}
