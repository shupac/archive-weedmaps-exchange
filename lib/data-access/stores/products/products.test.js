import { getSnapshot } from 'mobx-state-tree';
import { mockResponse } from 'lib/mocks/product-search';
import ProductStore, { regionId } from './';

function setup() {
  return {
    mockFetchClient: {
      fetch: jest.fn().mockReturnValue(mockResponse),
    },
    mockProductsStore: {
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
      setProducts: jest.fn(),
    },
  };
}

describe('Products Store', () => {
  it('can fetch data from products endpoint', async () => {
    const { mockFetchClient } = setup();
    const productsStore = ProductStore.create({}, { client: mockFetchClient });
    await productsStore.searchProducts('indica');
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/products?query=indica`,
    );
    expect(getSnapshot(productsStore.products)).toMatchSnapshot();
  });
});
