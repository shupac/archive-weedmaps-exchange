import React from 'react';
import { shallow } from 'enzyme';
import BuyerPurchaseOrders from './';

function setup() {
  const mockStore = {};
  const component = <BuyerPurchaseOrders store={mockStore} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper, mockStore };
}

describe('Buyer Purchase Orders Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });
});
