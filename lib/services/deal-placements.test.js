import DealPlacementsService from './deal-placements';

describe('the deal placements service', () => {
  let service;
  beforeEach(() => {
    service = new DealPlacementsService({});
    service.fetch.get = jest.fn();
    service.fetch.patch = jest.fn();
  });

  describe('when querying for deal placements', () => {
    beforeEach(() => {
      service.fetch.get.mockReturnValue(Promise.resolve({ data: [] }));
    });

    it('will call the correct API for the index', async () => {
      const regionId = 123;
      const result = await service.getDealPlacementsIndex(regionId);
      expect(result).toEqual({ data: [] });
      expect(service.fetch.get).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/deal_placements?region_id=123&deal_type=daily',
      );
    });
  });

  describe('when querying for deals the request errors', () => {
    beforeEach(() => {
      service.fetch.get.mockReturnValue(
        Promise.resolve({ response: { status: 404 } }),
      );
    });

    it('will call the correct API for the index', async () => {
      const regionId = 123;
      const result = await service.getDealPlacementsIndex(regionId);
      expect(result).toEqual({ response: { status: 404 } });
      expect(service.fetch.get).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/deal_placements?region_id=123&deal_type=daily',
      );
    });
  });

  describe('when patching deal placements', () => {
    beforeEach(() => {
      service.fetch.patch.mockReturnValue(Promise.resolve({ data: [] }));
    });

    it('will call the correct API for the index', async () => {
      const placements = [{ listing_wmid: '123', position: 0 }];
      const regionId = 84;
      const dealType = 'ftp';
      const result = await service.patchDealPlacements(
        placements,
        regionId,
        dealType,
      );
      expect(result).toEqual({ data: [] });
      expect(service.fetch.patch).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/deal_placements',
        {
          deal_placements: placements,
          deal_type: dealType,
          region_id: regionId,
        },
      );
    });
  });
});
