import React from 'react';
import { shallow } from 'enzyme';
import { mockProducts } from 'lib/mocks/search-results';
import BuyerProducts from 'lib/data-access/stores/buyer-products';
import BuyerCart from 'lib/data-access/stores/buyer-cart';
import AuthStore from 'lib/data-access/stores/auth';
import { ProductDetails } from './';

function setup() {
  const mockProductsStore = BuyerProducts.create(
    {},
    { client: { fetch: jest.fn().mockReturnValue({ data: mockProducts[0] }) } },
  );
  const mockCartStore = BuyerCart.create({ mockAddToCart: jest.fn() }, {});
  const mockAuthStore = AuthStore.create({ selectedLocation: 'Irvine' });

  const mockStore = {
    buyerProducts: mockProductsStore,
    buyerCart: mockCartStore,
    authStore: mockAuthStore,
  };

  const props = {
    store: mockStore,
    productId: '7e0fb515-f87b-4d07-82fb-d2168aa859dc',
    variants: {},
  };

  const component = <ProductDetails {...props} />;
  const wrapper = shallow(component, { disableLifecycleMethods: true });
  return { wrapper, mockStore, props };
}

describe('Product Detail Page', () => {
  describe('when mounts', () => {
    let component;
    it('should render a breadcrumb', () => {
      const { wrapper } = setup();
      const breadCrumb = wrapper.find('Breadcrumbs');
      expect(breadCrumb.exists()).toEqual(true);
    });

    it('should render a product photo gallery', () => {
      const { wrapper } = setup();
      const photos = wrapper.find('ProductPhotos');
      expect(photos.exists()).toEqual(true);
    });

    it('should render a product description', () => {
      const { wrapper } = setup();
      const description = wrapper.find('ProductDescription');
      expect(description.exists()).toEqual(true);
    });

    it('should render brand licenses', () => {
      const { wrapper } = setup();
      const licenseList = wrapper.find('LicenseList');
      expect(licenseList.exists()).toEqual(true);
    });

    it('should call getProductDetails action in buyerProducts store  ', () => {
      const { props, mockStore } = setup();
      component = new ProductDetails({ ...props });
      jest.spyOn(mockStore.buyerProducts, 'getProductDetails');

      component.componentDidMount();
      expect(
        component.props.store.buyerProducts.getProductDetails,
      ).toHaveBeenCalledWith('7e0fb515-f87b-4d07-82fb-d2168aa859dc');
    });
  });

  it('should be able to construct breadcrumb structure ', () => {
    const { mockStore } = setup();

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
        authStore: mockStore.authStore,
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

  it('should fetch product detail data on mount', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    instance.getProductDetails = jest.fn();
    instance.componentDidMount();
    expect(instance.getProductDetails).toHaveBeenCalled();
  });

  it('disposes of the reaction when unmounting', () => {
    const { wrapper } = setup();
    const dispose = jest.spyOn(wrapper.instance(), 'dispose');
    wrapper.unmount();
    expect(dispose).toHaveBeenCalled();
  });

  it('should refetch data when selected location changes', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    const getProductDetails = jest
      .spyOn(instance, 'getProductDetails')
      .mockReturnValue();
    mockStore.authStore.setSelectedLocation('Home');
    expect(getProductDetails).toHaveBeenCalled();
    getProductDetails.mockRestore();
  });

  it('should render empty state', () => {
    const { wrapper, mockStore } = setup();
    mockStore.buyerProducts.setproductDetailsSuccess(false);
    expect(wrapper.find('EmptyState').exists()).toEqual(true);
  });
});
