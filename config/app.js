module.exports = {
  defaults: {
    sha: `${process.env.SHA || 'MISSING_SHA'}`,
  },
  test: {
    envName: 'test',
    apiGatewayUrl: 'https://api-g.weedmaps.com',
  },
  development: {
    envName: 'development',
    apiGatewayUrl: 'https://api-g-acceptance.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
  },
  acceptance: {
    envName: 'acceptance',
    apiGatewayUrl: 'https://api-g-acceptance.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
  },
  staging: {
    envName: 'staging',
    apiGatewayUrl: 'https://api-g-staging.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
  },
  performance: {
    envName: 'performance',
    apiGatewayUrl: 'https://api-g-performance.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
  },
  production: {
    envName: 'production',
    apiGatewayUrl: 'https://api-g.weedmaps.com',
    apiRootPath: '/exchange/v1',
  },
};
