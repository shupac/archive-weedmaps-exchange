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

  it('should catch errors', () => {
    const mockErrorClient = {
      fetch: () => {
        throw new Error('test');
      },
    };
    const sellerSettings = SellerSettings.create(
      {},
      {
        client: mockErrorClient,
      },
    );
    const log = jest.spyOn(global.console, 'log').mockReturnValue();

    sellerSettings.fetchDepartments({});
    expect(log).toHaveBeenCalledWith(new Error('test'));
    log.mockRestore();
  });
});
