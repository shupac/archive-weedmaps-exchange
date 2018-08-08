import DealsModerationService from './deals-moderation';

describe('the deals moderation service', () => {
  let service;
  beforeEach(() => {
    service = new DealsModerationService({});
    service.fetch.get = jest.fn();
    service.fetch.patch = jest.fn();
  });

  describe('when querying for deals moderation', () => {
    beforeEach(() => {
      service.fetch.get.mockReturnValue(Promise.resolve({ data: [] }));
    });

    it('will call the correct API for the index', async () => {
      const regionId = 123;
      const result = await service.getDeals({ regionId });
      expect(result).toEqual({ data: [] });
      expect(service.fetch.get).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/deals_moderation',
        {
          params: {
            curation_status: 'approved',
            include_listing: true,
            page: 1,
            page_size: 20,
            region_id: 123,
          },
        },
      );
    });

    it('will call the correct API for the index with a title match', async () => {
      const regionId = 123;
      const titleMatch = 'BOGO';
      const result = await service.getDeals({ regionId, titleMatch });
      expect(result).toEqual({ data: [] });
      expect(service.fetch.get).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/deals_moderation',
        {
          params: {
            curation_status: 'approved',
            include_listing: true,
            page: 1,
            page_size: 20,
            region_id: 123,
            title_match: titleMatch,
          },
        },
      );
    });
  });

  describe('statusToCurationStatusFilter method', () => {
    it('should return needs_approval for pending', () => {
      const output = service.statusToCurationStatusFilter('pending');
      expect(output).toBe('needs_approval');
    });
    it('should return rejected for denied', () => {
      const output = service.statusToCurationStatusFilter('denied');
      expect(output).toBe('rejected');
    });
    it('should return approved for approved', () => {
      const output = service.statusToCurationStatusFilter('approved');
      expect(output).toBe('approved');
    });
  });

  describe('when approving a deal', () => {
    beforeEach(() => {
      service.fetch.patch.mockReturnValue(Promise.resolve({ data: [] }));
    });

    it('will call the correct API for approving a deal', async () => {
      const result = await service.moderateDeal({ id: 1234, approve: true });
      expect(result).toEqual({ data: [] });
      expect(service.fetch.patch).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/deals/1234/moderate',
        {
          curation_reason: undefined,
          curation_status: 'Approve',
        },
      );
    });

    it('will call the correct API for rejecting a deal', async () => {
      const result = await service.moderateDeal({ id: 1234, approve: false });
      expect(result).toEqual({ data: [] });
      expect(service.fetch.patch).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/deals/1234/moderate',
        {
          curation_reason: undefined,
          curation_status: 'rejected',
        },
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
      const result = await service.getDeals({ regionId });
      expect(result).toEqual({ response: { status: 404 } });
      expect(service.fetch.get).toHaveBeenCalledWith(
        'https://api-g.weedmaps.com/wm/v1/deals_moderation',
        {
          params: {
            curation_status: 'approved',
            include_listing: true,
            page: 1,
            page_size: 20,
            region_id: 123,
          },
        },
      );
    });
  });
});
