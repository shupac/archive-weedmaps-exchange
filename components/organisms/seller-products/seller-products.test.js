import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import { ToggleSwitch } from '@ghostgroup/ui';
import SellerSettingsStore from 'lib/data-access/stores/seller-settings';
import SellerProductsStore from 'lib/data-access/stores/seller-products';
import AuthStore from 'lib/data-access/stores/auth';
import mockProductsResponse from 'lib/mocks/seller-products';
import { mockWmxUser } from 'lib/mocks/user';
import { mockCategories } from 'lib/mocks/categories';

import { SellerProducts } from './';

const mockUserSeller = {
  ...mockWmxUser,
  preferences: {
    userContext: 'seller',
    locationId: '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
    brandId: 'fd2b3edd-3de5-497b-af07-13d4cf02f240',
  },
};

function setup(props) {
  const mockStore = {
    sellerProducts: SellerProductsStore.create({
      sellerProducts: mockProductsResponse.data,
      sellerProductsTotalItems: mockProductsResponse.meta.totalEntries,
    }),
    sellerSettings: SellerSettingsStore.create({
      departments: mockCategories,
    }),
    authStore: AuthStore.create({
      wmxUser: mockWmxUser,
      activeSellerBrand: jest.fn(),
    }),
  };

  const router = {
    query: {},
  };

  const component = (
    <SellerProducts store={mockStore} router={router} {...props} />
  );
  const wrapper = shallow(component, { disableLifecycleMethods: true });
  return { wrapper, mockStore, component };
}

describe('Seller Products Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should fetch departments on mount', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    const fetchDepartments = jest
      .spyOn(mockStore.sellerSettings, 'fetchDepartments')
      .mockReturnValue();
    const fetchProducts = jest
      .spyOn(mockStore.sellerProducts, 'fetchProducts')
      .mockReturnValue();
    instance.componentDidMount();
    expect(fetchDepartments).toHaveBeenCalled();
    expect(fetchProducts).toHaveBeenCalled();
  });

  it('should search products on route change', () => {
    const { wrapper } = setup({
      router: {
        asPath: '/foo',
        query: {},
      },
    });
    const instance = wrapper.instance();
    const searchProducts = jest
      .spyOn(instance, 'searchProducts')
      .mockReturnValue();
    instance.componentDidUpdate();
    expect(searchProducts).toHaveBeenCalled();
    expect(instance.prevRoute).toEqual('/foo');
  });

  it('should re-fetch products on brand change', done => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();

    const searchProducts = jest
      .spyOn(instance, 'searchProducts')
      .mockReturnValue();
    instance.componentDidMount();
    mockStore.authStore.setUser(mockUserSeller);
    setTimeout(() => {
      expect(searchProducts).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('disposes of the reaction when unmounting', () => {
    const { wrapper } = setup();
    const dispose = jest.spyOn(wrapper.instance(), 'dispose');
    wrapper.unmount();
    expect(dispose).toHaveBeenCalled();
  });

  it('should not search products if route does not change', () => {
    const { wrapper } = setup({
      router: {
        asPath: '/foo',
        query: {},
      },
    });
    const instance = wrapper.instance();
    instance.prevRoute = '/foo';
    const searchProducts = jest
      .spyOn(instance, 'searchProducts')
      .mockReturnValue();
    instance.componentDidUpdate();
    expect(searchProducts).not.toHaveBeenCalled();
  });

  it('should update router state', () => {
    const { wrapper } = setup({
      router: {
        query: {
          search: 'foo',
        },
      },
    });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.setRouterState({ foo: 'bar' });
    expect(pushRoute).toHaveBeenCalledWith('sellerProducts', {
      search: 'foo',
      foo: 'bar',
    });
  });

  it('should handle on sort', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    instance.setState({ mounted: true });
    const setActive = jest.spyOn(instance, 'setActive').mockReturnValue();
    wrapper
      .find(ToggleSwitch)
      .first()
      .props()
      .onChange();
    expect(setActive).toHaveBeenCalled();
  });

  it('should handle set active toggle', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    instance.setState({ mounted: true });
    const onSort = jest.spyOn(instance, 'onSort').mockReturnValue();
    wrapper
      .find('SortButton')
      .first()
      .simulate('click');
    expect(onSort).toHaveBeenCalled();
  });

  it('should format sort parameter on search', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    jest.spyOn(instance, 'getRouterState').mockReturnValue({
      sortBy: 'foo',
      ascending: false,
    });
    const fetchProducts = jest
      .spyOn(mockStore.sellerProducts, 'fetchProducts')
      .mockReturnValue();
    instance.searchProducts();
    expect(fetchProducts).toHaveBeenCalledWith({
      active: undefined,
      categories: undefined,
      page: 1,
      pageSize: 15,
      query: undefined,
      sort: '-foo',
    });
  });

  it('should update the url state on clear all', () => {
    const { wrapper } = setup({
      router: {
        query: {},
      },
    });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.clearAll();
    expect(pushRoute).toHaveBeenCalledWith('sellerProducts', {});
    pushRoute.mockRestore();
  });

  it('should clear filters but keep search term', () => {
    const { wrapper } = setup({
      router: {
        query: {
          search: 'foo',
        },
      },
    });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.clearAll();
    expect(pushRoute).toHaveBeenCalledWith('sellerProducts', { search: 'foo' });
    pushRoute.mockRestore();
  });

  it('should render empty state', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    instance.setState({ mounted: true });
    mockStore.sellerProducts.setSellerProducts([]);
    mockStore.sellerProducts.setSearchProductsTotalItems(0);
    expect(wrapper.find('EmptyState').exists()).toEqual(true);
  });

  it('should update seller product on set active', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    const updateSellerProduct = jest
      .spyOn(mockStore.sellerProducts, 'updateSellerProduct')
      .mockReturnValue();
    const mockProduct = mockProductsResponse.data[0];
    instance.setActive(mockProduct, true);
    expect(updateSellerProduct).toHaveBeenCalledWith({
      ...mockProduct,
      active: true,
    });
  });

  it('should update route when paginated', () => {
    const { wrapper } = setup({
      router: {
        query: {
          search: 'foo',
        },
      },
    });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.goToPage(2);
    expect(pushRoute).toHaveBeenCalledWith('sellerProducts', {
      search: 'foo',
      page: 2,
    });
  });

  it('should update url state for different sort key', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const setRouterState = jest
      .spyOn(instance, 'setRouterState')
      .mockReturnValue();
    instance.onSort('foo');
    expect(setRouterState).toHaveBeenCalledWith({
      sortBy: 'foo',
      ascending: true,
    });
  });

  it('should update url state for same sort key', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    jest.spyOn(instance, 'getRouterState').mockReturnValue({
      sortBy: 'foo',
      ascending: true,
    });
    const setRouterState = jest
      .spyOn(instance, 'setRouterState')
      .mockReturnValue();
    instance.onSort('foo');
    expect(setRouterState).toHaveBeenCalledWith({
      sortBy: 'foo',
      ascending: false,
    });
  });

  it('should show product count for only 1 product', () => {
    const { wrapper, mockStore } = setup();
    mockStore.sellerProducts.setSellerProducts([mockProductsResponse.data[0]]);
    mockStore.sellerProducts.setSearchProductsTotalItems(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show pagination', () => {
    const { wrapper } = setup({
      router: {
        query: {
          page_size: 1,
          page: 1,
        },
      },
    });
    const instance = wrapper.instance();
    instance.setState({ mounted: true });
    expect(wrapper).toMatchSnapshot();
  });
});
