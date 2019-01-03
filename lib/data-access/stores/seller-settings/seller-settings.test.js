import { mockCategories } from 'lib/mocks/categories';
import mockZones from 'lib/mocks/zones';

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

  it('can fetch zones data', async () => {
    const { sellerSettings, mockClient } = setup({
      data: mockZones,
    });
    await sellerSettings.fetchZones();
    expect(mockClient.fetch).toHaveBeenCalledWith('/seller/zones');
    expect(sellerSettings.zones).toEqual(mockZones);
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
    sellerSettings.fetchZones();
    expect(log).toHaveBeenCalledWith(new Error('test'));
    log.mockRestore();
  });
});
