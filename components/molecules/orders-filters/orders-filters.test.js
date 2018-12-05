import React from 'react';
import { shallow } from 'enzyme';
import { OrdersFilters } from './';

function setup() {
  const props = {
    setSearch: jest.fn(),
    setDateRange: jest.fn(),
    setFilter: jest.fn(),
  };
  const tree = shallow(<OrdersFilters {...props} />);
  const instance = tree.instance();

  return { tree, instance, props };
}

describe('Orders Filters', () => {
  it('should render the component', () => {
    const { tree } = setup();
    expect(tree.exists()).toEqual(true);
  });
  it('will set the status filter', () => {
    const { instance, props } = setup();
    const selections = [{ text: 'NOT STARTED', value: 'not_started' }];
    instance.onStatusFilter(selections);
    expect(props.setFilter).toHaveBeenCalledWith('status', ['not_started']);
  });
});
