// @flow
import React from 'react';
import { shallow } from 'enzyme';
import mockPurchaseOrder from 'mocks/purchase-order';
import mockPurchaseOrders from 'mocks/purchase-orders';
import RootStore from 'lib/data-access/stores';
import UiStore from 'lib/data-access/stores/ui';
import SellerOrdersStore from 'lib/data-access/stores/seller-orders';
import { SellerOrdersPage } from 'pages/seller-orders';

function setup(mockData) {
  const mockRouter = jest.genMockFromModule('next/router');
  mockRouter.query = {
    orderId: '123',
  };

  const mockStore = {
    ...RootStore,
    uiStore: UiStore.create(),
    sellerOrders: SellerOrdersStore.create({
      orderData: mockPurchaseOrder,
      ordersList: mockPurchaseOrders,
      ...mockData,
    }),
  };

  const wrapper = shallow(
    <SellerOrdersPage store={mockStore} router={mockRouter} />,
    {
      disableLifecycleMethods: true,
    },
  );
  const instance = wrapper.instance();
  return { wrapper, instance, mockStore, mockRouter };
}

describe('Seller Purchase Orders Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should open cancel order modal', async done => {
    const { instance, mockStore } = setup();
    const { uiStore, sellerOrders } = mockStore;

    const cancelOrder = jest
      .spyOn(sellerOrders, 'cancelOrder')
      .mockReturnValue();
    const openModal = jest.spyOn(uiStore, 'openModal').mockReturnValue();

    await instance.openCancelModal('foo');

    expect(cancelOrder).toHaveBeenCalledWith('foo');
    expect(openModal).toHaveBeenCalledWith('cancelOrder');
    done();
  });

  it('should close cancel order modal', () => {
    const { instance, mockStore } = setup();
    const { uiStore, sellerOrders } = mockStore;

    const cancelOrder = jest
      .spyOn(sellerOrders, 'cancelOrder')
      .mockReturnValue();
    const closeModal = jest.spyOn(uiStore, 'closeModal').mockReturnValue();

    instance.closeCancelModal();

    expect(cancelOrder).toHaveBeenCalledWith(null);
    expect(closeModal).toHaveBeenCalled();
  });

  it('should submit cancel order modal successfully', async done => {
    const { instance, mockStore } = setup();
    const { sellerOrders } = mockStore;
    sellerOrders.setCancelOrderId('123');

    const updateOrderStatus = jest
      .spyOn(sellerOrders, 'updateOrderStatus')
      .mockReturnValue(Promise.resolve(true));
    const closeCancelModal = jest
      .spyOn(instance, 'closeCancelModal')
      .mockReturnValue();
    const fetchOrder = jest.spyOn(sellerOrders, 'fetchOrder').mockReturnValue();
    const refreshOrderInList = jest
      .spyOn(sellerOrders, 'refreshOrderInList')
      .mockReturnValue();

    await instance.submitCancelModal('foo');

    expect(updateOrderStatus).toHaveBeenCalledWith('123', 'canceled', 'foo');
    expect(closeCancelModal).toHaveBeenCalled();
    expect(fetchOrder).toHaveBeenCalledWith('123');
    expect(refreshOrderInList).toHaveBeenCalledWith(sellerOrders.orderData);
    done();
  });

  it('should handle status change if value is cancel', async done => {
    const { instance } = setup();
    const openCancelModal = jest
      .spyOn(instance, 'openCancelModal')
      .mockReturnValue();

    await instance.handleStatusChange('1234')({
      text: 'cancel',
      value: 'cancel',
    });

    expect(openCancelModal).toHaveBeenCalledWith('1234');
    done();
  });

  it('should handle status change if value is not cancel', async done => {
    const { instance, mockStore } = setup();
    const { sellerOrders } = mockStore;

    const updateOrderStatus = jest
      .spyOn(sellerOrders, 'updateOrderStatus')
      .mockReturnValue();

    await instance.handleStatusChange('1234')({
      text: 'in progress',
      value: 'in_progress',
    });

    expect(updateOrderStatus).toHaveBeenCalledWith('1234', 'in_progress');

    done();
  });

  it('should show error toast', () => {
    const { instance, mockStore } = setup();
    const { uiStore } = mockStore;

    const notifyToast = jest.spyOn(uiStore, 'notifyToast').mockReturnValue();

    instance.showErrorToast();

    expect(notifyToast).toHaveBeenCalledWith({
      body: 'The order status may have changed. Please try again.',
      status: 'ERROR',
      title: 'Could not complete request',
    });
  });
});
