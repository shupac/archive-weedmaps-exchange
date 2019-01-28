import { mockCategories } from 'lib/mocks/categories';

import SellerSettings from './';

function setup(mockResponse) {
  const mockClient = {
    fetch: jest.fn().mockReturnValue(mockResponse),
  };
  const sellerSettings = SellerSettings.create({}, { client: mockClient });
  return { sellerSettings, mockClient };
}

describe('SellerSettings store', () => {
  it('can fetch departments data', async () => {
    const { sellerSettings, mockClient } = setup({
      data: mockCategories,
    });
    await sellerSettings.fetchDepartments();
    expect(mockClient.fetch).toHaveBeenCalledWith('/seller/departments');
    expect(sellerSettings.departments).toEqual(mockCategories);
  });
});
