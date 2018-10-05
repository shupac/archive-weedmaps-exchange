import React from 'react';
import { mount } from 'enzyme';
import FilterContainer from './';
import { FilterName, FiltersLabel, Header } from './styles';

describe('FilterContainer', () => {
  it('should render Filter Container', () => {
    const component = <FilterContainer collapsed title="Title" filters="All" />;
    const wrapper = mount(component);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(FilterName).text()).toEqual('Title');

    const filters = wrapper.find(FiltersLabel).text();
    expect(filters.includes('All')).toEqual(true);
  });

  it('should set collapse state on header click', () => {
    const component = <FilterContainer collapsed title="Title" filters="All" />;
    const wrapper = mount(component);
    const instance = wrapper.instance();
    const setState = jest.spyOn(instance, 'setState').mockReturnValue();
    wrapper.find(Header).simulate('click');
    expect(setState).toHaveBeenCalledWith({
      collapsed: false,
    });
    setState.mockRestore();
  });

  it('should set content height when children change', () => {
    const component = <FilterContainer collapsed title="Title" filters="All" />;
    const wrapper = mount(component);
    const instance = wrapper.instance();
    instance.setContentHeight = jest.fn();
    instance.componentDidUpdate({
      children: [],
    });
    expect(instance.setContentHeight).toHaveBeenCalled();
  });
});
