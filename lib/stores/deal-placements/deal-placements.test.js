import DealPlacementsStore from './';

describe('DealPlacementsStore', () => {
  let store;
  let service;
  afterEach(() => {
    store.constructor.singleton = null;
  });

  describe('getDealPlacementsForRegion', () => {
    const regionId = 84;
    const mockResponse = { data: { data: { dealPlacements: {} } } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.getDealPlacementsIndex = jest
            .fn()
            .mockReturnValue(Promise.resolve(mockResponse));
        }
      };
      service = new MockService();
      store = new DealPlacementsStore({}, {}, service);
    });

    it('Should make call to service.getDealPlacementsIndex', () => {
      store.getDealPlacementsForRegion(regionId);
      expect(store.service.getDealPlacementsIndex).toHaveBeenCalledWith(
        regionId,
      );
    });

    it('should trigger loading when called', () => {
      expect(store.loading).toBe(false);
      store.getDealPlacementsForRegion(regionId);
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      expect(store.loading).toBe(false);
      await store.getDealPlacementsForRegion(regionId);
      expect(store.loading).toBe(false);
    });
  });

  describe('setDealPlacementsListForRegionAndType', () => {
    const placements = [{ listing_wmid: '123', position: 0 }];
    const regionId = 84;
    const dealType = 'ftp';
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.patchDealPlacements = jest
            .fn()
            .mockReturnValue(Promise.resolve());
        }
      };
      service = new MockService();
      store = new DealPlacementsStore({}, {}, service);
    });

    it('Should make call to service.patchDealPlacements', () => {
      store.setDealPlacementsListForRegionAndType(
        placements,
        regionId,
        dealType,
      );
      expect(store.service.patchDealPlacements).toHaveBeenCalledWith(
        placements,
        regionId,
        dealType,
      );
    });
  });

  describe('createDealPlacement', () => {
    const regionId = 84;
    const regionSlug = 'sacremento';
    const dealType = 'ftp';
    const listing = {
      wmid: '123',
      id: 123,
      name: 'Test',
    };
    const position = 1;
    const placement = {
      listing,
      region: {
        id: regionId,
        slug: regionSlug,
      },
      position,
      type: dealType,
    };

    const dealPlacements = {
      ftp: [],
    };

    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.patchDealPlacements = jest
            .fn()
            .mockReturnValue(Promise.resolve());
        }
      };
      service = new MockService();
      store = new DealPlacementsStore({}, {}, service);
    });

    it('Should call setDealPlacementsListForRegionAndType', () => {
      store.setDealPlacementsListForRegionAndType = jest.fn();

      store.dealPlacements = dealPlacements;
      store.createDealPlacement(placement);

      expect(store.setDealPlacementsListForRegionAndType).toHaveBeenCalledWith(
        store.dealPlacements.ftp,
        regionId,
        dealType,
      );
    });

    it('Should add new placement to dealPlacements.ftp array', () => {
      store.dealPlacements = dealPlacements;
      store.createDealPlacement(placement);

      expect(store.dealPlacements.ftp[0].listing_wmid).toEqual(listing.wmid);
      expect(store.dealPlacements.ftp[0].position).toEqual(position);
    });
  });

  describe('updateDealPlacement', () => {
    const dealType = 'daily';
    const regionId = 166;

    const dealPlacements = {
      daily: [
        {
          position: 1,
          listing_wmid: 11,
          deal_type: dealType,
        },
        {
          position: 2,
          listing_wmid: 23,
          deal_type: dealType,
        },
      ],
    };

    const updatedPlacement = {
      position: 1,
      listing: {
        name: 'Weedplace',
        id: 123,
        wmid: 23,
      },
      region: {
        id: regionId,
        slug: 'irvine',
      },
      type: dealType,
    };

    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.patchDealPlacements = jest
            .fn()
            .mockReturnValue(Promise.resolve());
        }
      };
      service = new MockService();
      store = new DealPlacementsStore({}, {}, service);
    });

    it('Should call setDealPlacementsListForRegionAndType', () => {
      store.setDealPlacementsListForRegionAndType = jest.fn();
      store.dealPlacements = dealPlacements;
      store.updateDealPlacement(updatedPlacement);
      expect(store.setDealPlacementsListForRegionAndType).toHaveBeenCalledWith(
        store.dealPlacements.daily,
        regionId,
        dealType,
      );
    });

    it('Should reposition the updated placements', () => {
      store.dealPlacements = dealPlacements;
      store.updateDealPlacement(updatedPlacement);
      expect(store.dealPlacements.daily.length).toEqual(2);
      expect(store.dealPlacements.daily[0].listing_wmid).toEqual(23);
      expect(store.dealPlacements.daily[1].listing_wmid).toEqual(11);
    });
  });

  describe('addToPlacements', () => {
    const dealType = 'daily';

    const dealPlacements = {
      daily: [
        {
          position: 1,
          listing_wmid: 11,
          deal_type: dealType,
        },
        {
          position: 2,
          listing_wmid: 23,
          deal_type: dealType,
        },
      ],
    };

    const newPlacement = {
      position: 2,
      listing_wmid: 44,
      deal_type: dealType,
    };

    it('Should reposition a new placement', () => {
      store = new DealPlacementsStore();
      store.dealPlacements = dealPlacements;
      store.addToPlacements(newPlacement);
      expect(store.dealPlacements.daily.length).toEqual(3);
      expect(store.dealPlacements.daily[0].listing_wmid).toEqual(11);
      expect(store.dealPlacements.daily[1].listing_wmid).toEqual(44);
      expect(store.dealPlacements.daily[2].listing_wmid).toEqual(23);
    });
  });

  describe('removeFromPlacements', () => {
    const dealType = 'daily';

    const dealPlacements = {
      daily: [
        {
          position: 1,
          listing_wmid: 11,
          deal_type: dealType,
        },
        {
          position: 2,
          listing_wmid: 23,
          deal_type: dealType,
        },
      ],
    };

    const removedPlacement = {
      position: 1,
      listing: {
        wmid: 11,
      },
      type: dealType,
    };

    it('Should reposition a new placement', () => {
      store = new DealPlacementsStore();
      store.dealPlacements = dealPlacements;
      store.removeFromPlacements(removedPlacement);
      expect(store.dealPlacements.daily.length).toEqual(1);
      expect(store.dealPlacements.daily[0].listing_wmid).toEqual(23);
    });
  });

  describe('dehydrate', () => {
    it('Should dehydrate with the expected data', () => {
      store = new DealPlacementsStore();
      expect(store.dehydrate()).toEqual({ dealPlacements: {} });
    });
  });
});
