import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import { mockCategories, mockMappedCategories } from 'lib/mocks/categories';
import { mockBrands } from 'lib/mocks/brands';
import { mockProduct } from 'lib/mocks/search-results';
import ProductCard from 'components/molecules/product-card';
import { Catalog } from './';
import CategoryCarousels from './carousels';
import { Products, NoResults } from './styles';

const mockStore = {
  buyerSettings: {
    getDepartments: jest.fn(),
    getBrands: jest.fn(),
    departments: mockCategories,
    brands: mockBrands,
  },
  buyerProducts: {
    searchResults: [mockProduct],
    searchCatalog: jest.fn(),
  },
};

function setup({ store, query, asPath }) {
  query = query || {
    tab: 'catalog',
    search: 'indica',
    brands: '1/2',
  };

  asPath = asPath || '/buyer/marketplace/catalog?search=indica';

  const mockRouter = { query, asPath };

  const component = <Catalog store={store} router={mockRouter} />;
  const wrapper = shallow(component);

  return wrapper;
}

describe('Marketplace Catalog', () => {
  it('should render the catalog page', () => {
    const wrapper = setup({ store: mockStore });
    expect(wrapper.exists()).toEqual(true);
  });

  it('should fetch filters data on mount', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.fetchFiltersData = jest.fn();
    instance.componentDidMount();
    expect(instance.fetchFiltersData).toHaveBeenCalled();
  });

  it('should fetch categories and brands filter data', () => {
    setup({ store: mockStore });
    expect(mockStore.buyerSettings.getDepartments).toHaveBeenCalled();
    expect(mockStore.buyerSettings.getBrands).toHaveBeenCalled();
  });

  it('should search for products when route changes', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.searchProducts = jest.fn();
    instance.prevRoute = '/buyer/marketplace/catalog';
    instance.componentDidUpdate();
    expect(instance.searchProducts).toHaveBeenCalled();
    expect(instance.prevRoute).toEqual(
      '/buyer/marketplace/catalog?search=indica',
    );
  });

  it('should not perform search with no route change', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.searchProducts = jest.fn();
    instance.prevRoute = '/buyer/marketplace/catalog?search=indica';
    instance.componentDidUpdate();
    expect(instance.searchProducts).not.toHaveBeenCalled();
    expect(instance.prevRoute).toEqual(
      '/buyer/marketplace/catalog?search=indica',
    );
  });

  it('should search the catalog', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.searchProducts();
    expect(mockStore.buyerProducts.searchCatalog).toHaveBeenCalledWith(
      'indica',
    );
  });

  it('should clear all filters', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.clearAll();
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
      search: 'indica',
    });
    pushRoute.mockRestore();
  });

  it('should not include search query param if no value', () => {
    const wrapper = setup({
      store: mockStore,
      query: {
        tab: 'catalog',
        brands: '1/2',
      },
    });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.clearAll();
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
    });
    pushRoute.mockRestore();
  });

  it('should map categories data into tree shape', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    expect(instance.getCategories()).toEqual(mockMappedCategories);
  });

  it('should render the category carousels', () => {
    const wrapper = setup({
      store: mockStore,
      asPath: '/buyer/marketplace/catalog',
    });
    expect(wrapper.find(CategoryCarousels).exists()).toEqual(true);
    expect(wrapper.find(Products).exists()).toEqual(false);
    expect(wrapper.find(NoResults).exists()).toEqual(false);
  });

  it('should render the products grid', () => {
    const wrapper = setup({ store: mockStore });
    expect(wrapper.find(CategoryCarousels).exists()).toEqual(false);
    expect(wrapper.find(Products).exists()).toEqual(true);
    expect(wrapper.find(NoResults).exists()).toEqual(false);
  });

  it('should render no results', () => {
    const thisStore = {
      ...mockStore,
      buyerProducts: {
        searchResults: null,
      },
    };
    const wrapper = setup({ store: thisStore });
    expect(wrapper.find(CategoryCarousels).exists()).toEqual(false);
    expect(wrapper.find(Products).exists()).toEqual(false);
    expect(wrapper.find(NoResults).exists()).toEqual(true);
  });

  it('should go to the product detail page when card is clicked', () => {
    const wrapper = setup({ store: mockStore });
    const push = jest.spyOn(Router, 'push').mockReturnValue();
    wrapper.find(ProductCard).simulate('click');
    expect(push).toHaveBeenCalledWith(
      '/buyer/marketplace/catalog/product/1234',
    );
    push.mockRestore();
  });
});
