import React from 'react';
import { shallow } from 'enzyme';
import FilterPanel from './';
import { Wrapper, Header, Title, Clear } from './styles';

describe('FilterPanel', () => {
  it('should render the filter panel', () => {
    const onClearAll = jest.fn();
    const component = <FilterPanel onClearAll={onClearAll} />;
    const wrapper = shallow(component);

    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(Wrapper).exists()).toEqual(true);
    expect(wrapper.find(Header).exists()).toEqual(true);
    expect(wrapper.find(Title).exists()).toEqual(true);
    expect(wrapper.find(Clear).exists()).toEqual(true);
  });

  it('should handle clear all click', () => {
    const onClearAll = jest.fn();
    const component = <FilterPanel onClearAll={onClearAll} />;
    const wrapper = shallow(component);

    wrapper.find(Clear).simulate('click');
    expect(onClearAll).toHaveBeenCalled();
  });
});
