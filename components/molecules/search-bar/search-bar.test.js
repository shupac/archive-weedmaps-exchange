import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import { CATALOG_QUERY_PARAMS } from 'lib/common/constants';
import { SearchBar } from './';
import { SearchBarWrapper } from './styles';

const props = {
  showCategory: true,
  store: {
    buyerSettings: {
      departments: [
        {
          id: '123',
          name: 'departmentName',
        },
      ],
    },
  },
  router: {
    asPath: 'buyer/marketplace/catalog',
    query: {
      search: '',
      categories: 'indica',
    },
  },
  route: 'marketplace',
  routeParams: {
    tab: 'catalog',
  },
  queryParams: CATALOG_QUERY_PARAMS,
};

describe('SearchBar', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SearchBar {...props} />, {
      disableLifecycleMethods: true,
    });
  });

  it('should render out the search bar', () => {
    expect(component.find(SearchBarWrapper).exists()).toEqual(true);
  });

  it('should call updateState on componentDidMount', () => {
    const instance = component.instance();
    instance.updateState = jest.fn();
    instance.componentDidMount();
    expect(instance.updateState).toHaveBeenCalled();
  });

  it('should handle updateState', () => {
    const instance = component.instance();
    const setState = jest.spyOn(instance, 'setState').mockReturnValue();
    instance.updateState();
    expect(setState).toHaveBeenCalledWith({
      categorySelected: { text: 'All', value: 'all' },
      searchValue: '',
    });
  });

  it('should update state when route changes', () => {
    const nextProps = {
      ...props,
      router: {
        asPath: 'buyer/marketplace/catalog?search=orange',
        query: {
          search: '',
          categories: 'indica',
        },
      },
    };

    const instance = component.instance();
    instance.updateState = jest.fn();
    instance.componentDidUpdate(nextProps);
    expect(instance.updateState).toHaveBeenCalled();
  });

  it('should not update state when route does not change', () => {
    const instance = component.instance();
    instance.updateState = jest.fn();
    instance.componentDidUpdate(props);
    expect(instance.updateState).not.toHaveBeenCalled();
  });

  it('should handle getOptions', () => {
    const instance = component.instance();
    expect(instance.getOptions()).toEqual([
      { text: 'All', value: 'all' },
      { text: 'departmentName', value: '123' },
    ]);
  });

  it('should handle handleSelectChange', () => {
    const instance = component.instance();
    const setState = jest.spyOn(instance, 'setState').mockReturnValue();
    instance.handleSelectChange({ text: 'Indica', value: 'indica' });
    expect(setState).toHaveBeenCalledWith({
      categorySelected: { text: 'Indica', value: 'indica' },
    });
  });

  it('should handle handleSearchInputChange', () => {
    const instance = component.instance();
    const setState = jest.spyOn(instance, 'setState').mockReturnValue();
    instance.handleSearchInputChange({ target: { value: 'thc' } });
    expect(setState).toHaveBeenCalledWith({ searchValue: 'thc' });
  });

  it('should handle enter key', () => {
    const instance = component.instance();
    const handleSearch = jest.spyOn(instance, 'handleSearch').mockReturnValue();
    instance.onKeyDown({ key: 'Enter', preventDefault: jest.fn() });
    expect(handleSearch).toHaveBeenCalled();
  });

  it('should handle non-enter key', () => {
    const instance = component.instance();
    const handleSearch = jest.spyOn(instance, 'handleSearch').mockReturnValue();
    instance.onKeyDown({ key: 'a', preventDefault: jest.fn() });
    expect(handleSearch).not.toHaveBeenCalled();
  });

  it('should handle handleSearch', () => {
    const instance = component.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.handleSearch();
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      categories: 'indica',
      tab: 'catalog',
    });
  });

  it('should include searchable query params', () => {
    const thisProps = {
      ...props,
      router: {
        ...props.router,
        query: {
          search: '',
          categories: 'indica',
          brands: 'brand1/brand2',
          availability: 'inStock',
          minPrice: '2.00',
          maxPrice: '5.00',
        },
      },
    };
    const wrapper = shallow(<SearchBar {...thisProps} />, {
      disableLifecycleMethods: true,
    });

    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.state = {
      searchValue: 'orange',
      categorySelected: {
        value: 'concentrate',
        text: 'Concentrate',
      },
    };
    instance.handleSearch();
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      tab: 'catalog',
      categories: 'concentrate',
      search: 'orange',
      brands: 'brand1/brand2',
      availability: 'inStock',
      minPrice: '2.00',
      maxPrice: '5.00',
    });
  });

  it('should exclude non searchable query params', () => {
    const thisProps = {
      ...props,
      router: {
        ...props.router,
        asPath: 'buyer/marketplace/catalog?foo=bar',
      },
    };
    const wrapper = shallow(<SearchBar {...thisProps} />, {
      disableLifecycleMethods: true,
    });

    const instance = wrapper.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.handleSearch();
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      categories: 'indica',
      tab: 'catalog',
    });
  });

  it('should handle input and category change', () => {
    const instance = component.instance();
    instance.state = {
      searchValue: 'orange',
      categorySelected: {
        value: 'concentrate',
        text: 'Concentrate',
      },
    };
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    component.update();
    instance.handleSearch();
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      search: 'orange',
      tab: 'catalog',
      categories: 'concentrate',
    });
  });
});
