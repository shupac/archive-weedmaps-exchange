jest.mock('axios'); // eslint-disable-next-line import/first
import SearchStore from './';

describe('SearchStore', () => {
  let store;
  afterEach(() => {
    store.constructor.singleton = null;
  });

  describe('suggestions', () => {
    let fetch;
    const location = '473,302';
    const query = 'West Coast Cure';
    const categories = ['brands', 'doctors', 'place'];
    const limit = 10;
    beforeEach(() => {
      fetch = require('axios');
      fetch.get = jest.fn();
      fetch.get.mockReturnValue(Promise.resolve());
    });

    it('Should make api call to suggestion API', () => {
      store = new SearchStore();
      store.suggestions(location, query, categories, limit);
      expect(fetch.get).toHaveBeenCalledWith(store.URL, {
        params: {
          brands_max_size: 10,
          doctors_max_size: 10,
          latlng: '473,302',
          place_max_size: 10,
          q: 'west coast cure',
          types: 'place,doctors,brands,',
        },
      });
    });

    it('should trigger loading when called', () => {
      store = new SearchStore();
      expect(store.loading).toBe(false);
      store.suggestions(location, query, categories, limit);
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      store = new SearchStore();
      expect(store.loading).toBe(false);
      await store.suggestions(location, query, categories, limit);
      expect(store.loading).toBe(false);
    });
  });
  describe('buildParams', () => {
    const location = '473,302';
    const query = 'West Coast Cure';
    it('should take an array of categories and build the params object', () => {
      store = new SearchStore();
      const categories = ['brand', 'doctor', 'place'];
      const limit = 10;
      const params = store.buildParams(location, query, categories, limit);
      expect(params).toEqual({
        latlng: '473,302',
        q: 'west coast cure',
        brand_max_size: 10,
        doctor_max_size: 10,
        place_max_size: 10,
        types: 'place,doctor,brand,',
      });
    });
    it('should take default categories to brand, doctor, dispensary, delivery if null', () => {
      store = new SearchStore();
      const limit = 10;
      const params = store.buildParams(location, query, null, limit);
      expect(params).toEqual({
        latlng: '473,302',
        q: 'west coast cure',
        brand_max_size: 10,
        doctor_max_size: 10,
        delivery_max_size: 10,
        dispensary_max_size: 10,
        types: 'delivery,dispensary,doctor,brand,',
      });
    });
    it('should take default limit to 5 if null', () => {
      store = new SearchStore();
      const params = store.buildParams(location, query);
      expect(params).toEqual({
        latlng: '473,302',
        q: 'west coast cure',
        brand_max_size: 5,
        doctor_max_size: 5,
        delivery_max_size: 5,
        dispensary_max_size: 5,
        types: 'delivery,dispensary,doctor,brand,',
      });
    });
    it('should truncate limit to 20', () => {
      store = new SearchStore();
      const params = store.buildParams(location, query, null, 21);
      expect(params).toEqual({
        latlng: '473,302',
        q: 'west coast cure',
        brand_max_size: 20,
        doctor_max_size: 20,
        delivery_max_size: 20,
        dispensary_max_size: 20,
        types: 'delivery,dispensary,doctor,brand,',
      });
    });
    it('should truncate limit to 10 for place', () => {
      store = new SearchStore();
      const categories = ['brand', 'doctor', 'place'];
      const params = store.buildParams(location, query, categories, 21);
      expect(params).toEqual({
        latlng: '473,302',
        q: 'west coast cure',
        brand_max_size: 20,
        doctor_max_size: 20,
        place_max_size: 10,
        types: 'place,doctor,brand,',
      });
    });
    it('should convert query into lowercase', () => {
      store = new SearchStore();
      const params = store.buildParams(location, query);
      expect(params.q).toEqual('west coast cure');
    });
  });

  describe('setPlaceData', () => {
    it('should set place data in the store', () => {
      store = new SearchStore();

      store.setPlaceData({
        region: [{}],
        place: [{}],
      });

      expect(store.results.length).toEqual(2);
      expect(store.active).toEqual(true);
      expect(store.selectionIndex).toEqual(null);
    });
  });

  describe('setSearchData', () => {
    it('should flatten nearby_listings', () => {
      store = new SearchStore();

      const searchWithNearbyListings = {
        brand: [
          {
            id: 1,
            name: 'brand',
            nearby_listings: [{ id: 1, type: 'dispensary', name: 'dis' }],
          },
        ],
      };
      const flattened = [
        {
          ...searchWithNearbyListings.brand[0],
          resultIndex: 0,
          category: 'brand',
        },
        {
          ...searchWithNearbyListings.brand[0].nearby_listings[0],
          resultIndex: 1,
          category: 'brand',
          parentId: 1,
        },
      ];
      store.setSearchData(searchWithNearbyListings);
      expect(store.results.length).toEqual(flattened.length);
      expect(store.active).toEqual(true);
      expect(store.selectionIndex).toEqual(null);
    });
  });

  describe('setActive', () => {
    it('should set the `active` flag to the given value', () => {
      store = new SearchStore();
      store.setActive(false);
      expect(store.active).toEqual(false);
      store.setActive(true);
      expect(store.active).toEqual(true);
    });
  });

  describe('setSelectionIndex', () => {
    it('should set selectionIndex to the given value', () => {
      store = new SearchStore();
      store.setSelectionIndex(420);
      expect(store.selectionIndex).toEqual(420);
    });
  });

  describe('clearSearch', () => {
    it('should clear all of the search values', () => {
      store = new SearchStore();
      store.active = true;
      store.results = [{}];
      store.selectionIndex = 4;
      store.clearSearch();
      expect(store.active).toEqual(false);
      expect(store.results.length).toEqual(0);
      expect(store.selectionIndex).toEqual(null);
    });
  });
});
