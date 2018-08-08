import DealModerationStore from './';

describe('DealModerationStore', () => {
  let store;
  let service;
  afterEach(() => {
    store.constructor.singleton = null;
  });

  describe('getDealModerationsForRegion', () => {
    const regionId = 84;
    const mockResponse = { data: { data: { deals: {} } } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.getDeals = jest
            .fn()
            .mockReturnValue(Promise.resolve(mockResponse));
        }
      };
      service = new MockService();
      store = new DealModerationStore({}, {}, service);
    });

    it('Should make api call to deal moderation API', () => {
      store.getDealModerationsForRegion({ page: 1, pageSize: 20, regionId });
      expect(store.service.getDeals).toHaveBeenCalledWith({
        page: 1,
        pageSize: 20,
        regionId: 84,
      });
    });

    it('Should make api call to deal moderation API with a titleMatch', () => {
      const titleMatch = 'BOGO';
      store.getDealModerationsForRegion({
        page: 1,
        pageSize: 20,
        regionId,
        titleMatch,
      });
      expect(store.service.getDeals).toHaveBeenCalledWith({
        page: 1,
        pageSize: 20,
        regionId: 84,
        titleMatch,
      });
    });

    it('should trigger loading when called', () => {
      expect(store.loading).toBe(false);
      store.getDealModerationsForRegion({ regionId });
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      expect(store.loading).toBe(false);
      await store.getDealModerationsForRegion({ regionId });
      expect(store.loading).toBe(false);
    });
  });

  describe('approveDeal and denyDeal', () => {
    const mockResponse = { data: { data: { deal: {} } } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.moderateDeal = jest
            .fn()
            .mockReturnValue(Promise.resolve(mockResponse));
        }
      };
      service = new MockService();
      store = new DealModerationStore({}, {}, service);
    });

    it('Should make api call to the approve moderation api', async () => {
      await store.approveDeal(1234);
      expect(store.service.moderateDeal).toHaveBeenCalledWith({
        id: 1234,
        approve: true,
      });
    });

    it('Should make api call to the deny moderation api', async () => {
      await store.denyDeal(1234);
      expect(store.service.moderateDeal).toHaveBeenCalledWith({
        id: 1234,
        approve: false,
      });
    });
  });

  describe('setLoadingToFalse', () => {
    it('sets this.loading to false', () => {
      store = new DealModerationStore();
      store.loading = true;
      store.setLoadingToFalse();
      expect(store.loading).toBe(false);
    });
  });
});
