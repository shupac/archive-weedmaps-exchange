import { getSnapshot } from 'mobx-state-tree';
import { mockProducts } from 'lib/mocks/search-results';
import { mockCategoryProducts } from 'lib/mocks/category-products';
import BuyerProducts, { regionId } from './';

describe('BuyerProducts Store', () => {
  it('can fetch category products and set data', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockCategoryProducts }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    await buyerProducts.getCategoryProducts({ search: 'indica' });
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/departments?include=products`,
    );
    expect(getSnapshot(buyerProducts.categoryProductsData)).toMatchSnapshot();
  });

  it('should initiate with search results loading equal to true', () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockCategoryProducts }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    expect(buyerProducts.searchResultsLoading).toEqual(true);
  });

  it('can fetch product search and set data', () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({
        data: mockProducts,
        meta: {
          total_entries: 100,
        },
      }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    const promise = buyerProducts.searchCatalog({
      search: 'indica',
      page: 1,
      page_size: 3,
    });
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/products?query=indica&page[number]=1&page[size]=3`,
    );
    expect(buyerProducts.searchResultsLoading).toEqual(true);
    promise.then(() => {
      expect(getSnapshot(buyerProducts.searchResultsData)).toMatchSnapshot();
      expect(buyerProducts.searchResultsLoading).toEqual(false);
    });
  });

  it('should not fetch product search with no query', () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockProducts }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    buyerProducts.searchCatalog({});
    expect(mockFetchClient.fetch).not.toHaveBeenCalled();
    expect(buyerProducts.searchResults).toEqual([]);
    expect(buyerProducts.searchResultsLoading).toEqual(true);
  });

  it('can fetch product details and set data', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockProducts[0] }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    await buyerProducts.getProductDetails('1234');
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/products/1234`,
    );
    expect(getSnapshot(buyerProducts.productDetailsData)).toMatchSnapshot();
    expect(getSnapshot(buyerProducts.featuredProductPhoto)).toMatchSnapshot();
  });

  it('can return the category products view', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockCategoryProducts }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    await buyerProducts.getCategoryProducts({ search: 'indica' });
    expect(buyerProducts.categoryProducts).toMatchSnapshot();
  });

  it('can return the search results view', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({
        data: mockProducts,
        meta: {
          total_entries: 10,
        },
      }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    await buyerProducts.searchCatalog({ search: 'indica' });
    expect(buyerProducts.searchResults).toMatchSnapshot();
  });

  it('should handle no search results', () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockProducts }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    buyerProducts.setSearchResultsData([]);
    expect(buyerProducts.searchResults).toEqual([]);
  });

  it('can return the product details view', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockProducts[0] }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    await buyerProducts.getProductDetails('1234');
    expect(buyerProducts.productDetails).toMatchSnapshot();
  });

  it('can return the product variants view', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockProducts[0] }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    await buyerProducts.getProductDetails('1234');
    expect(buyerProducts.productVariants).toMatchSnapshot();
  });

  it('can return the product breadcrumb view', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockProducts[0] }),
    };
    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    await buyerProducts.getProductDetails('1234');
    expect(buyerProducts.productBreadcrumb).toMatchSnapshot();
  });

  it('should catch errors', () => {
    const mockErrorClient = {
      fetch: () => {
        throw new Error('test');
      },
    };

    const log = jest.spyOn(global.console, 'log').mockReturnValue();

    const buyerProducts = BuyerProducts.create(
      {},
      {
        client: mockErrorClient,
      },
    );
    buyerProducts.getCategoryProducts();
    expect(log).toHaveBeenCalledWith(new Error('test'));
    buyerProducts.searchCatalog({ search: 'foo' });
    expect(log).toHaveBeenCalledWith(new Error('test'));
    buyerProducts.getProductDetails('foo');
    expect(log).toHaveBeenCalledWith(new Error('test'));

    log.mockRestore();
  });
});
