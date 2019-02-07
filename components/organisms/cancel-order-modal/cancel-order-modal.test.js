// @flow
import React from 'react';
import { shallow } from 'enzyme';
import BuyerOrders from 'lib/data-access/stores/buyer-orders';
import RootStore from 'lib/data-access/stores';
import UiStore from 'lib/data-access/stores/ui';
import mockPurchaseOrders from 'mocks/purchase-orders';
import TextArea from 'components/atoms/forms/text-area';
import { ButtonPrimary } from 'components/atoms/button';
import CancelOrderModal from './';

function setup(mockData) {
  const props = {
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  const store = {
    ...RootStore,
    buyerOrders: BuyerOrders.create({
      orderData: mockData,
      cancelOrderId: '1234',
    }),
    uiStore: UiStore.create({
      activeModal: 'cancelOrder',
    }),
  };

  const component = <CancelOrderModal store={store} {...props} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  }).dive();
  return { wrapper, store, props };
}

describe('Cancel Order Modal', () => {
  it('should render the component', () => {
    const { wrapper } = setup(mockPurchaseOrders[0]);

    expect(wrapper.exists()).toEqual(true);
  });

  it('should render null if no cancelOrderId', () => {
    const { wrapper, store } = setup(mockPurchaseOrders[0]);
    store.buyerOrders.cancelOrder(null);

    expect(wrapper.type()).toEqual(null);
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
    const { wrapper, props } = setup(mockPurchaseOrders[0]);
    const instance = wrapper.instance();
    instance.reason = 'foo  ';
    wrapper.find(ButtonPrimary).simulate('click');
    expect(props.onSubmit).toHaveBeenCalledWith('foo');
  });

  it('should show error text if form is not cancelable', () => {
    const { wrapper } = setup(mockPurchaseOrders[1]);

    expect(wrapper.find('ErrorText').text()).toEqual(
      'You may no longer cancel this order because the seller has marked the status as canceled.',
    );
  });

  it('should allow form to be edited by default', () => {
    const { wrapper } = setup();
    expect(wrapper.find('TextArea').props().disabled).toEqual(false);
  });

  it('should handle modal close', () => {
    const { wrapper, props } = setup(mockPurchaseOrders[0]);
    const instance = wrapper.instance();
    instance.reason = 'foo';
    instance.close();
    expect(instance.reason).toEqual('');
    expect(props.onClose).toHaveBeenCalled();
  });
});
