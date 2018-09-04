import React from 'react';
import { mount } from 'enzyme';
import FilterContainer from './';
import { FilterName, FiltersLabel } from './styles';

describe('FilterContainer', () => {
  it('should render Filter Container', () => {
    const component = <FilterContainer collapsed title="Title" filters="All" />;
    const wrapper = mount(component);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(FilterName).text()).toEqual('Title');

    const filters = wrapper.find(FiltersLabel).text();
    expect(filters.includes('All')).toEqual(true);
  });
});
