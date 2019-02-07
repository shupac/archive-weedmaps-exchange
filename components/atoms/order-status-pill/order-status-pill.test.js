import React from 'react';
import { shallow } from 'enzyme';
import SellerOrders from 'lib/data-access/stores/seller-orders';
import { SELLER_STATUS_OPTIONS } from 'lib/common/constants';
import StatusPill from './';
import StatusPillDropDown from './status-pill-dropdown';

function setup(props) {
  const component = <StatusPill status="canceled" />;
  const wrapper = shallow(component);
  const store = {
    sellerOrders: SellerOrders.create(),
  };
  const dropDownComponents = (
    <StatusPillDropDown status="in_progress" store={store} {...props} />
  );
  const dropDownWrapper = shallow(dropDownComponents);
  return { wrapper, dropDownWrapper, store };
}

const props = {
  orderId: '1234',
  options: [SELLER_STATUS_OPTIONS],
  selectedOption: SELLER_STATUS_OPTIONS[0],
};
const noOptionsProps = {
  orderId: '1234',
  options: [],
};

describe('Status Pill', () => {
  it('should render the status pill', () => {
    const { wrapper } = setup(props);
    expect(wrapper.exists()).toEqual(true);
  });
  it('should render the Status Pill Drop Down', () => {
    const { dropDownWrapper } = setup(props);
    expect(dropDownWrapper.exists()).toEqual(true);
    expect(
      dropDownWrapper.find('[data-test-id="status-drop-down"]').props().status,
    ).toEqual('in_progress');
  });
  it('should render the Status Pill Final State', () => {
    const { dropDownWrapper } = setup(noOptionsProps);
    expect(
      dropDownWrapper.find('[data-test-id="final-pill"]').exists(),
    ).toEqual(true);
    expect(
      dropDownWrapper.find('[data-test-id="final-pill"]').props().status,
    ).toEqual('in_progress');
  });
});
