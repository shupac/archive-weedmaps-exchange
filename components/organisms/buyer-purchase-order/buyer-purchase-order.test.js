import React from 'react';
import { shallow } from 'enzyme';
import BuyerOrdersStore from 'lib/data-access/stores/buyer-orders';
import UiStore from 'lib/data-access/stores/ui';
import { ButtonWhiteNoHover } from 'components/atoms/button';
import mockPurchaseOrder from 'mocks/purchase-order';
import Loader from 'components/atoms/loader';
import { BuyerPurchaseOrder } from './';
import { OrderHeader } from './styles';

const orderId = 'b97329d4-a7ae-4c7a-ab5e-4de8aec22f50';

function setup() {
  const mockFetchClient = {
    fetch: jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: mockPurchaseOrder })),
  };

  const mockStore = {
    buyerOrders: BuyerOrdersStore.create(
      {
        orderData: mockPurchaseOrder,
      },
      {
        client: mockFetchClient,
      },
    ),
    uiStore: UiStore.create(),
  };
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
        .find(OrderHeader)
        .exists(),
    ).toEqual(true);
  });

  it('should fetch order on mount', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    const fetchOrder = jest.spyOn(mockStore.buyerOrders, 'fetchOrder');
    instance.componentDidMount();
    expect(fetchOrder).toHaveBeenCalledWith(orderId);
    fetchOrder.mockRestore();
  });

  it('should show loader if no data', () => {
    const { wrapper, mockStore } = setup();
    mockStore.buyerOrders.setOrderData(undefined);
    expect(wrapper.find(Loader).exists()).toEqual(true);
  });

  it('should handle the print', () => {
    const { wrapper } = setup();
    const print = jest.spyOn(window, 'print');
    wrapper
      .find(ButtonWhiteNoHover)
      .first()
      .simulate('click');
    expect(print).toHaveBeenCalled();
  });

  it('should show Reason for Cancellation if status is cancelled', () => {
    const { wrapper, mockStore } = setup();
    mockStore.buyerOrders.setOrderData({
      ...mockPurchaseOrder,
      status: 'canceled',
    });
    const reasonLabel = wrapper
      .find('th')
      .last()
      .text();
    expect(reasonLabel).toEqual('Reason for Cancellation');
  });

  it('should call openCancelModal when cancel button is clicked', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const openCancelModal = jest.spyOn(instance, 'openCancelModal');
    wrapper
      .find(ButtonWhiteNoHover)
      .at(1)
      .simulate('click');
    expect(openCancelModal).toHaveBeenCalled();
    openCancelModal.mockRestore();
  });

  it('should open the cancel order modal', () => {
    const { wrapper, mockStore } = setup();
    const openModal = jest.spyOn(mockStore.uiStore, 'openModal');
    const instance = wrapper.instance();
    instance.openCancelModal();
    expect(openModal).toHaveBeenCalled();
    openModal.mockRestore();
  });

  it('should handle submit cancel order', async () => {
    const { wrapper, mockStore } = setup();
    const closeModal = jest.spyOn(mockStore.uiStore, 'closeModal');
    const updateOrderStatus = jest
      .spyOn(mockStore.buyerOrders, 'updateOrderStatus')
      .mockReturnValue(Promise.resolve(true));
    const instance = wrapper.instance();
    await instance.submitCancelOrder('Test');
    expect(updateOrderStatus).toHaveBeenCalledWith(
      mockPurchaseOrder.id,
      'canceled',
      'Test',
    );
    expect(closeModal).toHaveBeenCalled();
    closeModal.mockRestore();
    updateOrderStatus.mockRestore();
  });

  it('should not close the modal if cancel unsuccessful', async () => {
    const { wrapper, mockStore } = setup();
    const closeModal = jest.spyOn(mockStore.uiStore, 'closeModal');
    jest
      .spyOn(mockStore.buyerOrders, 'updateOrderStatus')
      .mockReturnValue(Promise.resolve(false));
    const instance = wrapper.instance();
    await instance.submitCancelOrder('Test');
    expect(closeModal).not.toHaveBeenCalled();
    closeModal.mockRestore();
  });
});
