import React from 'react';
import { shallow } from 'enzyme';
import BuyerOrders from 'lib/data-access/stores/buyer-orders';
import UiStore from 'lib/data-access/stores/ui';
import mockPurchaseOrders from 'mocks/purchase-orders';
import TextArea from 'components/atoms/forms/text-area';
import { ButtonPrimary } from 'components/atoms/button';
import CancelOrderModal from './';

function setup(mockData) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockData })),
    put: jest.fn().mockReturnValue(Promise.resolve({ data: mockData })),
  };

  const store = {
    buyerOrders: BuyerOrders.create(
      {
        cancelOrderId: '1234',
      },
      {
        client: mockFetchClient,
      },
    ),
    uiStore: UiStore.create({
      activeModal: 'cancelOrder',
    }),
  };
  const component = <CancelOrderModal store={store} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  }).dive();
  return { wrapper, store };
}

describe('Cancel Order Modal', () => {
  it('should render the component', done => {
    const { wrapper } = setup(mockPurchaseOrders[0]);

    setTimeout(() => {
      expect(wrapper.exists()).toEqual(true);
      done();
    }, 0);
  });

  it('should handle textarea onChange', done => {
    const { wrapper } = setup(mockPurchaseOrders[0]);
    const instance = wrapper.instance();
    const onChange = jest.spyOn(instance, 'onChange');

    setTimeout(() => {
      wrapper
        .find(TextArea)
        .first()
        .simulate('change', { target: { value: 'foo' } });
      expect(onChange).toHaveBeenCalledWith('foo');
      expect(instance.reason).toEqual('foo');
      onChange.mockRestore();
      done();
    }, 0);
  });

  it('should submit the form', done => {
    const { wrapper, store } = setup(mockPurchaseOrders[0]);
    const instance = wrapper.instance();
    const updateOrderStatus = jest
      .spyOn(store.buyerOrders, 'updateOrderStatus')
      .mockReturnValue(Promise.resolve(true));
    const onSubmit = jest.spyOn(instance, 'onSubmit');

    setTimeout(() => {
      wrapper
        .find(TextArea)
        .first()
        .simulate('change', { target: { value: 'foo' } });
      wrapper
        .find(ButtonPrimary)
        .first()
        .simulate('click');
      expect(onSubmit).toHaveBeenCalledWith('foo');
      expect(updateOrderStatus).toHaveBeenCalledWith('1234', 'canceled', 'foo');
      onSubmit.mockRestore();
      updateOrderStatus.mockRestore();
      done();
    }, 0);
  });

  it('should show error text if form is not cancelable', async done => {
    const mockFetchClient = {
      fetch: jest
        .fn()
        .mockReturnValue(Promise.resolve({ data: mockPurchaseOrders[1] })),
    };

    const store = {
      buyerOrders: BuyerOrders.create(
        {},
        {
          client: mockFetchClient,
        },
      ),
      uiStore: UiStore.create(),
    };

    const component = <CancelOrderModal store={store} />;
    const wrapper = shallow(component, {
      disableLifecycleMethods: true,
    });

    const dive = wrapper.dive();

    await store.buyerOrders.cancelOrder('1234');

    setTimeout(() => {
      expect(
        dive
          .find('ErrorText')
          .dive()
          .text(),
      ).toEqual(
        'You may no longer cancel this order because the seller has marked the status as canceled.',
      );
      done();
    }, 0);
  });

  it('should allow form to be edited by default', () => {
    const { wrapper } = setup();
    expect(wrapper.find('TextArea').props().disabled).toEqual(false);
  });

  it('should handle modal close', () => {
    const { wrapper, store } = setup(mockPurchaseOrders[0]);
    const instance = wrapper.instance();
    const cancelOrder = jest.spyOn(store.buyerOrders, 'cancelOrder');
    instance.onClose();
    expect(cancelOrder).toHaveBeenCalled();
    cancelOrder.mockRestore();
  });

  it('should clean up dispose on unmount', () => {
    const { wrapper } = setup(mockPurchaseOrders[0]);
    const instance = wrapper.instance();
    const dispose = jest.spyOn(instance, 'dispose');
    instance.componentWillUnmount();
    expect(dispose).toHaveBeenCalled();
    dispose.mockRestore();
  });

  it('should not update order data will modal is transitioning', done => {
    const { wrapper, store } = setup(mockPurchaseOrders[1]);
    const instance = wrapper.instance();

    store.buyerOrders.setOrderData({
      ...mockPurchaseOrders[1],
    });
    store.uiStore.closeModal();

    setTimeout(() => {
      expect(instance.orderData).toEqual(null);
      done();
    }, 0);
  });

  it('should not close the modal if cancel unsuccessful', done => {
    const { wrapper, store } = setup(mockPurchaseOrders[1]);
    const instance = wrapper.instance();
    const updateOrderStatus = jest
      .spyOn(store.buyerOrders, 'updateOrderStatus')
      .mockReturnValue(Promise.resolve(false));
    const closeModal = jest
      .spyOn(store.uiStore, 'closeModal')
      .mockReturnValue(Promise.resolve(false));

    instance.onSubmit('test');

    setTimeout(() => {
      expect(store.uiStore.closeModal).not.toHaveBeenCalled();
      updateOrderStatus.mockRestore();
      closeModal.mockRestore();
      done();
    }, 0);
  });
});
