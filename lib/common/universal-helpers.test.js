/* global it, expect, describe */
import * as universalHelpers from './universal-helpers';

describe('universalHelpers', () => {
  describe('isServer', () => {
    describe('on the client', () => {
      it('returns false', () => {
        expect(universalHelpers.isServer()).toBe(false);
      });
    });
  });

  describe('environmentContext', () => {
    describe('on the client', () => {
      it('returns BROWSER', () => {
        expect(universalHelpers.environmentContext({})).toEqual({
          BROWSER: 'BROWSER',
        });
      });
    });

    describe('on the server', () => {
      it('returns SERVER', () => {
        expect(universalHelpers.environmentContext({ req: true })).toEqual({
          SERVER: 'SERVER',
        });
      });
    });
  });

  describe('pluralizeLinkType', () => {
    it('returns dispensaries when linkType is pickup', () => {
      const pluralizedLinkType = universalHelpers.pluralizeLinkType('pickup');
      expect(pluralizedLinkType).toEqual('dispensaries');
    });
    it('returns deliveries when linkType is delivery', () => {
      const pluralizedLinkType = universalHelpers.pluralizeLinkType('delivery');
      expect(pluralizedLinkType).toEqual('deliveries');
    });
    it('returns null when linkType is unknown', () => {
      const pluralizedLinkType = universalHelpers.pluralizeLinkType('unknown');
      expect(pluralizedLinkType).toEqual(null);
    });
  });

  describe('singularizeLinkType', () => {
    it('returns dispensaries when linkType is pickup', () => {
      const singularizedLinkType = universalHelpers.singularizeLinkType(
        'pickup',
      );
      expect(singularizedLinkType).toEqual('dispensary');
    });
    it('returns deliveries when linkType is delivery', () => {
      const singularizedLinkType = universalHelpers.singularizeLinkType(
        'delivery',
      );
      expect(singularizedLinkType).toEqual('delivery');
    });
    it('returns null when linkType is unknown', () => {
      const singularizedLinkType = universalHelpers.singularizeLinkType(
        'unknown',
      );
      expect(singularizedLinkType).toEqual(null);
    });
  });
});
