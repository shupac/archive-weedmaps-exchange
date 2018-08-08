import urlConfig, { urlConfigFactory } from './url-config';

describe('urlConfig', () => {
  describe('on the client', () => {
    const {
      apiV2Url,
      siteUrl,
      apiUrl,
      coreApiUrl,
      weedmapsOauthUrl,
      platformUrl,
      featureFlagApiUrl,
    } = urlConfig;

    it('returns correct URLs', () => {
      expect(apiV2Url).toBe('https://api-g.weedmaps.com/wm/v2');
      expect(siteUrl).toBe('https://weedmaps.com');
      expect(apiUrl).toBe('https://api-g.weedmaps.com/wm/web/v1');
      expect(coreApiUrl).toBe('https://api-g.weedmaps.com/wm/v1');
      expect(weedmapsOauthUrl).toBe('https://weedmaps.com/oauth/token');
      expect(platformUrl).toBe('https://api-g.weedmaps.com/platform/gql');
      expect(featureFlagApiUrl).toBe(
        'https://api-g.weedmaps.com/feature-flag/v1',
      );
    });
  });

  describe('on the server', () => {
    const {
      apiV2Url,
      siteUrl,
      apiUrl,
      coreApiUrl,
      weedmapsOauthUrl,
      platformUrl,
      featureFlagApiUrl,
    } = urlConfigFactory({ isServer: () => true });

    it('returns correct URLs', () => {
      expect(apiV2Url).toBe('https://api-g-production.weedmaps.com/wm/v2');
      expect(siteUrl).toBe('https://weedmaps.com');
      expect(apiUrl).toBe('https://api-g-production.weedmaps.com/wm/web/v1');
      expect(coreApiUrl).toBe('https://api-g-production.weedmaps.com/wm/v1');
      expect(weedmapsOauthUrl).toBe('https://weedmaps.com/oauth/token');
      expect(platformUrl).toBe(
        'https://api-g-production.weedmaps.com/platform/gql',
      );
      expect(featureFlagApiUrl).toBe(
        'https://api-g-production.weedmaps.com/feature-flag/v1',
      );
    });
  });
});
