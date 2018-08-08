import { dealForm, dealEntity } from 'lib/mocks/types/deal';
import DealStore from './';

describe('DealStore', () => {
  let store;
  let service;
  afterEach(() => {
    store.constructor.singleton = null;
  });

  describe('createDeal', () => {
    const mockResponse = { data: { data: { deal: dealEntity } } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.postDeal = jest
            .fn()
            .mockReturnValue(Promise.resolve(mockResponse));
        }
      };
      service = new MockService();
      store = new DealStore({}, {}, service);
    });

    it('should make api call to deal moderation API', () => {
      store.createDeal(dealForm);
      expect(store.service.postDeal).toHaveBeenCalledWith(dealForm);
    });

    it('should catch an error in the service and turn off loading', () => {
      const MockService = class {
        constructor() {
          this.postDeal = () => {
            throw new Error('Error');
          };
        }
      };
      service = new MockService();
      store = new DealStore({}, {}, service);
      store.createDeal(dealForm);
      expect(store.loading).toBe(false);
    });

    it('should trigger loading when called', () => {
      expect(store.loading).toBe(false);
      store.createDeal(dealForm);
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      expect(store.loading).toBe(false);
      await store.createDeal(dealForm);
      expect(store.loading).toBe(false);
    });
  });

  describe('updateDeal', () => {
    const mockResponse = { data: { data: { deal: dealEntity } } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.patchDeal = jest
            .fn()
            .mockReturnValue(Promise.resolve(mockResponse));
        }
      };
      service = new MockService();
      store = new DealStore({}, {}, service);
    });

    it('should make api call to deal moderation API', () => {
      store.updateDeal(dealForm);
      expect(store.service.patchDeal).toHaveBeenCalledWith(dealForm);
    });

    it('should catch an error in the service and turn off loading', () => {
      const MockService = class {
        constructor() {
          this.patchDeal = () => {
            throw new Error('Error');
          };
        }
      };
      service = new MockService();
      store = new DealStore({}, {}, service);
      store.updateDeal(dealForm);
      expect(store.loading).toBe(false);
    });

    it('should trigger loading when called', () => {
      expect(store.loading).toBe(false);
      store.updateDeal(dealForm);
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      expect(store.loading).toBe(false);
      await store.updateDeal(dealForm);
      expect(store.loading).toBe(false);
    });
  });

  describe('findDeal', () => {
    const mockResponse = { data: { data: { deal: dealEntity } } };
    beforeEach(() => {
      const MockService = class {
        constructor() {
          this.getDeal = jest
            .fn()
            .mockReturnValue(Promise.resolve(mockResponse));
        }
      };
      service = new MockService();
      store = new DealStore({}, {}, service);
    });

    it('should make api call to deal moderation API', () => {
      store.findDeal(dealForm.id);
      expect(store.service.getDeal).toHaveBeenCalledWith(dealForm.id);
    });

    it('should catch an error in the service and turn off loading', () => {
      const MockService = class {
        constructor() {
          this.getDeal = () => {
            throw new Error('Error');
          };
        }
      };
      service = new MockService();
      store = new DealStore({}, {}, service);
      store.findDeal(dealForm);
      expect(store.loading).toBe(false);
    });

    it('should trigger loading when called', () => {
      expect(store.loading).toBe(false);
      store.findDeal(dealForm);
      expect(store.loading).toBe(true);
    });

    it('should turn loading back off when done', async () => {
      expect(store.loading).toBe(false);
      await store.findDeal(dealForm);
      expect(store.loading).toBe(false);
    });
  });

  describe('getDeal', () => {
    store = new DealStore();
    store.deal = dealEntity;
    expect(store.getDeal()).toEqual(dealEntity);
  });

  describe('setLoadingToFalse', () => {
    it('sets this.loading to false', () => {
      store = new DealStore();
      store.loading = true;
      store.setLoadingToFalse();
      expect(store.loading).toBe(false);
    });
  });

  describe('dehydrate', () => {
    it('Should dehydrate with the expected data', () => {
      store = new DealStore();
      expect(store.dehydrate().deal).toEqual({});
      expect(store.dehydrate().deals.length).toEqual(0);
    });
  });
});
