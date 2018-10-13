import { getSnapshot } from 'mobx-state-tree';
import { mockCategories } from 'lib/mocks/categories';
import { mockBrands } from 'lib/mocks/brands';
import { mockLocation } from 'lib/mocks/location';
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
      fetch: jest.fn().mockReturnValue({ data: mockLocation }),
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
});
