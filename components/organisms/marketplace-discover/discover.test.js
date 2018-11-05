import React from 'react';
import { shallow } from 'enzyme';
import { mockCategories, mockEmptyCategories } from 'lib/mocks/categories';
import { Icons } from '@ghostgroup/ui';
import SearchBar from 'components/molecules/search-bar';
import EmptyState from 'components/atoms/empty-state';
import { Discover } from './';
import { NoResults } from './styles';

const mockStore = {
  buyerSettings: {
    getDepartments: jest.fn(),
    departmentsLoading: false,
    departments: mockCategories,
  },
};

const mockLoadingStore = {
  buyerSettings: {
    getDepartments: jest.fn(),
    departmentsLoading: true,
    departments: mockCategories,
  },
};

const mockEmptyStore = {
  buyerSettings: {
    getDepartments: jest.fn(),
    departmentsLoading: false,
    departments: mockEmptyCategories,
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

  it('should render category cards', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.componentDidMount();
    const catCard = wrapper.find('CategoryCard');
    expect(catCard.exists()).toEqual(true);
  });

  it('should fetch department data on mount', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.fetchDepartmentData = jest.fn();
    instance.componentDidMount();
    expect(instance.fetchDepartmentData).toHaveBeenCalled();
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
    const loading = wrapper
      .find(NoResults)
      .dive()
      .find(Icons.Spinner);
    expect(loading.exists()).toEqual(true);
  });

  it('should remain loading if the departments is still loading', () => {
    const wrapper = setup({ store: mockLoadingStore });
    const instance = wrapper.instance();
    instance.componentDidMount();
    const loading = wrapper
      .find(NoResults)
      .dive()
      .find(Icons.Spinner);
    expect(loading.exists()).toEqual(true);
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
