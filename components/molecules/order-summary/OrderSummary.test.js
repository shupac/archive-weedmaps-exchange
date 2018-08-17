import React from 'react';
import { shallow } from 'enzyme';
import OrderSummary from './';

const mockData = {
  quantity: 123,
  subTotal: 100,
  shipping: 10,
  total: 110,
};

describe('Order Summary', () => {
  it('should render the Order Summary Component', () => {
    const component = shallow(<OrderSummary {...mockData} />);
    expect(
      component
        .find('[data-test-id="subtotal"]')
        .find('span')
        .text(),
    ).toEqual('$100.00');
    expect(
      component
        .find('[data-test-id="shipping-fee"]')
        .find('span')
        .text(),
    ).toEqual('$10.00');
    expect(
      component
        .find('[data-test-id="order-total"]')
        .find('span')
        .text(),
    ).toEqual('$110.00');
  });
});
