import ListingPlacementsService from './listing-placements';

describe('the listing placements service', () => {
  let service;
  beforeEach(() => {
    const fetch = {
      get: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
    };
    service = new ListingPlacementsService(fetch);
  });

  describe('getListingPlacementsIndex()', () => {
    describe('when querying for listing placements', () => {
      beforeEach(() => {
        service.fetch.get.mockReturnValue(Promise.resolve({ data: [] }));
      });

      it('will call the correct API for the index', async () => {
        const listingWmid = 123;
        const result = await service.getListingPlacementsIndex(listingWmid);
        expect(result).toEqual({ data: [] });
        expect(service.fetch.get).toHaveBeenCalledWith(
          'https://api-g.weedmaps.com/wm/v1/listings/123/placements',
        );
      });
    });

    describe('when querying for listings the request errors', () => {
      beforeEach(() => {
        service.fetch.get.mockReturnValue(
          Promise.resolve({ response: { status: 404 } }),
        );
      });

      it('will call the correct API for the index', async () => {
        const listingWmid = 123;
        const result = await service.getListingPlacementsIndex(listingWmid);
        expect(result).toEqual({ response: { status: 404 } });
        expect(service.fetch.get).toHaveBeenCalledWith(
          'https://api-g.weedmaps.com/wm/v1/listings/123/placements',
        );
      });
    });
  });

  describe('deleteNearbyPlacement()', () => {
    beforeEach(() => {
      service.fetch.delete.mockReturnValue(Promise.resolve({ data: {} }));
    });

    it('will call the correct endpoint', async () => {
      const placements = [
        {
          listing: { wmid: 123 },
          position: 1,
          region: { name: 'anaheim', id: 456 },
        },
      ];
      const result = await service.deleteNearbyPlacement(
        placements[0].listing.wmid,
        placements[0].region.id,
      );
      expect(result).toEqual({ data: {} });

      expect(service.fetch.delete).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/listings/123/placements/456',
      );
    });
  });

  describe('deletePremiumPlacement()', () => {
    beforeEach(() => {
      service.fetch.patch.mockReturnValue(Promise.resolve({ data: {} }));
    });

    it('will call the correct endpoint', async () => {
      const listingWmId = 4444;
      const packageLevel = 'basic';

      const result = await service.deletePremiumPlacement(
        listingWmId,
        packageLevel,
      );
      expect(result).toEqual({ data: {} });

      expect(service.fetch.patch).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/listings/4444',
        {
          feature_order: 9999,
          package_level: packageLevel,
        },
      );
    });
  });

  describe('placementToParams()', () => {
    describe('nearby placements', () => {
      it('should serialize the attributes correctly', () => {
        const placementParams = {
          region: {
            id: 123,
          },
          type: 'NEARBY',
        };

        expect(service.placementToParams(placementParams)).toEqual({
          exclude_region_id: 123,
          proximity_to_region_id: 123,
        });
      });
    });

    describe('premium placements', () => {
      it('should serialize the attributes', () => {
        const placementParams = {
          region: {
            id: 123,
          },
          type: 'PREMIUM',
        };

        expect(service.placementToParams(placementParams)).toEqual({
          region_id: 123,
          package_levels: ['free', 'basic'],
        });
      });
    });
  });

  describe('suggestions()', () => {
    beforeEach(() => {
      const suggestion = {
        name: 'GreenApple Collective New Mexico ',
        region_id: 608,
        region_name: 'Las Cruces',
        type: 'delivery',
        wmid: 434386280,
      };
      const responseData = { data: [suggestion] };
      const returnValue = Promise.resolve({ data: responseData });
      service.fetch.get.mockReturnValue(returnValue);
    });

    it('calls the suggestions endpoint', async () => {
      const params = {
        phrase: 'test phrase',
        listingType: 'delivery',
        placement: {
          region: {
            id: 123,
          },
          type: 'NEARBY',
        },
      };
      const result = await service.suggestions(params);

      expect(service.fetch.get).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/listing_suggestions',
        {
          params: {
            exclude_region_id: 123,
            listing_type: 'delivery',
            proximity_to_region_id: 123,
            q: 'test phrase',
          },
        },
      );

      expect(result).toEqual([
        {
          name: 'GreenApple Collective New Mexico ',
          region_id: 608,
          region_name: 'Las Cruces',
          type: 'delivery',
          wmid: 434386280,
        },
      ]);
    });
  });
});
