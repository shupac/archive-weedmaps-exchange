import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
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
      category: 'indica',
    },
  },
};

let component = shallow(<SearchBar {...props} />, {
  disableLifecycleMethods: true,
});

describe('SearchBar', () => {
  it('should render out the search bar', () => {
    expect(component.find(SearchBarWrapper).exists()).toEqual(true);
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
  it('should handle onKeyDown', () => {
    const instance = component.instance();
    const handleSearch = jest.spyOn(instance, 'handleSearch').mockReturnValue();
    instance.onKeyDown({ key: 'Enter', preventDefault: jest.fn() });
    expect(handleSearch).toHaveBeenCalled();
  });
  it('should handle handleSearch', () => {
    component = shallow(<SearchBar {...props} />, {
      disableLifecycleMethods: true,
    });
    const instance = component.instance();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    instance.handleSearch();
    expect(pushRoute).toHaveBeenCalledWith('marketplace', {
      category: 'indica',
      tab: 'catalog',
    });
  });
});
