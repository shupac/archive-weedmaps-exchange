import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import { createRootStore } from 'lib/data-access/stores';
import Breadcrumbs from 'components/molecules/breadcrumbs/index';
import OrderSummary from 'components/molecules/cart-order-summary';
import BuyerCart from 'lib/data-access/stores/buyer-cart';
import mockCartOrder from 'lib/mocks/cart-order';
import { CartConfirmation } from './';
import { POWrapper, POButton } from './styles';

function setup() {
  const mockBuyerCartStore = BuyerCart.create({ cartOrder: mockCartOrder });
  const mockStore = createRootStore({ buyerCart: mockBuyerCartStore });

  const component = <CartConfirmation store={mockStore} />;
  const wrapper = shallow(component);
  return { wrapper, mockStore };
}

describe('Cart Confirmation Page', () => {
  it('should render the Breadcrumbs', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Breadcrumbs).exists()).toEqual(true);
  });

  it('should render the purchase orders', () => {
    const { wrapper } = setup();
    expect(wrapper.find(POWrapper).length).toEqual(2);
  });

  it('should render the order summary', () => {
    const { wrapper } = setup();
    expect(wrapper.find(OrderSummary).exists()).toEqual(true);
  });

  it('should naviate to the PO detail page when view button is clicked', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const viewButton = wrapper.find(POButton).first();
    const viewPO = jest.spyOn(instance, 'viewPO');
    const pushRoute = jest.spyOn(Router, 'push').mockReturnValue();
    viewButton.simulate('click');
    expect(viewPO).toHaveBeenCalledWith('4087d1a1-0b91-4aa4-a479-c8d241b3d69a');
    expect(pushRoute).toHaveBeenCalledWith(
      '/buyer/orders/4087d1a1-0b91-4aa4-a479-c8d241b3d69a',
    );
    viewPO.mockRestore();
    pushRoute.mockRestore();
  });
});
