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
      {},
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

  it('should render the order header', done => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    instance.componentDidMount();

    setTimeout(() => {
      expect(wrapper.find(OrderHeader).exists()).toEqual(true);
      done();
    }, 0);
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

  it('should handle the print', done => {
    const { wrapper } = setup();
    const print = jest.spyOn(window, 'print').mockReturnValue();
    const instance = wrapper.instance();
    instance.componentDidMount();

    setTimeout(() => {
      wrapper
        .find(ButtonWhiteNoHover)
        .first()
        .simulate('click');
      expect(print).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should show Reason for Cancelation if status is canceled', () => {
    const { wrapper, mockStore } = setup();
    mockStore.buyerOrders.setOrderData({
      ...mockPurchaseOrder,
      status: 'canceled',
    });
    const reasonLabel = wrapper
      .find('th')
      .last()
      .text();
    expect(reasonLabel).toEqual('Reason for Cancelation');
  });

  it('should dispose on unmount', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const dispose = jest.spyOn(instance, 'dispose');
    instance.componentWillUnmount();
    expect(dispose).toHaveBeenCalled();
    dispose.mockRestore();
  });

  it('should not update order data if modal is transitioning', done => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    instance.componentDidMount();

    setTimeout(() => {
      mockStore.uiStore.openModal('testModal');
    }, 0);

    setTimeout(() => {
      mockStore.buyerOrders.setOrderData({
        ...mockPurchaseOrder,
        status: 'test',
      });
      mockStore.uiStore.closeModal();
    }, 400);

    setTimeout(() => {
      expect(instance.orderData.status).toEqual('not_started');
      done();
    }, 410);
  });

  it('should open SellerDetailsModal when seller is clicked', done => {
    const { wrapper, mockStore } = setup();
    const openModal = jest.spyOn(mockStore.uiStore, 'openModal');
    const instance = wrapper.instance();
    instance.componentDidMount();

    setTimeout(() => {
      wrapper.find('StyledSellerName').simulate('click');
      expect(openModal).toHaveBeenCalledWith('sellerDetailsModal');
      done();
    }, 0);
  });
});
