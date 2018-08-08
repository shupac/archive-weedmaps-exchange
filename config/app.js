module.exports = {
  defaults: {
    version: '0.0.1',
    sha: `${process.env.SHA || 'MISSING_SHA'}`,
    weedmapsClientId:
      '8e8d0f4b85252ca43e9813e98b73b1daf434ccb331b08d1457cdfe1f40c31753',
    weedmapsClientSecret:
      'a8f01a5eab3159cddce7f980c5448ee5cbc0252484c29e574de469b19d9b572e',
    apiV2Path: '/v2',
    apiPath: '/web/v1',
    coreApiPath: '/v1',
    cookieDomain: '.weedmaps.com',
    weedmapsOauthPath: '/oauth/token',
    adServerHost: 'adserver.weedmaps.com',
    deliveriesUrl: 'https://deliveries-acceptance.weedmaps.com',
    featureFlagUrl:
      'https://feature-flag-admin-acceptance.internal-weedmaps.com',
    logisticsChannelUrl:
      'wss://logistics-service-acceptance.internal-weedmaps.com/socket',
    mobileApps: {
      iosAppUrl: 'https://app.adjust.com/smwzo0',
      androidAppUrl: 'https://app.adjust.com/t4he7b',
      budtrimmerUrl: 'http://budtrimmer.com',
    },
    social: {
      facebookUrl: 'https://facebook.com/pages/Weedmaps/191821183380',
      instagramUrl: 'https://www.instagram.com/weedmaps/',
      twitterUrl: 'https://twitter.com/weedmaps',
      linkedInUrl: 'https://www.linkedin.com/company/weedmaps',
      googlePlusUrl: 'https://plus.google.com/108276776904888053390',
      youtubeUrl: 'http://youtube.com/nugporn',
      weedmapsTvUrl: 'https://www.youtube.com/weedmapstv?sub_confirmation=1',
      mjUrl: 'http://marijuana.com',
      higherLearningUrl: 'http://www.marijuana.com/higher-learning',
      normlUrl: 'http://norml.org',
      siteTitle: 'Weedmaps - Marijuana Dispensaries, Deliveries and Doctors',
      siteDescription:
        'Find medical and recreational cannabis dispensaries and deliveries and marijuana doctors',
      siteName: 'Weedmaps',
      facebookAppId: '506896696023729',
      twitterSite: '@weedmaps',
    },
    static: {
      rootUrl: 'https://www.weedmaps.com',
      storeUrl: 'https://store.weedmaps.com',
    },
    botAgentList:
      'bot|google|aolbuild|baidu|bing|msn|duckduckgo|teoma|slurp|yandex',
    contentful: {
      space: 'moonshot-pages-production',
      spaceID: '115nkizcbc6r',
      contentDeliveryAccessToken:
        '9bb3c72f2782b582362caf900d2e9689c8d956fc6fe5294abac4dea92bde2745',
      contentPreviewAccessToken:
        'a953be6610d2da722c441f358f730da29821d8ff30d4b8272d84faed7b5cbb31',
      termsPageId: '10F41setNGm4EeOSSSusYo',
      privacyPageId: '53nsZgXMLm4qmAcqSiYico',
      damTermsPageId: '1ruCAwWnXWwsCUmeWaIc6A',
      aboutPageId: 'oD3JhQemNqquQ2kIsu82m',
      deliveryGuidelinesPageId: '5MCyB8zsNaU0YYUgoKGOck',
    },
    acceptedLanguages: ['en', 'es'],
    amplitudeKey: '72d5ece7d4755c20ddf43b026dcf0da8',
    googleAnalyticsId: `${process.env.GOOGLE_ANALYTICS_ID}`,
    mapboxAccessToken:
      'pk.eyJ1IjoicGl3YW5pIiwiYSI6ImNqZGx6ZmUzejBnMTAycm10YWpkcDNkZjMifQ.8Q2zwTfvsbzXDu27ARCehw',
  },
  test: {
    envName: 'test',
    apiGatewayHost: 'https://api-g.weedmaps.com',
    internalApiGatewayHost: 'https://api-g-production.weedmaps.com',
    coreBaseUrl: 'https://weedmaps.com',
    ionicBaseUrl: 'https://weedmaps.com',
    weedmapsUrl: 'https://weedmaps.com',
  },
  development: {
    envName: 'development',
    apiGatewayHost: 'https://api-g-acceptance.internal-weedmaps.com',
    coreApiBaseUrl:
      process.env.CORE_BASE_URL && `${process.env.CORE_BASE_URL}/api`,
    coreBaseUrl: process.env.CORE_BASE_URL || 'http://localhost:3000',
    ionicBaseUrl: process.env.IONIC_BASE_URL || 'http://localhost:3001',
    logisticsChannelUrl:
      'wss://logistics-service-acceptance.internal-weedmaps.com/socket',
    weedmapsUrl: 'https://acceptance.internal-weedmaps.com',
    deliveriesUrl: 'http://localhost:1620',
    cookieDomain: 'localhost',
    fflag: {
      deliveries: true,
      profile: true,
      order_history: true,
    },
  },
  develop: {
    envName: 'develop',
    apiGatewayHost: 'https://api-g-develop.internal-weedmaps.com',
    coreBaseUrl: 'https://develop.internal-weedmaps.com',
    ionicBaseUrl: 'https://develop.internal-weedmaps.com',
    cookieDomain: '.internal-weedmaps.com',
  },
  acceptance: {
    envName: 'acceptance',
    apiGatewayHost: 'https://api-g-acceptance.internal-weedmaps.com',
    coreBaseUrl: 'https://acceptance.internal-weedmaps.com',
    ionicBaseUrl: 'https://acceptance.internal-weedmaps.com',
    deliveriesUrl: 'https://deliveries-acceptance.internal-weedmaps.com',
    weedmapsUrl: 'https://acceptance.internal-weedmaps.com',
    cookieDomain: '.internal-weedmaps.com',
    featureFlagUrl:
      'https://feature-flag-admin-acceptance.internal-weedmaps.com',
    logisticsChannelUrl:
      'wss://logistics-service-acceptance.internal-weedmaps.com/socket',
  },
  sandbox: {
    envName: 'sandbox',
  },
  staging: {
    envName: 'staging',
    NEW_RELIC_APP_NAME: 'admin (staging)',
    apiGatewayHost: 'https://api-g-staging.internal-weedmaps.com',
    coreBaseUrl: 'https://staging.internal-weedmaps.com',
    ionicBaseUrl: 'https://staging.internal-weedmaps.com',
    deliveriesUrl: 'https://deliveries-staging.internal-weedmaps.com',
    weedmapsUrl: 'https://staging.internal-weedmaps.com',
    cookieDomain: '.internal-weedmaps.com',
    featureFlagUrl: 'https://feature-flag-admin-staging.internal-weedmaps.com',
    logisticsChannelUrl:
      'wss://logistics-service-staging.internal-weedmaps.com/socket',
  },
  performance: {
    envName: 'performance',
    NEW_RELIC_APP_NAME: 'admin (performance)',
    apiGatewayHost: 'https://api-g-performance.internal-weedmaps.com',
    coreBaseUrl: 'https://performance.internal-weedmaps.com',
    ionicBaseUrl: 'https://performance.internal-weedmaps.com',
    weedmapsUrl: 'https://performance.internal-weedmaps.com',
    cookieDomain: '.internal-weedmaps.com',
    featureFlagUrl:
      'https://feature-flag-admin-performance.internal-weedmaps.com',
    logisticsChannelUrl:
      'wss://logistics-service-performance.internal-weedmaps.com/socket',
  },
  production: {
    envName: 'production',
    NEW_RELIC_APP_NAME: 'admin (production)',
    apiGatewayHost: 'https://api-g.weedmaps.com',
    internalApiGatewayHost: 'https://api-g-production.internal-weedmaps.com',
    coreBaseUrl: 'https://weedmaps.com',
    ionicBaseUrl: 'https://weedmaps.com',
    weedmapsUrl: 'https://weedmaps.com',
    featureFlagUrl: 'https://feature-flag-admin.internal-weedmaps.com',
    logisticsChannelUrl:
      'wss://logistics-service-production.internal-weedmaps.com/socket',
    amplitudeKey: '2fdce5d43eec503a3b6c26002d94f51e',
  },
};
