import React from 'react';
import { shallow } from 'enzyme';
import { mockProducts } from 'lib/mocks/search-results';
import BuyerProducts from 'lib/data-access/stores/buyer-products';
import BuyerCart from 'lib/data-access/stores/buyer-cart';
import { ProductDetails } from './';

const mockStore = BuyerProducts.create(
  {},
  { client: { fetch: jest.fn().mockReturnValue(mockProducts[0]) } },
);

const mockCartStore = BuyerCart.create({ mockAddToCart: jest.fn() }, {});

const props = {
  store: {
    buyerProducts: mockStore,
    buyerCart: mockCartStore,
  },
  productId: '7e0fb515-f87b-4d07-82fb-d2168aa859dc',
};

describe('Product Detail Page', () => {
  describe('when mounts', () => {
    let component;
    it('should call getProductDetails action in buyerProducts store  ', () => {
      component = new ProductDetails({ ...props });
      jest.spyOn(mockStore, 'getProductDetails');

      component.componentDidMount();
      expect(
        component.props.store.buyerProducts.getProductDetails,
      ).toHaveBeenCalledWith('7e0fb515-f87b-4d07-82fb-d2168aa859dc');
    });
  });
  it('should be able to construct breadcrumb structure ', () => {
    const localProps = {
      store: {
        buyerProducts: {
          productBreadcrumb: [
            {
              id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
              name: 'Concentrates',
            },
          ],
        },
      },
    };
    const component = new ProductDetails({ ...localProps });
    const crumbStructure = component.constructBreadcrumb();
    expect(crumbStructure).toEqual([
      {
        label: 'Catalog',
        route: '/buyer/marketplace/catalog',
      },
      {
        label: 'Concentrates',
        route:
          '/buyer/marketplace/catalog?categories=81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
      },
    ]);
  });

  it('should render a breadcrumb', () => {
    const tree = shallow(<ProductDetails {...props} />);
    const breadCrumb = tree.find('Breadcrumbs');
    expect(breadCrumb.exists()).toEqual(true);
  });
  it('should render a product photo gallery', () => {
    const tree = shallow(<ProductDetails {...props} />);
    const photos = tree.find('ProductPhotos');
    expect(photos.exists()).toEqual(true);
  });
  it('should render a product description', () => {
    const tree = shallow(<ProductDetails {...props} />);
    const description = tree.find('ProductDescription');
    expect(description.exists()).toEqual(true);
  });
  it('should render product variants', () => {
    const tree = shallow(<ProductDetails {...props} />);
    const productVariants = tree.find('ProductVariants');
    expect(productVariants.exists()).toEqual(true);
  });
  it('should render brand licenses', () => {
    const tree = shallow(<ProductDetails {...props} />);
    const licenseList = tree.find('LicenseList');
    expect(licenseList.exists()).toEqual(true);
  });
});
