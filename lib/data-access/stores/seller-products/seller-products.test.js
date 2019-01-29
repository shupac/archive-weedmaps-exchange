// @flow
import mockProductsResponse from 'mocks/seller-products';
import mockProductDetails, {
  mockErrorProduct,
  mockErrors,
} from 'mocks/seller-product-details';
import logger from 'lib/common/logger';

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
    const { sellerProducts } = setup(mockProductsResponse);
    await sellerProducts.fetchProducts({});
    expect(sellerProducts.sellerProducts).toMatchSnapshot();
  });

  it('should transform query params into query string', () => {
    const { sellerProducts, mockClient } = setup(mockProductsResponse);
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

  it('should fetch product details and set data', async () => {
    const { sellerProducts } = setup({ data: mockProductDetails });
    await sellerProducts.fetchProductDetails('123');
    expect(sellerProducts.sellerProductDetails).toMatchSnapshot();
  });

  it('should update seller product', async () => {
    const updatedProduct = {
      ...mockProductsResponse.data[0],
      active: true,
    };
    const { sellerProducts } = setup({ data: updatedProduct });
    sellerProducts.setSellerProducts(mockProductsResponse.data);
    await sellerProducts.updateSellerProduct(updatedProduct);
    expect(sellerProducts.sellerProductDetails.active).toEqual(true);
    expect(
      sellerProducts.sellerProducts.find(
        ({ id }) => id === mockProductsResponse.data[0].id,
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
    const logError = jest.spyOn(logger, 'error').mockReturnValue();

    sellerProducts.fetchProducts({});
    expect(logError).toHaveBeenCalledWith(new Error('test'));
    sellerProducts.fetchProductDetails();
    expect(logError).toHaveBeenCalledWith(new Error('test'));
    logError.mockRestore();
  });

  it('should catch form errors', async done => {
    const mockErrorClient = {
      patch: () => {
        const error = new Error('test');
        throw error;
      },
    };

    const sellerProducts = SellerProducts.create(
      {},
      {
        client: mockErrorClient,
      },
    );

    const response = await sellerProducts.updateSellerProduct(mockErrorProduct);
    expect(response).toEqual(false);
    done();
  });

  it('should catch and set the form errors if available', async done => {
    const mockErrorClient = {
      patch: () => {
        const error = new Error('test');
        // $FlowFixMe
        error.response = {
          json: () => Promise.resolve({ errors: mockErrors }),
        };
        throw error;
      },
    };

    const sellerProducts = SellerProducts.create(
      {},
      {
        client: mockErrorClient,
      },
    );

    const setDetailFormErrors = jest.spyOn(
      sellerProducts,
      'setDetailFormErrors',
    );
    const response = await sellerProducts.updateSellerProduct(mockErrorProduct);
    expect(setDetailFormErrors).toHaveBeenCalledWith(mockErrors);
    expect(sellerProducts.productFormErrors).toEqual(mockErrors);
    expect(response).toEqual(false);
    done();
  });
});
