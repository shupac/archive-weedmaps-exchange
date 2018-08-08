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
    apiUrl: (config.coreApiBaseUrl || apiGatewayRoot) + config.apiPath,
    coreApiUrl: (config.coreApiBaseUrl || apiGatewayRoot) + config.coreApiPath,
    weedmapsOauthUrl: config.coreBaseUrl + config.weedmapsOauthPath,
    platformUrl: `${apiGatewayHost}/platform/gql`,
    taxesUrl: `${apiGatewayHost}/taxes/v1`,
    featureFlagApiUrl: `${apiGatewayHost}/feature-flag/v1`,
    featureFlagUrl: config.featureFlagUrl,
    logisticsChannelUrl: config.logisticsChannelUrl,
    contentPolicyReportUri: `${apiGatewayHost}/policy/reports`,
    oauthLogin: `${apiGatewayHost}/auth/token`,
  };
};

const defaultUrlConfig = urlConfigFactory({ isServer: isServerDefault });

defaultUrlConfig.urlConfigFactory = urlConfigFactory;

module.exports = defaultUrlConfig;
