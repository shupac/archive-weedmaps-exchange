import RegionPlacementsStore from './';

const regionId = 84;

describe('RegionPlacementsStore', () => {
  let store;
  let service;
  afterEach(() => {
    store.constructor.singleton = null;
  });

  describe('setFilterRegion', () => {
    beforeEach(() => {
      store = new RegionPlacementsStore({}, {}, service);
      store.getPlacementsForRegion = jest.fn();
    });

    it('Should set the filterRegion', () => {
      expect(store.filterRegion.id).toBe(0);
      store.setFilterRegion({ id: regionId });
      expect(store.filterRegion.id).toBe(regionId);
    });

    it('should call getPlacementsForRegion with the newly-set region', () => {
      store.setFilterRegion({ id: regionId });
      expect(store.getPlacementsForRegion).toHaveBeenCalledWith(regionId);
    });

    it('should NOT call getPlacementsForRegion if the id is 0', () => {
      store.setFilterRegion({ id: 0 });
      expect(store.getPlacementsForRegion).not.toHaveBeenCalledWith(0);
    });
  });

  describe('getPlacementsForRegion', () => {
    const mockResponse = { data: { data: { regionPlacements: {} } } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.getRegionPlacementsIndex = jest
            .fn()
            .mockReturnValue(Promise.resolve(mockResponse));
        }
      };
      service = new MockService();
      store = new RegionPlacementsStore({}, {}, service);
    });

    it('Should make call to service.getRegionPlacementsIndex', () => {
      store.getPlacementsForRegion(regionId);
      expect(store.service.getRegionPlacementsIndex).toHaveBeenCalledWith(
        regionId,
      );
    });

    it('should trigger loading when called', () => {
      expect(store.loading).toBe(false);
      store.getPlacementsForRegion(regionId);
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      expect(store.loading).toBe(false);
      await store.getPlacementsForRegion(regionId);
      expect(store.loading).toBe(false);
    });
  });

  describe('updatePremiumPlacement', () => {
    const placement = { listing: { wmid: 1337 }, position: 3 };

    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.updatePremiumPlacement = jest
            .fn()
            .mockReturnValue(Promise.resolve());
        }
      };
      service = new MockService();
      store = new RegionPlacementsStore({}, {}, service);
    });

    it('calls service.updatePremiumPlacement', () => {
      store.updatePremiumPlacement(placement);
      expect(store.service.updatePremiumPlacement).toHaveBeenCalledWith(
        placement.listing.wmid,
        placement.position,
      );
    });

    it('toggles on loading when called', () => {
      expect(store.loading).toBe(false);
      store.updatePremiumPlacement(placement);
      expect(store.loading).toBe(true);
    });

    it('toggles off loading when the service call returns', async () => {
      expect(store.loading).toBe(false);
      await store.updatePremiumPlacement(placement);
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
      store = new RegionPlacementsStore({}, {}, service);
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
      store = new RegionPlacementsStore();
      expect(store.dehydrate()).toEqual({ regionPlacements: [] });
    });
  });
});
