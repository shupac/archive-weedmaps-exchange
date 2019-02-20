// @flow
import React from 'react';
import { shallow } from 'enzyme';
import mockPurchaseOrder from 'mocks/purchase-order';
import mockPurchaseOrders from 'mocks/purchase-orders';
import RootStore from 'lib/data-access/stores';
import UiStore from 'lib/data-access/stores/ui';
import BuyerOrdersStore from 'lib/data-access/stores/buyer-orders';
import BuyerCartStore from 'lib/data-access/stores/buyer-cart';
import { BuyerOrdersPage } from 'pages/buyer-orders';

function setup(mockData) {
  const mockRouter = jest.genMockFromModule('next/router');
  mockRouter.query = {
    orderId: '123',
  };

  const mockStore = {
    ...RootStore,
    uiStore: UiStore.create(),
    buyerOrders: BuyerOrdersStore.create({
      orderData: mockPurchaseOrder,
      ordersList: mockPurchaseOrders,
      ...mockData,
    }),
    buyerCart: BuyerCartStore.create(),
  };

  const wrapper = shallow(
    <BuyerOrdersPage store={mockStore} router={mockRouter} />,
    {
      disableLifecycleMethods: true,
    },
  );
  const instance = wrapper.instance();
  return { wrapper, instance, mockStore, mockRouter };
}

describe('Buyer Purchase Orders Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should open cancel order modal', async done => {
    const { instance, mockStore } = setup();
    const { uiStore, buyerOrders } = mockStore;

    const cancelOrder = jest
      .spyOn(buyerOrders, 'cancelOrder')
      .mockReturnValue();
    const refreshOrderInList = jest
      .spyOn(buyerOrders, 'refreshOrderInList')
      .mockReturnValue();
    const openModal = jest.spyOn(uiStore, 'openModal').mockReturnValue();

    await instance.openCancelModal('foo');

    expect(cancelOrder).toHaveBeenCalledWith('foo');
    expect(refreshOrderInList).toHaveBeenCalledWith(buyerOrders.orderData);
    expect(openModal).toHaveBeenCalledWith('cancelOrder');
    done();
  });

  it('should close cancel order modal', () => {
    const { instance, mockStore } = setup();
    const { uiStore, buyerOrders } = mockStore;

    const cancelOrder = jest
      .spyOn(buyerOrders, 'cancelOrder')
      .mockReturnValue();
    const closeModal = jest.spyOn(uiStore, 'closeModal').mockReturnValue();

    instance.closeCancelModal();

    expect(cancelOrder).toHaveBeenCalledWith(null);
    expect(closeModal).toHaveBeenCalled();
  });

  it('should submit cancel order modal successfully', async done => {
    const { instance, mockStore } = setup();
    const { buyerOrders } = mockStore;
    buyerOrders.setCancelOrderId('123');

    const updateOrderStatus = jest
      .spyOn(buyerOrders, 'updateOrderStatus')
      .mockReturnValue(Promise.resolve(true));
    const closeCancelModal = jest
      .spyOn(instance, 'closeCancelModal')
      .mockReturnValue();
    const fetchOrder = jest.spyOn(buyerOrders, 'fetchOrder').mockReturnValue();
    const refreshOrderInList = jest
      .spyOn(buyerOrders, 'refreshOrderInList')
      .mockReturnValue();

    await instance.submitCancelModal('foo');

    expect(updateOrderStatus).toHaveBeenCalledWith('123', 'canceled', 'foo');
    expect(closeCancelModal).toHaveBeenCalled();
    expect(fetchOrder).toHaveBeenCalledWith('123');
    expect(refreshOrderInList).toHaveBeenCalledWith(buyerOrders.orderData);
    done();
  });

  it('should handle unsuccessful cancel order modal submission', async done => {
    const { instance, mockStore } = setup();
    const { buyerOrders } = mockStore;
    buyerOrders.setCancelOrderId('123');

    const updateOrderStatus = jest
      .spyOn(buyerOrders, 'updateOrderStatus')
      .mockReturnValue(Promise.resolve(false));
    const closeCancelModal = jest
      .spyOn(instance, 'closeCancelModal')
      .mockReturnValue();
    const fetchOrder = jest.spyOn(buyerOrders, 'fetchOrder').mockReturnValue();
    const refreshOrderInList = jest
      .spyOn(buyerOrders, 'refreshOrderInList')
      .mockReturnValue();

    await instance.submitCancelModal('foo');

    expect(updateOrderStatus).toHaveBeenCalledWith('123', 'canceled', 'foo');
    expect(closeCancelModal).not.toHaveBeenCalled();
    expect(fetchOrder).toHaveBeenCalledWith('123');
    expect(refreshOrderInList).toHaveBeenCalledWith(buyerOrders.orderData);
    done();
  });

  it('should handle successful reorder', async done => {
    const { instance, mockStore } = setup();
    const { uiStore, buyerOrders, buyerCart } = mockStore;

    const response = { itemsAdded: 1 };
    const reorder = jest
      .spyOn(buyerOrders, 'reorder')
      .mockReturnValue(Promise.resolve(response));
    const notifyToast = jest.spyOn(uiStore, 'notifyToast').mockReturnValue();
    const fetchCart = jest.spyOn(buyerCart, 'fetchCart').mockReturnValue();

    await instance.reorder('foo');

    expect(reorder).toHaveBeenCalledWith('foo');
    expect(notifyToast).toHaveBeenCalledWith({
      autoDismiss: 4000,
      link: {
        label: 'VIEW CART',
        route: '/buyer/cart',
      },
      status: 'SUCCESS',
      title: 'You added 1 item to your cart',
    });
    expect(fetchCart).toHaveBeenCalled();
    done();
  });

  it('should handle unsuccessful reorder', async done => {
    const { instance, mockStore } = setup();
    const { uiStore, buyerOrders, buyerCart } = mockStore;

    const response = false;
    const reorder = jest
      .spyOn(buyerOrders, 'reorder')
      .mockReturnValue(Promise.resolve(response));
    const notifyToast = jest.spyOn(uiStore, 'notifyToast').mockReturnValue();
    const fetchCart = jest.spyOn(buyerCart, 'fetchCart').mockReturnValue();

    await instance.reorder('foo');

    expect(reorder).toHaveBeenCalledWith('foo');
    expect(notifyToast).toHaveBeenCalledWith({
      status: 'ERROR',
      title: 'There were some issues with your request.',
    });
    expect(fetchCart).toHaveBeenCalled();
    done();
  });

  it('should pluralize toast message', () => {
    const { instance } = setup();
    expect(instance.getTitle(2)).toEqual('You added 2 items to your cart');
  });

  it('should handle onCancelOrder for purchase order detail', () => {
    const { wrapper, instance } = setup();
    const openCancelModal = jest
      .spyOn(instance, 'openCancelModal')
      .mockReturnValue();
    const BuyerPurchaseOrder = wrapper.find(
      'inject-BuyerPurchaseOrder-with-store',
    );
    BuyerPurchaseOrder.props().onCancelOrder();
    expect(openCancelModal).toHaveBeenCalledWith('123');
  });

  it('should handle onReorder for purchase order detail', () => {
    const { wrapper, instance } = setup();
    const reorder = jest.spyOn(instance, 'reorder').mockReturnValue();
    const BuyerPurchaseOrder = wrapper.find(
      'inject-BuyerPurchaseOrder-with-store',
    );
    BuyerPurchaseOrder.props().onReorder();
    expect(reorder).toHaveBeenCalledWith('123');
  });
});
