import React from 'react';
import { shallow } from 'enzyme';
import BuyerPurchaseOrder from './';
import { PurchaseOrderHeader } from './styles';

function setup(orderId = 'b97329d4-a7ae-4c7a-ab5e-4de8aec22f50') {
  const mockStore = {};
  const component = <BuyerPurchaseOrder store={mockStore} orderId={orderId} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper, mockStore };
}

describe('Buyer Purchase Order Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render the order header', () => {
    const { wrapper } = setup();
    expect(
      wrapper
        .dive()
        .find(PurchaseOrderHeader)
        .exists(),
    ).toEqual(true);
  });
});
