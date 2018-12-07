import React from 'react';
import { shallow } from 'enzyme';
import BuyerOrders from 'lib/data-access/stores/buyer-orders';
import * as MST from 'mobx-state-tree';
import UiStore from 'lib/data-access/stores/ui';
import mockPurchaseOrders from 'mocks/purchase-orders';
import TextArea from 'components/atoms/forms/text-area';
import { ButtonPrimary } from 'components/atoms/button';
import CancelOrderModal from './';

function setup(mockData) {
  const store = {
    buyerOrders: BuyerOrders.create({
      cancelOrderId: '1234',
      orderData: mockData,
    }),
    uiStore: UiStore.create(),
  };
  const component = <CancelOrderModal store={store} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  }).dive();
  return { wrapper, store };
}

describe('Cancel Order Modal', () => {
  it('should render the component', () => {
    const { wrapper } = setup(mockPurchaseOrders[0]);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should handle textarea onChange', () => {
    const { wrapper } = setup(mockPurchaseOrders[0]);
    const instance = wrapper.instance();
    const onChange = jest.spyOn(instance, 'onChange');
    wrapper
      .find(TextArea)
      .first()
      .simulate('change', { target: { value: 'foo' } });
    expect(onChange).toHaveBeenCalledWith('foo');
    expect(instance.reason).toEqual('foo');
    onChange.mockRestore();
  });

  it('should submit the form', () => {
    const { wrapper, store } = setup(mockPurchaseOrders[0]);
    const instance = wrapper.instance();
    const getParent = jest.spyOn(MST, 'getParent').mockReturnValue(store);
    const updateOrderStatus = jest
      .spyOn(store.buyerOrders, 'updateOrderStatus')
      .mockReturnValue();
    const onSubmit = jest.spyOn(instance, 'onSubmit');
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
    getParent.mockRestore();
    onSubmit.mockRestore();
    updateOrderStatus.mockRestore();
  });

  it('should show if form is not cancelable', () => {
    const { wrapper, store } = setup(mockPurchaseOrders[1]);
    const getParent = jest.spyOn(MST, 'getParent').mockReturnValue(store);
    const setCancelOrderId = jest.spyOn(store.buyerOrders, 'setCancelOrderId');
    expect(
      wrapper
        .find('ErrorText')
        .dive()
        .text(),
    ).toEqual(
      'You may no longer cancel this order because the seller has marked the status as canceled.',
    );
    wrapper.find(ButtonPrimary).simulate('click');
    expect(setCancelOrderId).toHaveBeenCalledWith(null);
    getParent.mockRestore();
    setCancelOrderId.mockRestore();
  });

  it('should allow form to be edited by default', () => {
    const { wrapper } = setup();
    expect(wrapper.find('TextArea').props().disabled).toEqual(false);
  });
});
