import React from 'react';
import { shallow } from 'enzyme';
import { Select } from '@ghostgroup/ui';
import {
  SearchBarWrapper,
  SelectWrapper,
  SearchIcon,
  SearchInputText,
} from './styles';
import SearchBar from './';

describe('Search Bar', () => {
  it('should render the search bar', () => {
    const component = shallow(<SearchBar />);
    expect(component.find(SearchBarWrapper).length).toEqual(1);
    expect(component.find(SelectWrapper).length).toEqual(1);
    expect(component.find(Select).length).toEqual(1);
    expect(component.find(SearchIcon).length).toEqual(1);
    expect(component.find(SearchInputText).length).toEqual(1);
  });
  it('should handle the handleSearchInputChange', () => {
    const event = { target: { value: 'changed' } };
    const state = { searchValue: '' };
    const handleSearchInputChange = jest.fn();

    const component = shallow(
      <SearchBar onChange={handleSearchInputChange} {...state} />,
    );
    component.find(SearchInputText).simulate('change', event);
    expect(component.state('searchValue')).toEqual('changed');
  });
  it('should handle the handleSelectChange', () => {
    const state = { categorySelected: { text: 'All', value: 'all' } };
    const handleSelectChange = jest.fn();

    const component = shallow(
      <SearchBar onChange={handleSelectChange} {...state} />,
    );
    expect(component.state('categorySelected')).toEqual({
      text: 'All',
      value: 'all',
    });
  });
  it('should handle the handleSearchIconClick', () => {
    const dispatch = jest.fn();

    const component = shallow(<SearchBar dispatch={dispatch} />);
    const spy = jest.spyOn(component.instance(), 'handleSearch');
    component.instance().forceUpdate();

    component.find(SearchIcon).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
