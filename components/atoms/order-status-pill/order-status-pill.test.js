import React from 'react';
import { shallow } from 'enzyme';
import SellerOrders from 'lib/data-access/stores/seller-orders';
import StatusPill from './';
import StatusPillDropDown from './status-pill-dropdown';

function setup() {
  const component = <StatusPill status="canceled" />;
  const wrapper = shallow(component);
  const store = {
    sellerOrders: SellerOrders.create(),
  };
  const props = {
    orderId: '1234',
  };
  const dropDownComponents = (
    <StatusPillDropDown status="in_progress" store={store} {...props} />
  );
  const dropDownWrapper = shallow(dropDownComponents).dive();
  return { wrapper, dropDownWrapper, store };
}

describe('Status Pill', () => {
  it('should render the status pill', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });
  it('should render the Status Pill Drop Down', () => {
    const { dropDownWrapper } = setup();
    expect(dropDownWrapper.exists()).toEqual(true);
  });
  it('should handle the select change', () => {
    const { dropDownWrapper, store } = setup();
    expect(dropDownWrapper.exists()).toEqual(true);
    const updateOrderStatus = jest.spyOn(
      store.sellerOrders,
      'updateOrderStatus',
    );
    dropDownWrapper
      .find('[data-test-id="status-drop-down"]')
      .simulate('change', {
        target: { text: 'Completed', value: 'completed' },
      });
    expect(updateOrderStatus).toHaveBeenCalled();
  });
});
