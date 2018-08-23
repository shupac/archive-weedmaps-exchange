import React from 'react';
import { mount } from 'enzyme';
import FilterContainer from './';
import { Chevron } from './styles';

describe('FilterContainer', () => {
  it('should render Filter Container', () => {
    const onToggleCollapse = jest.fn();

    const component = mount(
      <FilterContainer collapsed onToggleCollapse={onToggleCollapse} />,
    );
    expect(component.exists()).toEqual(true);
  });

  it('should toggle collapse', () => {
    const onToggleCollapse = jest.fn();

    const component = mount(
      <FilterContainer collapsed onToggleCollapse={onToggleCollapse} />,
    );

    component.find(Chevron).simulate('click');
    expect(onToggleCollapse).toHaveBeenCalled();
  });
});
