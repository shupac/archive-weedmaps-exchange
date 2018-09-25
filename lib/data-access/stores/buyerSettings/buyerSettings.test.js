import { getSnapshot } from 'mobx-state-tree';
import { mockCategories } from 'lib/mocks/categories';
import BuyerSettings, { regionId } from './';

const mockFetchClient = {
  fetch: jest.fn().mockReturnValue(mockCategories),
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
});
