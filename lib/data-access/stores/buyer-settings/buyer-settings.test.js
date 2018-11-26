import { getSnapshot } from 'mobx-state-tree';
import { mockCategories } from 'lib/mocks/categories';
import { mockBrands } from 'lib/mocks/brands';
import { mockLocations, mockParsedLocation } from 'lib/mocks/location';
import BuyerSettings from './';
import mockCart from '../../../mocks/cart';

describe('BuyerSettings Store', () => {
  it('can fetch data from categories endpoint', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockCategories }),
    };
    const buyerSettings = BuyerSettings.create({}, { client: mockFetchClient });
    await buyerSettings.getDepartments();
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/departments?include=avatar_image,icon_image,categories`,
    );
    expect(getSnapshot(buyerSettings.departmentsData)).toMatchSnapshot();
  });

  it('should transform departments data', () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockCategories }),
    };
    const buyerSettings = BuyerSettings.create({}, { client: mockFetchClient });
    buyerSettings.setDepartmentsData(mockCategories);
    expect(buyerSettings.departments).toMatchSnapshot();
    expect(buyerSettings.departmentsLoading).toEqual(false);
  });

  it('should return availabilities', () => {
    const buyerSettings = BuyerSettings.create({});
    expect(buyerSettings.availabilities).toMatchSnapshot();
  });

  it('can fetch data from brands endpoint', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockBrands }),
    };
    const buyerSettings = BuyerSettings.create({}, { client: mockFetchClient });
    await buyerSettings.getBrands();
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(`/buyer/brands`);
    expect(getSnapshot(buyerSettings.brands)).toMatchSnapshot();
  });

  it('can fetch data from locations endpoint', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockLocations }),
    };
    const buyerSettings = BuyerSettings.create({}, { client: mockFetchClient });
    await buyerSettings.getLocations();
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(`/locations`);
    expect(getSnapshot(buyerSettings.locations)).toMatchSnapshot();
  });

  it('should catch errors', () => {
    const mockErrorClient = {
      fetch: () => {
        throw new Error('test');
      },
    };

    const log = jest.spyOn(global.console, 'log').mockReturnValue();

    const buyerSettings = BuyerSettings.create({}, { client: mockErrorClient });
    buyerSettings.getDepartments();
    expect(log).toHaveBeenCalledWith(new Error('test'));
    buyerSettings.getBrands();
    expect(log).toHaveBeenCalledWith(new Error('test'));
    buyerSettings.getLocations();
    expect(log).toHaveBeenCalledWith(new Error('test'));

    log.mockRestore();
  });
  describe('when updating active location', () => {
    it('will push new location when not active already', async () => {
      const mockFetchClient = {
        fetch: jest.fn().mockReturnValue({ data: mockLocations }),
      };
      const buyerSettings = BuyerSettings.create(
        { locations: mockLocations },
        { client: mockFetchClient },
      );
      buyerSettings.updateActiveLocation(
        '7f98075f-a924-4606-a817-b6f99a61f289',
      );
      expect(buyerSettings.activeLocation).toEqual(mockLocations[1]);
    });
    it('will not push new location when active already', async () => {
      const mockFetchClient = {
        fetch: jest.fn().mockReturnValue({ data: mockLocations }),
      };
      const buyerSettings = BuyerSettings.create(
        { locations: mockLocations },
        { client: mockFetchClient },
      );
      const mocksetActiveLocation = jest.spyOn(
        buyerSettings,
        'setActiveLocation',
      );
      buyerSettings.updateActiveLocation(
        '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
      );
      expect(mocksetActiveLocation).not.toHaveBeenCalled();
    });
    it('will delete location card', async () => {
      const mockFetchClient = {
        delete: jest.fn().mockReturnValue(Promise.resolve({ data: mockCart })),
      };
      const buyerSettings = BuyerSettings.create(
        { locations: mockLocations },
        { client: mockFetchClient },
      );
      const deleteLocation = jest.spyOn(buyerSettings, 'deleteLocation');
      buyerSettings.deleteLocation('6039ad85-7be7-45ce-a5f9-3e802eeba1e5');
      expect(deleteLocation).toHaveBeenCalledWith(
        '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
      );
    });
    it('will patch the location card', async () => {
      const mockFetchClient = {
        patch: jest
          .fn()
          .mockReturnValue(Promise.resolve({ data: mockCategories })),
      };
      const buyerSettings = BuyerSettings.create(
        { locations: mockLocations },
        { client: mockFetchClient },
      );
      const patchLocation = jest.spyOn(buyerSettings, 'patchLocation');
      buyerSettings.patchLocation(mockParsedLocation);
      expect(patchLocation).toHaveBeenCalledWith({
        address: '824 East 17th Street,Irvine, CA',
        contact: 'John Doe',
        email: 'john@showgrowirvine.com',
        instructions: 'Buzz 12345',
        licenses: [
          {
            id: '123456',
            licenseType: 'Adult-Use Retail',
            number: '7645-2347-8743-3786',
          },
          {
            id: '54321',
            licenseType: 'Medical Retail',
            number: '3453-3453-3453-5435',
          },
        ],
        name: 'ShowGrow Irvine',
        phone: '2139735232',
      });
    });
  });
});
