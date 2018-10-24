import React from 'react';
import { shallow } from 'enzyme';
import mockCart, { mockErrorCart } from 'lib/mocks/cart';
import CartOrderSummary from './';

describe('Order Summary', () => {
  let props;
  props = {
    cart: mockCart,
    onSubmit: jest.fn(),
  };
  it('should render the Order Summary Component', () => {
    const component = shallow(<CartOrderSummary {...props} />);
    expect(
      component
        .find('[data-test-id="subtotal"]')
        .find('span')
        .text(),
    ).toEqual('$93,890.00');
    expect(
      component
        .find('[data-test-id="shipping-fee"]')
        .find('span')
        .text(),
    ).toEqual('--');
    expect(
      component
        .find('[data-test-id="order-total"]')
        .find('span')
        .text(),
    ).toEqual('$93,890.00');
  });
  it('should render error message', () => {
    props = {
      cart: mockErrorCart,
      onSubmit: jest.fn(),
    };
    const component = shallow(<CartOrderSummary {...props} />);
    expect(
      component
        .find('[data-test-id="shipping-fee"]')
        .find('span')
        .text(),
    ).toEqual('$10.00');
    expect(component.find('ErrorMessage').length).toEqual(3);
  });
});
