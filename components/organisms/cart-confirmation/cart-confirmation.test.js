import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import Breadcrumbs from 'components/molecules/breadcrumbs/index';
import OrderSummary from 'components/molecules/cart-order-summary';
import Loader from 'components/atoms/loader';
import BuyerCart from 'lib/data-access/stores/buyer-cart';
import mockCartOrder from 'lib/mocks/cart-order';
import { CartConfirmation } from './';
import { POWrapper, POButton } from './styles';

function setup(orderId) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockCartOrder })),
  };

  const mockBuyerCartStore = BuyerCart.create(
    {
      cartOrderData: mockCartOrder,
    },
    {
      client: mockFetchClient,
    },
  );

  const mockStore = { buyerCart: mockBuyerCartStore };
  const component = <CartConfirmation store={mockStore} orderId={orderId} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper, mockStore };
}

describe('Cart Confirmation Page', () => {
  it('should render the Breadcrumbs', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Breadcrumbs).exists()).toEqual(true);
  });

  it('should render loader if no order data', () => {
    const mockBuyerCartStore = BuyerCart.create();
    const mockStore = { buyerCart: mockBuyerCartStore };
    const component = <CartConfirmation store={mockStore} />;
    const wrapper = shallow(component, {
      disableLifecycleMethods: true,
    });
    expect(wrapper.find(Loader).exists()).toEqual(true);
  });

  it('should fetch order on mount', () => {
    const { wrapper, mockStore } = setup(mockCartOrder.id);
    const fetchCartOrder = jest.spyOn(mockStore.buyerCart, 'fetchCartOrder');
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(fetchCartOrder).toHaveBeenCalledWith(mockCartOrder.id);
    fetchCartOrder.mockRestore();
  });

  it('should render the purchase orders', () => {
    const { wrapper } = setup();
    expect(wrapper.find(POWrapper).length).toEqual(3);
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
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    viewButton.simulate('click');
    const orderId = 'b97329d4-a7ae-4c7a-ab5e-4de8aec22f50';
    expect(viewPO).toHaveBeenCalledWith(orderId);
    expect(pushRoute).toHaveBeenCalledWith('buyerOrder', { orderId });
    viewPO.mockRestore();
    pushRoute.mockRestore();
  });

  it('should not render seller address if unavailable', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    expect(instance.renderSellerAddress(null)).toEqual(null);
  });
});
