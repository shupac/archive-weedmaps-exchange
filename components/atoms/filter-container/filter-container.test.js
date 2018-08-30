import React from 'react';
import { mount } from 'enzyme';
import FilterContainer from './';

describe('FilterContainer', () => {
  it('should render Filter Container', () => {
    const component = mount(
      <FilterContainer collapsed title="Title" filters="All filters" />,
    );
    expect(component.exists()).toEqual(true);
  });
});
