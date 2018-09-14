import { mockResponse, mockProduct } from 'lib/mocks/product-search';
import CatalogSearchStore from './';

function setup() {
  return {
    mockFetchClient: {
      fetch: jest.fn().mockReturnValue(mockResponse),
    },
    mockCatalogSearchStore: {
      products: [mockProduct],
    },
  };
}

describe('Catalog Search Store', () => {
  it('can create an instance of a model', () => {
    const { mockCatalogSearchStore } = setup();
    const catalogSearchStore = CatalogSearchStore.create(
      mockCatalogSearchStore,
    );
    expect(catalogSearchStore.products).toEqual([mockProduct]);
  });

  it('can fetch data from categories endpoint', async () => {
    const { mockFetchClient } = setup();
    const catalogSearchStore = CatalogSearchStore.create(
      {},
      { client: mockFetchClient },
    );

    await catalogSearchStore.getProducts('thc');
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      '/buyer/regions/64d05017-4339-4cda-9e57-0da061bf6b00/products?query=thc',
    );
    expect(catalogSearchStore.products).toEqual([mockProduct]);
  });

  it('can reset products for empty query', async () => {
    const { mockFetchClient } = setup();
    const catalogSearchStore = CatalogSearchStore.create(
      {},
      { client: mockFetchClient },
    );

    await catalogSearchStore.getProducts('');
    expect(mockFetchClient.fetch).not.toHaveBeenCalled();
    expect(catalogSearchStore.products).toEqual([]);
  });
});
