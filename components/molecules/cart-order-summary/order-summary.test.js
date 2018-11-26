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
    ).toEqual('$108,000.00');
    expect(
      component
        .find('[data-test-id="shipping-fee"]')
        .find('span')
        .text(),
    ).toEqual('$100.00');
    expect(
      component
        .find('[data-test-id="order-total"]')
        .find('span')
        .text(),
    ).toEqual('$108,100.00');
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
    expect(component.find('ErrorMessage').length).toEqual(4);
  });
  it('should render out the error message', () => {
    props = {
      cart: mockErrorCart,
      onSubmit: jest.fn(),
    };
    const component = shallow(<CartOrderSummary {...props} />);
    expect(
      component
        .find('ErrorMessage')
        .first()
        .dive()
        .text(),
    ).toEqual(
      'Seller has a minimum order amount. Please update your cart to continue.',
    );
    expect(
      component
        .find('ErrorMessage')
        .at(1)
        .dive()
        .text(),
    ).toEqual(
      'Some items in your cart no longer have your quantity available. Please update your cart to continue.',
    );
    expect(
      component
        .find('ErrorMessage')
        .at(2)
        .dive()
        .text(),
    ).toEqual(
      'Some items in your cart are no longer in stock. Please update your cart to continue.',
    );
  });
});
