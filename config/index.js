import config from './app';

let exportConfig;

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
  exportConfig = builtConfig;
} else {
  exportConfig = window.config; // use the runtime config
}

export default exportConfig;
