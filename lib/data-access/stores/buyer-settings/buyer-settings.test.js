import { getSnapshot } from 'mobx-state-tree';
import { mockCategories } from 'lib/mocks/categories';
import { mockBrands } from 'lib/mocks/brands';
import { mockLocations } from 'lib/mocks/location';
import BuyerSettings, { regionId } from './';

describe('BuyerSettings Store', () => {
  it('can fetch data from categories endpoint', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockCategories }),
    };
    const buyerSettings = BuyerSettings.create({}, { client: mockFetchClient });
    await buyerSettings.getDepartments();
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/departments?include=avatar_image,icon_image,categories`,
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
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/brands`,
    );
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
    expect(getSnapshot(buyerSettings.activeLocation)).toMatchSnapshot();
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
  });
});
