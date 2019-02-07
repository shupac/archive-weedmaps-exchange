import React from 'react';
import { shallow } from 'enzyme';
import mockPurchaseOrder from 'mocks/purchase-order';
import ProductRow from './product-row';
import SellerDetailsModal from './seller-details-modal';

function setup() {
  const {
    sellerName,
    sellerPhone,
    sellerEmail,
    sellerLicenses,
  } = mockPurchaseOrder.sellerData;
  const modalComponent = (
    <SellerDetailsModal
      sellerName={sellerName}
      sellerPhone={sellerPhone}
      sellerEmail={sellerEmail}
      sellerLicenses={sellerLicenses}
    />
  );
  const wrapper = shallow(modalComponent);
  return { wrapper };
}

describe('Buyer Purchase Order Page', () => {
  it('should render the component', () => {
    const orderItem = mockPurchaseOrder.orderItems[0];
    const wrapper = shallow(<ProductRow item={orderItem} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render the top level category', () => {
    const orderItem = {
      ...mockPurchaseOrder.orderItems[0],
      categories: {
        parent: 'Flower',
      },
    };
    const wrapper = shallow(<ProductRow item={orderItem} />);
    expect(wrapper.exists()).toEqual(true);
  });
});

describe('Seller Details Modal', () => {
  it('should render the components', () => {
    const { wrapper } = setup();
    expect(
      wrapper
        .find('DetailDescription')
        .at(1)
        .text(),
    ).toEqual('West Coast Cure');
    expect(
      wrapper
        .find('DetailDescription')
        .at(2)
        .text(),
    ).toEqual('(111) 222-3333');
    expect(
      wrapper
        .find('DetailDescription')
        .at(3)
        .text(),
    ).toEqual('test@test.com');
    expect(
      wrapper
        .find('DetailDescription')
        .last()
        .text(),
    ).toEqual('N/A');
  });
});
