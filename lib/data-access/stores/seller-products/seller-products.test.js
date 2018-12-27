import mockResponse from 'lib/mocks/seller-products';

import SellerProducts from './';

function setup(mockRes) {
  const mockClient = {
    fetch: jest.fn().mockReturnValue(mockRes),
    patch: jest.fn().mockReturnValue(mockRes),
  };
  const sellerProducts = SellerProducts.create({}, { client: mockClient });
  return { sellerProducts, mockClient };
}

describe('SellerProducts Store', () => {
  it('should fetch seller products and set data', async () => {
    const { sellerProducts } = setup(mockResponse);
    await sellerProducts.fetchProducts({});
    expect(sellerProducts.sellerProducts).toMatchSnapshot();
  });

  it('should transform query params into query string', () => {
    const { sellerProducts, mockClient } = setup(mockResponse);
    sellerProducts.fetchProducts({
      active: 'published',
      categories: '1/2/3',
      page: 2,
      pageSize: 15,
      order: '-name',
    });

    expect(mockClient.fetch).toHaveBeenCalledWith(
      '/seller/products?filter%5Bactive%5D=true&filter%5Bcategory_ids%5D[]=1&filter%5Bcategory_ids%5D[]=2&filter%5Bcategory_ids%5D[]=3&page[number]=2&page[size]=15',
    );
  });

  it('should update seller product', async () => {
    const updatedProduct = {
      ...mockResponse.data[0],
      active: true,
    };
    const { sellerProducts } = setup({ data: updatedProduct });
    sellerProducts.setSellerProducts(mockResponse.data);
    await sellerProducts.updateSellerProduct(updatedProduct);
    expect(sellerProducts.sellerProduct.active).toEqual(true);
    expect(
      sellerProducts.sellerProducts.find(
        ({ id }) => id === mockResponse.data[0].id,
      ).active,
    ).toEqual(true);
  });

  it('should catch errors', () => {
    const mockErrorClient = {
      fetch: () => {
        throw new Error('test');
      },
    };
    const sellerProducts = SellerProducts.create(
      {},
      {
        client: mockErrorClient,
      },
    );
    const log = jest.spyOn(global.console, 'log').mockReturnValue();

    sellerProducts.fetchProducts({});
    expect(log).toHaveBeenCalledWith(new Error('test'));
    sellerProducts.updateSellerProduct({});
    expect(log).toHaveBeenCalledWith(new Error('test'));

    log.mockRestore();
  });
});
