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
    uatCookie: '_wm_uat_test',
  },
  development: {
    envName: 'development',
    apiGatewayUrl:
      process.env.API_GATEWAY_URL ||
      'https://api-g-acceptance.internal-weedmaps.com',
    siteUrl: 'http://localhost:1620',
    coreBaseUrl: 'https://acceptance.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: 'localhost',
    uatCookie: '_wm_uat_acceptance',
  },
  acceptance: {
    envName: 'acceptance',
    apiGatewayUrl: 'https://api-g-acceptance.internal-weedmaps.com',
    siteUrl: 'https://exchange-acceptance.internal-weedmaps.com',
    coreBaseUrl: 'https://acceptance.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: '.internal-weedmaps.com',
    uatCookie: '_wm_uat_acceptance',
  },
  staging: {
    envName: 'staging',
    apiGatewayUrl: 'https://api-g-staging.internal-weedmaps.com',
    siteUrl: 'https://exchange-staging.internal-weedmaps.com',
    coreBaseUrl: 'https://staging.internal-weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: '.internal-weedmaps.com',
    uatCookie: '_wm_uat_staging',
  },
  production: {
    envName: 'production',
    apiGatewayUrl: 'https://api-g.weedmaps.com',
    siteUrl: 'https://exchange.weedmaps.com',
    coreBaseUrl: 'https://weedmaps.com',
    apiRootPath: '/exchange/v1',
    cookieDomain: '.weedmaps.com',
    uatCookie: '_wm_uat',
  },
};
