import { getSnapshot } from 'mobx-state-tree';
import { mockCategories } from 'lib/mocks/categories';
import { mockLocation } from 'lib/mocks/location';
import BuyerSettings, { regionId } from './';

const mockFetchClient = {
  fetch: jest.fn().mockReturnValue(mockCategories),
};

const mockFetchLocation = {
  fetch: jest.fn().mockReturnValue(mockLocation),
};

describe('BuyerSettings Store', () => {
  it('can fetch data from categories endpoint', async () => {
    const buyerStore = BuyerSettings.create({}, { client: mockFetchClient });
    await buyerStore.getDepartments();
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/departments?include=avatar_image,icon_image`,
    );
    expect(getSnapshot(buyerStore.departmentsData)).toMatchSnapshot();
  });
  it('can fetch data from locations endpoint', async () => {
    const buyerStore = BuyerSettings.create({}, { client: mockFetchLocation });
    await buyerStore.getLocation();
    expect(mockFetchLocation.fetch).toHaveBeenCalledWith(`/locations`);
    expect(getSnapshot(buyerStore.locationsData)).toMatchSnapshot();
  });
});
