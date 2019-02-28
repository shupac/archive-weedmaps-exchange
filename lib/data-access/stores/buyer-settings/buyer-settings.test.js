import * as MST from 'mobx-state-tree';
import { mockCategories } from 'lib/mocks/categories';
import { mockBrands } from 'lib/mocks/brands';
import { mockLocations, mockParsedLocation } from 'lib/mocks/location';
import BuyerSettings from './';

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
    expect(MST.getSnapshot(buyerSettings.departmentsData)).toMatchSnapshot();
  });

  it('can fetch data from categories endpoint', async () => {
    const mockFetchClient = {
      post: jest.fn().mockReturnValue({ data: mockLocations[0] }),
    };
    const buyerSettings = BuyerSettings.create({}, { client: mockFetchClient });
    const updateActiveLocation = jest.spyOn(
      buyerSettings,
      'updateActiveLocation',
    );
    await buyerSettings.createNewLocation(mockLocations[0]);
    expect(updateActiveLocation).toHaveBeenCalledWith(
      '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
    );
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

  it('can fetch data from brands endpoint', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockBrands }),
    };
    const buyerSettings = BuyerSettings.create({}, { client: mockFetchClient });
    await buyerSettings.getBrands();
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(`/buyer/brands`);
    expect(MST.getSnapshot(buyerSettings.brands)).toMatchSnapshot();
  });

  it('can fetch data from locations endpoint', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockLocations }),
    };
    const buyerSettings = BuyerSettings.create({}, { client: mockFetchClient });
    await buyerSettings.getLocations();
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(`/locations`);
    expect(MST.getSnapshot(buyerSettings.locations)).toMatchSnapshot();
  });

  it('should catch errors', async () => {
    const mockErrorClient = {
      fetch: () => {
        throw new Error('test');
      },
      patch: () => {
        throw new Error('test');
      },
      post: () => {
        throw new Error('test');
      },
    };

    const buyerSettings = BuyerSettings.create({}, { client: mockErrorClient });

    const createResp = await buyerSettings.createNewLocation(mockLocations[0]);
    expect(createResp).toEqual(false);

    const patchResp = await buyerSettings.patchLocation(mockLocations[0]);
    expect(patchResp).toEqual(false);
  });

  describe('when updating active location', () => {
    it('should get the editing location', () => {
      const buyerSettings = BuyerSettings.create({
        locations: mockLocations,
        editingLocationId: mockLocations[0].id,
      });
      expect(buyerSettings.editingLocation).toEqual(mockLocations[0]);
    });

    it('should set editing location id', () => {
      const buyerSettings = BuyerSettings.create();
      buyerSettings.setEditingLocationId('1234');
      expect(buyerSettings.editingLocationId).toEqual('1234');
    });

    it('should set the location ID to delete ', () => {
      const buyerSettings = BuyerSettings.create();
      buyerSettings.setEditingLocationId('1234');
      expect(buyerSettings.editingLocationId).toEqual('1234');
    });

    it('will push new location when not active already', async () => {
      const mockFetchClient = {
        fetch: jest.fn().mockReturnValue({ data: mockLocations }),
      };
      const buyerSettings = BuyerSettings.create(
        { locations: mockLocations },
        { client: mockFetchClient },
      );
      await buyerSettings.updateActiveLocation(
        '7f98075f-a924-4606-a817-b6f99a61f289',
      );
      expect(buyerSettings.activeLocation.id).toEqual(
        '7f98075f-a924-4606-a817-b6f99a61f289',
      );
    });

    it('will not push new location when active already', async () => {
      const mockFetchClient = {
        fetch: jest.fn().mockReturnValue({ data: mockLocations }),
      };
      const buyerSettings = BuyerSettings.create(
        { locations: mockLocations },
        { client: mockFetchClient },
      );
      const mockSetActiveLocation = jest.spyOn(
        buyerSettings,
        'setActiveLocation',
      );
      buyerSettings.updateActiveLocation(
        '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
      );
      expect(mockSetActiveLocation).not.toHaveBeenCalled();
    });

    it('will set active location to current active location if error is thrown', async () => {
      const mockFetchClient = {
        fetch: jest.fn().mockReturnValue({ data: mockLocations }),
      };
      const buyerSettings = BuyerSettings.create(
        { locations: mockLocations },
        { client: mockFetchClient },
      );
      const mockSetActiveLocation = jest.spyOn(
        buyerSettings,
        'setActiveLocation',
      );
      await buyerSettings.updateActiveLocation('nonExistentLocationId');
      expect(mockSetActiveLocation).toHaveBeenCalledWith(
        '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
      );
    });

    it('will delete location card', async () => {
      const mockFetchClient = {
        fetch: jest.fn().mockReturnValue({ data: mockLocations }),
        delete: jest.fn(),
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
        fetch: jest.fn().mockReturnValue({ data: mockLocations }),
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
