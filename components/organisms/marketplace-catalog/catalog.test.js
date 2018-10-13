import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import { mockCategories, mockMappedCategories } from 'lib/mocks/categories';
import { mockBrands } from 'lib/mocks/brands';
import { mockProduct } from 'lib/mocks/search-results';
import ProductCard from 'components/molecules/product-card';
import { Icons } from '@ghostgroup/ui';
import PagingControls from 'components/molecules/paging-controls';
import { Catalog } from './';
import CategoryCarousels from './carousels';
import { Products, NoResults, Pagination } from './styles';

const mockStore = {
  buyerSettings: {
    getDepartments: jest.fn(),
    getBrands: jest.fn(),
    departments: mockCategories,
    brands: mockBrands,
  },
  buyerProducts: {
    searchResults: [mockProduct],
    searchResultsLoading: false,
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
    expect(mockStore.buyerProducts.searchCatalog).toHaveBeenCalledWith({
      tab: 'catalog',
      search: 'indica',
      brands: '1/2',
      page_size: 96,
      page: 1,
    });
  });

  it('should paginate', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.goToPage(3);
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
      search: 'indica',
      brands: '1/2',
      page: 3,
    });
    pushRoute.mockRestore();
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
    expect(
      wrapper
        .find(NoResults)
        .dive()
        .text()
        .includes('No Results Found'),
    ).toEqual(true);
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

  it('should render the loader when loading', () => {
    const thisStore = {
      ...mockStore,
      buyerProducts: {
        searchResultsLoading: true,
      },
    };
    const wrapper = setup({ store: thisStore });
    expect(wrapper.find(CategoryCarousels).exists()).toEqual(false);
    expect(wrapper.find(Products).exists()).toEqual(false);
    expect(wrapper.find(Icons.Spinner).exists()).toEqual(true);
  });

  it('should display pagination when product count is greater than page size', () => {
    const thisStore = {
      ...mockStore,
      buyerProducts: {
        searchResults: [1, 2, 3].map(() => mockProduct),
        searchResultsTotalItems: 10,
      },
    };
    const thisQuery = {
      page: 2,
      page_size: 3,
    };
    const wrapper = setup({ store: thisStore, query: thisQuery });
    expect(wrapper.find(PagingControls).exists()).toEqual(true);
  });

  it('should not display pagination when product count is less than or equal to page size', () => {
    const thisStore = {
      ...mockStore,
      buyerProducts: {
        searchResults: [1, 2, 3].map(() => mockProduct),
        searchResultsTotalItems: 3,
      },
    };
    const thisQuery = {
      page: 1,
      page_size: 10,
    };
    const wrapper = setup({ store: thisStore, query: thisQuery });
    expect(wrapper.find(PagingControls).exists()).toEqual(false);
  });

  it('should display the product count range for more than 1 product on page', () => {
    const thisStore = {
      ...mockStore,
      buyerProducts: {
        searchResults: [1, 2, 3].map(() => mockProduct),
        searchResultsTotalItems: 3,
      },
    };
    const thisQuery = {
      page: 1,
      page_size: 10,
    };
    const wrapper = setup({ store: thisStore, query: thisQuery });
    expect(
      wrapper
        .find(Pagination)
        .dive()
        .text(),
    ).toEqual('Showing 1-3 of 3 Products');
  });

  it('should display the product count for only one product on page', () => {
    const thisStore = {
      ...mockStore,
      buyerProducts: {
        searchResults: [1].map(() => mockProduct),
        searchResultsTotalItems: 9,
      },
    };
    const thisQuery = {
      page: 3,
      page_size: 4,
    };
    const wrapper = setup({ store: thisStore, query: thisQuery });
    expect(
      wrapper
        .find(Pagination)
        .dive()
        .text(),
    ).toEqual('Showing 9 of 9 Products<PagingControls />');
  });
});
