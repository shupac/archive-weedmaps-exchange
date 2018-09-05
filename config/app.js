module.exports = {
  defaults: {
    sha: `${process.env.SHA || 'MISSING_SHA'}`,
  },
  test: {
    envName: 'test',
    apiGatewayUrl: 'https://api-g.weedmaps.com',
    siteUrl: 'https://exchange.weedmaps.com',
    coreBaseUrl: 'https://weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: '.weedmaps.com',
  },
  development: {
    envName: 'development',
    apiGatewayUrl:
      process.env.API_GATEWAY_URL ||
      'https://api-g-acceptance.internal-weedmaps.com',
    siteUrl: 'localhost:1620',
    apiRootPath: '/exchange/v1',
    cookieDomain: 'localhost',
  },
  acceptance: {
    envName: 'acceptance',
    apiGatewayUrl: 'https://api-g-acceptance.internal-weedmaps.com',
    siteUrl: 'https://exchange-fe-acceptance.internal-weedmaps.com',
    coreBaseUrl: 'https://acceptance.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: '.internal-weedmaps.com',
  },
  staging: {
    envName: 'staging',
    apiGatewayUrl: 'https://api-g-staging.internal-weedmaps.com',
    siteUrl: 'https://exchange-fe-staging.internal-weedmaps.com',
    coreBaseUrl: 'https://staging.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: '.internal-weedmaps.com',
  },
  performance: {
    envName: 'performance',
    apiGatewayUrl: 'https://api-g-performance.internal-weedmaps.com',
    siteUrl: 'https://exchange-fe-performance.internal-weedmaps.com',
    coreBaseUrl: 'https://performance.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: '.internal-weedmaps.com',
  },
  production: {
    envName: 'production',
    apiGatewayUrl: 'https://api-g.weedmaps.com',
    siteUrl: 'https://exchange.weedmaps.com',
    coreBaseUrl: 'https://weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: '.weedmaps.com',
  },
};
