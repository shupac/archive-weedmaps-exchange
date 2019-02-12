import React from 'react';
import { shallow } from 'enzyme';
import { observable } from 'mobx';
import { Router } from 'lib/routes';
import { mockCategories, mockEmptyCategories } from 'lib/mocks/categories';
import {
  mockCategoryProducts,
  mockCategoryCard,
} from 'lib/mocks/category-products';
import Loader from 'components/atoms/loader';
import SearchBar from 'components/molecules/search-bar';
import EmptyState from 'components/atoms/empty-state';
import BuyerProducts from 'lib/data-access/stores/buyer-products';
import { Discover } from './';

const mockStore = {
  buyerSettings: {
    getDepartments: jest.fn(),
    departmentsLoading: false,
    departments: mockCategories,
  },
  buyerProducts: {
    getFeaturedProducts: jest.fn(),
    featuredProducts: mockCategoryCard.data,
    featuredProductsData: mockCategoryProducts,
    setFeaturedProductsData: jest.fn(),
  },
  authStore: observable({
    selectedLocation: {
      id: 1,
    },
  }),
};

const mockLoadingStore = {
  buyerSettings: {
    getDepartments: jest.fn(),
    departmentsLoading: true,
    departments: mockCategories,
  },
  buyerProducts: BuyerProducts.create(),
  authStore: {
    selectedLocation: {
      id: 1,
    },
  },
};

const mockEmptyStore = {
  buyerSettings: {
    getDepartments: jest.fn(),
    departmentsLoading: false,
    departments: mockEmptyCategories,
  },
  buyerProducts: BuyerProducts.create(),
  authStore: {
    selectedLocation: {
      id: 1,
    },
  },
};

const setup = ({ store }) => {
  const component = <Discover store={store} />;
  const wrapper = shallow(component, { disableLifecycleMethods: true });
  return wrapper;
};

describe('Marketplace Discover', () => {
  it('should render the discover page', () => {
    const wrapper = setup({ store: mockStore });
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render category and featured product cards', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.componentDidMount();
    const catCard = wrapper.find('CategoryCard');
    const productCard = wrapper.find('ProductCard');
    expect(catCard.exists()).toEqual(true);
    expect(productCard.exists()).toEqual(true);
  });

  it('should fetch department data on mount', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.fetchDepartmentData = jest.fn();
    instance.componentDidMount();
    expect(instance.fetchDepartmentData).toHaveBeenCalled();
  });

  it('should fetch featured products data on mount', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.fetchFeaturedProductsData = jest.fn();
    instance.componentDidMount();
    expect(instance.fetchFeaturedProductsData).toHaveBeenCalled();
  });

  it('disposes of the reaction when unmounting', () => {
    const wrapper = setup({ store: mockStore });
    const dispose = jest.spyOn(wrapper.instance(), 'dispose');
    wrapper.unmount();
    expect(dispose).toHaveBeenCalled();
  });

  it('should render the searchbar', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.componentDidMount();
    const searchBar = wrapper.find(SearchBar);
    expect(searchBar.exists()).toEqual(true);
  });

  it('should remain loading if the component is not mounted', () => {
    const wrapper = setup({ store: mockStore });
    expect(wrapper.find(Loader).exists()).toEqual(true);
  });

  it('should remain loading if the departments is still loading', () => {
    const wrapper = setup({ store: mockLoadingStore });
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(wrapper.find(Loader).exists()).toEqual(true);
  });

  it('should refetch data when selected location changes', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    const fetchDepartmentData = jest
      .spyOn(instance, 'fetchDepartmentData')
      .mockReturnValue();
    const fetchFeaturedProductsData = jest
      .spyOn(instance, 'fetchFeaturedProductsData')
      .mockReturnValue();
    mockStore.authStore.selectedLocation = { id: 2 };
    expect(fetchDepartmentData).toHaveBeenCalled();
    expect(fetchFeaturedProductsData).toHaveBeenCalled();
    fetchDepartmentData.mockRestore();
  });

  it('should call goToProduct when ProductCard is clicked', () => {
    const mockedRouter = { push: () => {} };
    Router.router = mockedRouter;
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    const goToProduct = jest.spyOn(instance, 'goToProduct');
    instance.componentDidMount();
    wrapper
      .find('ProductCard')
      .first()
      .simulate('click');
    expect(goToProduct).toHaveBeenCalledWith('uuid');
  });

  describe('if categories are empty', () => {
    it('should render No Results if categories are empty', () => {
      const wrapper = setup({ store: mockEmptyStore });
      const instance = wrapper.instance();
      instance.componentDidMount();
      const noResults = wrapper.find(EmptyState);
      expect(noResults.exists()).toEqual(true);
    });
  });
});
