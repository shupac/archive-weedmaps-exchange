import Listings from './listings';

describe('Listings Service', () => {
  let service;
  beforeEach(() => {
    const fetch = {
      get: jest.fn(),
    };
    service = new Listings(fetch);
  });

  describe('fetchListingsIndex()', () => {
    describe('when querying for listing placements', () => {
      beforeEach(() => {
        service.fetch.get.mockReturnValue(Promise.resolve({ data: [] }));
      });

      it('will call the correct API for the index', async () => {
        const listingType = 'delivery';
        const page = 3;
        const result = await service.fetchListingsIndex(listingType, page);
        expect(result).toEqual({ data: [] });
        expect(service.fetch.get).toHaveBeenCalledWith(
          'https://api-g.weedmaps.com/wm/v1/listings/?listing_type=delivery&page=3',
        );
      });
    });
  });
});
