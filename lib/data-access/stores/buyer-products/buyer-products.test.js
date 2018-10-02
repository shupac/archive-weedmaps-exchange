import { getSnapshot } from 'mobx-state-tree';
import { mockResponse } from 'lib/mocks/search-results';
import BuyerProducts, { regionId } from './';

function setup() {
  return {
    mockFetchClient: {
      fetch: jest.fn().mockReturnValue(mockResponse),
    },
    mockCatalogStore: {
      departments: [
        {
          id: '1234',
          name: 'Indica',
          position: 1,
          iconImageUrl:
            'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/concentrates.svg',
          avatarImageUrl:
            'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/concentrates.png',
        },
      ],
      setProductDetailData: jest.fn(),
    },
  };
}

describe('BuyerProducts Store', () => {
  it('searchCatalog action can fetch and set data for product search', async () => {
    const { mockFetchClient } = setup();
    const buyerProductsStore = BuyerProducts.create(
      {},
      { client: mockFetchClient },
    );
    await buyerProductsStore.searchCatalog('indica');
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/products?query=indica`,
    );
    expect(getSnapshot(buyerProductsStore.searchResultsData)).toMatchSnapshot();
  });

  it('getProductDetails action can fetch and set data for product details', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue(mockResponse[0]),
    };
    const buyerProductsStore = BuyerProducts.create(
      {},
      { client: mockFetchClient },
    );
    await buyerProductsStore.getProductDetails('1234');
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `buyer/regions/${regionId}/products/1234`,
    );
    expect(
      getSnapshot(buyerProductsStore.productDetailsData),
    ).toMatchSnapshot();
  });
});
