import get from 'lodash.get';
import { toJS } from 'mobx';
import {
  taxesReceipt,
  previewPayload,
  mockListing,
  mockTaxStatus,
  taxesPayload,
} from 'lib/mocks/types/taxes';
import TaxesStore from './';

const mockPreview = get(taxesReceipt, 'data.data.attributes', {});
const mockListingStore = get(mockListing, 'data.listing', '');

const mockNormalizedForm = [
  {
    categories: ['indica'],
    id: 'f4a3a477-d1ea-4eff-aa82-e745019e5977',
    license_type: 'medical',
    tax_name: 'apple2',
    tax_rate: 2,
    tax_type: 'excise',
    uuid: 'f4a3a477-d1ea-4eff-aa82-e745019e5977',
  },
];

describe('The Taxes Store', () => {
  describe('when being constructed', () => {
    it('should create an instance variable for the tax service', () => {
      const service = { name: 'TaxesService' };
      const store = new TaxesStore({}, {}, service);
      expect(store.service).toEqual(service);
    });
  });
  describe('when getting the tax preview receipt', () => {
    it('should call the service and assign observable ', async () => {
      const service = {
        postTaxesPreview: jest
          .fn()
          .mockReturnValue(Promise.resolve(taxesReceipt)),
      };
      const store = new TaxesStore({}, {}, service);
      await store.postTaxesPreview(previewPayload);
      expect(toJS(store.taxesPreview)).toEqual(mockPreview);
    });

    it('and the request fails ', async () => {
      const service = {
        postTaxesPreview: jest.fn().mockImplementation(() => Promise.reject()),
      };
      const store = new TaxesStore({}, {}, service);
      await store.postTaxesPreview(previewPayload);
      expect(store.taxesPreview).toEqual(null);
    });
  });
  describe('when sending the tax data ', () => {
    it('should call the service and assign observable ', async () => {
      const service = {
        patchTaxesUpdate: jest
          .fn()
          .mockReturnValue(Promise.resolve(taxesPayload)),
      };
      const store = new TaxesStore({}, {}, service);
      await store.bulkSaveTaxes(previewPayload);
      expect(toJS(store.listingTaxes)).toEqual(mockNormalizedForm);
    });

    it('and the request fails ', async () => {
      const service = {
        patchTaxesUpdate: jest
          .fn()
          .mockImplementation(() => Promise.reject(new Error('Test Error'))),
      };
      const store = new TaxesStore({}, {}, service);
      await store.bulkSaveTaxes(previewPayload);
      expect(toJS(store.listingTaxes)).toEqual([]);
    });
  });
  describe('when fetching the listing', () => {
    it('should call the service and assign ', async () => {
      const service = {
        fetchListing: jest.fn().mockImplementation(() => mockListing),
        fetchListingPlatform: jest.fn(),
      };
      const store = new TaxesStore({}, {}, service);
      await store.fetchListing(123);
      expect(store.listing).toEqual(mockListingStore);
    });

    it('and the request fails ', async () => {
      const service = {
        fetchListing: jest.fn().mockImplementation(() => Promise.reject()),
        fetchListingPlatform: jest.fn(),
      };
      const store = new TaxesStore({}, {}, service);
      await store.fetchListing(123);
      expect(store.listing).toEqual({});
    });
  });
  describe('when fetching the listing tax data', () => {
    it('should call the service and assign ', async () => {
      const service = {
        fetchListing: jest.fn().mockImplementation(() => mockTaxStatus),
        fetchListingDeliveryFee: jest.fn(),
        getListingTaxes: jest
          .fn()
          .mockReturnValue(Promise.resolve(taxesPayload)),
      };
      const store = new TaxesStore({}, {}, service);
      await store.fetchListingTaxes(123);
      expect(service.getListingTaxes).toHaveBeenCalled();
    });
  });
  describe('when deleting a tax row', () => {
    it('should call the service and assign ', async () => {
      const service = {
        fetchListing: jest.fn().mockImplementation(() => mockListing),
        fetchListingDeliveryFee: jest.fn(),
        deleteListingTaxes: jest.fn().mockReturnValue(Promise.resolve(true)),
      };
      const store = new TaxesStore({}, {}, service);
      store.startLoading = jest.fn();
      await store.removeTaxItem('taxId001', 123);
      expect(await service.deleteListingTaxes).toHaveBeenCalled();
    });
  });
  describe('when setting enabled tax status', () => {
    it('should call the service and assign ', async () => {
      const service = {
        mutateTaxesEnabled: jest.fn().mockImplementation(() => mockTaxStatus),
        fetchListingDeliveryFee: jest.fn(),
        deleteListingTaxes: jest.fn().mockReturnValue(Promise.resolve(true)),
      };
      const store = new TaxesStore({}, {}, service);
      await store.setTaxEnabledStatus(false);
      expect(service.mutateTaxesEnabled).toHaveBeenCalled();
      expect(store.platformListing.taxesEnabled).toBe(true);
    });
  });
  describe('dehydration', () => {
    it('should have a non-observable listing property', () => {
      const store = new TaxesStore();
      const dehydrated = store.dehydrate();
      expect(dehydrated.taxesPreview).toBeDefined();
      expect(dehydrated.listing).toBeDefined();
      expect(dehydrated.platformListing).toBeDefined();
    });
  });
});
