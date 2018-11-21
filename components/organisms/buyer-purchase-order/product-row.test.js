import React from 'react';
import { shallow } from 'enzyme';
import mockPurchaseOrder from 'mocks/purchase-order';
import ProductRow from './product-row';

describe('Buyer Purchase Order Page', () => {
  it('should render the component', () => {
    const orderItem = mockPurchaseOrder.orderItems[0];
    const wrapper = shallow(<ProductRow item={orderItem} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render the top level category', () => {
    const orderItem = {
      ...mockPurchaseOrder.orderItems[0],
      categories: {
        parent: 'Flower',
      },
    };
    const wrapper = shallow(<ProductRow item={orderItem} />);
    expect(wrapper.exists()).toEqual(true);
  });
});
