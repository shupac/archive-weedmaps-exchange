import ListingPlacementsStore from './';

const listingWmid = 84;

describe('ListingPlacementsStore', () => {
  let store;
  let service;
  afterEach(() => {
    store.constructor.singleton = null;
  });

  describe('setFilterListing', () => {
    beforeEach(() => {
      store = new ListingPlacementsStore({}, {}, service);
      store.getPlacementsForListing = jest.fn();
    });

    it('Should set the filterListing', () => {
      expect(store.filterListing.wmid).toBe(0);
      store.setFilterListing({ wmid: listingWmid });
      expect(store.filterListing.wmid).toBe(listingWmid);
    });

    it('should call getPlacementsForListing with the newly-set listing', () => {
      store.setFilterListing({ wmid: listingWmid });
      expect(store.getPlacementsForListing).toHaveBeenCalledWith(listingWmid);
    });

    it('should NOT call getPlacementsForListing if the id is 0', () => {
      store.setFilterListing({ wmid: 0 });
      expect(store.getPlacementsForListing).not.toHaveBeenCalledWith(0);
    });
  });

  describe('getPlacementsForListing', () => {
    const mockResponse = { data: { data: { listingPlacements: {} } } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.getListingPlacementsIndex = jest
            .fn()
            .mockReturnValue(Promise.resolve(mockResponse));
        }
      };
      service = new MockService();
      store = new ListingPlacementsStore({}, {}, service);
    });

    it('Should make call to service.getListingPlacementsIndex', () => {
      store.getPlacementsForListing(listingWmid);
      expect(store.service.getListingPlacementsIndex).toHaveBeenCalledWith(
        listingWmid,
      );
    });

    it('should trigger loading when called', () => {
      expect(store.loading).toBe(false);
      store.getPlacementsForListing(listingWmid);
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      expect(store.loading).toBe(false);
      await store.getPlacementsForListing(listingWmid);
      expect(store.loading).toBe(false);
    });
  });

  describe('deleteNearbyPlacement', () => {
    const placement = { listing: { wmid: 84 }, region: { id: 92 } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.deleteNearbyPlacement = jest
            .fn()
            .mockReturnValue(Promise.resolve());
        }
      };
      service = new MockService();
      store = new ListingPlacementsStore({}, {}, service);
    });

    it('Should make call to service.deleteNearbyPlacement', () => {
      store.deleteNearbyPlacement(placement.listing.wmid, placement.region.id);
      expect(store.service.deleteNearbyPlacement).toHaveBeenCalledWith(
        placement.listing.wmid,
        placement.region.id,
      );
    });

    it('should trigger loading when called', () => {
      expect(store.loading).toBe(false);
      store.deleteNearbyPlacement(placement);
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      expect(store.loading).toBe(false);
      await store.deleteNearbyPlacement(placement);
      expect(store.loading).toBe(false);
    });
  });

  describe('dehydrate', () => {
    it('Should dehydrate with the expected data', () => {
      store = new ListingPlacementsStore();
      expect(store.dehydrate()).toEqual({ listingPlacements: [] });
    });
  });
});
