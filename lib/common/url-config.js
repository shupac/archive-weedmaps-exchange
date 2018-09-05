const config = require('../../config');

const isServerDefault = () =>
  !(typeof window !== 'undefined' && window.document);

const urlConfigFactory = ({ isServer }) => {
  const apiGatewayHost =
    isServer() && config.internalApiGatewayHost
      ? config.internalApiGatewayHost
      : config.apiGatewayHost;

  const apiGatewayRoot = `${apiGatewayHost}/wm`;

  return {
    apiGatewayHost,
    apiV1Url: (config.apiV2BaseUrl || apiGatewayRoot) + config.coreApiPath,
    apiV2Url: (config.apiV2BaseUrl || apiGatewayRoot) + config.apiV2Path,
    siteUrl: config.coreBaseUrl,
    weedmapsOauthUrl: config.coreBaseUrl + config.weedmapsOauthPath,
    apiUrl: (config.coreApiBaseUrl || apiGatewayRoot) + config.apiPath,
    coreApiUrl: (config.coreApiBaseUrl || apiGatewayRoot) + config.coreApiPath,
    contentPolicyReportUri: `${apiGatewayHost}/policy/reports`,
  };
};

const defaultUrlConfig = urlConfigFactory({ isServer: isServerDefault });

defaultUrlConfig.urlConfigFactory = urlConfigFactory;

module.exports = defaultUrlConfig;
