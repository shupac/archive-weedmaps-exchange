import React from 'react';
import { shallow } from 'enzyme';
import CartError from './';

function setup() {
  const props = {
    availableAmount: 10,
    onResetQuantity: jest.fn(),
    onUpdate: jest.fn(),
    errorType: 'quantity_unavailable',
  };
  const component = <CartError {...props} />;
  const wrapper = shallow(component);
  return { wrapper, props };
}

describe('Cart Error', () => {
  it('should render out the Cart Errors when quantity is unavailable', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find('span').text()).toEqual(' Available Quantity:');
    wrapper.find('a').simulate('click');
    expect(props.onResetQuantity).toHaveBeenCalledWith(10);
  });
  it('should render out the Cart Errors when location is unavailable', () => {
    const props = {
      availableAmount: 10,
      onResetQuantity: jest.fn(),
      onUpdate: jest.fn(),
      errorType: 'location_unavailable',
    };
    const component = <CartError {...props} />;
    const wrapper = shallow(component);
    wrapper.find('a').simulate('click');
    expect(props.onUpdate).toHaveBeenCalledWith(0);
  });
});
