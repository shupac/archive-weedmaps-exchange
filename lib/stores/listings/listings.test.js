import { mockListings } from 'lib/mocks/types/listings';
import ListingsStore from './';

const mockListingsResponse = {
  data: {
    data: mockListings,
  },
};

describe('The Listings Store', () => {
  describe('when being constructed', () => {
    it('should create an instance variable for the listings service', () => {
      const service = { name: 'ListingsService' };
      const store = new ListingsStore({}, {}, service);
      expect(store.service).toEqual(service);
    });
  });
  describe('when fetching the listings index', () => {
    it('should call the service and assign ', async () => {
      const service = {
        fetchListingsIndex: jest
          .fn()
          .mockReturnValue(Promise.resolve(mockListingsResponse)),
      };
      const store = new ListingsStore({}, {}, service);
      await store.fetchListingsIndex('dispensary');
      expect(service.fetchListingsIndex).toHaveBeenCalled();
    });

    it('and the request fails ', async () => {
      const service = {
        fetchListingsIndex: jest
          .fn()
          .mockImplementation(() => Promise.reject()),
      };
      const store = new ListingsStore({}, {}, service);
      await store.fetchListingsIndex('dispensary');
      expect(store.listings).toEqual([]);
    });
  });
  describe('dehydration', () => {
    it('should have a non-observable listing property', () => {
      const store = new ListingsStore();
      const dehydrated = store.dehydrate();
      expect(dehydrated.listings).toBeDefined();
    });
  });
});
