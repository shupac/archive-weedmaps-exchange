import RegionPlacementsService from './region-placements';

describe('the region placements service', () => {
  let service;
  beforeEach(() => {
    service = new RegionPlacementsService({});
    service.fetch.get = jest.fn();
    service.fetch.delete = jest.fn();
    service.fetch.patch = jest.fn();
  });

  describe('when querying for region placements', () => {
    beforeEach(() => {
      service.fetch.get.mockReturnValue(Promise.resolve({ data: [] }));
    });

    it('will call the correct API for the index', async () => {
      const regionId = 123;
      const result = await service.getRegionPlacementsIndex(regionId);
      expect(result).toEqual({ data: [] });
      expect(service.fetch.get).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/regions/123/placements',
      );
    });
  });

  describe('when querying for regions the request errors', () => {
    beforeEach(() => {
      service.fetch.get.mockReturnValue(
        Promise.resolve({ response: { status: 404 } }),
      );
    });

    it('will call the correct API for the index', async () => {
      const regionId = 123;
      const result = await service.getRegionPlacementsIndex(regionId);
      expect(result).toEqual({ response: { status: 404 } });
      expect(service.fetch.get).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/regions/123/placements',
      );
    });
  });

  describe('when deleting nearby placements', () => {
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

  describe('when updating premium placements', () => {
    beforeEach(() => {
      service.fetch.patch.mockReturnValue(Promise.resolve({ data: {} }));
    });

    it('updates the feature order of the listing to the selected position', async () => {
      const listingWmid = 1337;
      const featureOrder = 3;
      const result = await service.updatePremiumPlacement(
        listingWmid,
        featureOrder,
      );
      expect(result).toEqual({ data: {} });
      expect(service.fetch.patch).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/listings/1337',
        { feature_order: 3, package_level: 'listing_plus' },
      );
    });
  });

  describe('when deleting premium placements', () => {
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
});
