import React from 'react';
import { shallow } from 'enzyme';
import SellerOrdersStore from 'lib/data-access/stores/seller-orders';
import UiStore from 'lib/data-access/stores/ui';
import mockPurchaseOrders from 'lib/mocks/purchase-orders';
import { ButtonWhiteNoHover } from 'components/atoms/button';
import mockPurchaseOrder from 'mocks/purchase-order';
import Loader from 'components/atoms/loader';
import { SellerPurchaseOrder } from './';
import { OrderHeader } from './styles';
import BuyerDetailModal from './buyer-details-modal';

const orderId = 'b97329d4-a7ae-4c7a-ab5e-4de8aec22f50';

function setup() {
  const mockFetchClient = {
    fetch: jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: mockPurchaseOrder })),
  };

  const mockStore = {
    sellerOrders: SellerOrdersStore.create(
      { orderData: mockPurchaseOrders[0] },
      {
        client: mockFetchClient,
      },
    ),
    uiStore: UiStore.create(),
  };
  const props = {
    onCancelOrder: jest.fn(),
    onStatusChange: jest.fn(),
  };
  const component = (
    <SellerPurchaseOrder store={mockStore} orderId={orderId} {...props} />
  );
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
    const fetchOrder = jest.spyOn(mockStore.sellerOrders, 'fetchOrder');
    instance.componentDidMount();
    expect(fetchOrder).toHaveBeenCalledWith(orderId);
    fetchOrder.mockRestore();
  });

  it('should show loader if no data', () => {
    const { wrapper, mockStore } = setup();
    mockStore.sellerOrders.setOrderData(undefined);
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
    mockStore.sellerOrders.setOrderData({
      ...mockPurchaseOrder,
      status: 'canceled',
    });
    const reasonLabel = wrapper
      .find('th')
      .last()
      .text();
    expect(reasonLabel).toEqual('Reason for Cancelation');
  });

  it('should open BuyerDetailsModal when seller is clicked', done => {
    const { wrapper, mockStore } = setup();
    const openModal = jest.spyOn(mockStore.uiStore, 'openModal');
    const instance = wrapper.instance();
    instance.componentDidMount();

    setTimeout(() => {
      wrapper.find('StyledSellerName').simulate('click');
      expect(openModal).toHaveBeenCalledWith('buyerDetailsModal');
      done();
    }, 0);
  });
});

describe('Buyer Detail Modal', () => {
  it('should render the Buyer Detail Modal', () => {
    const modalProps = {
      buyerName: 'weedmaps',
      buyerEmail: 'weed@weedmaps.com',
      buyerPhone: '555-555-5555',
      buyerLicenses: [],
      buyerDeliveryInstructions: 'Knock on the door',
      buyerAddress: '123 Irvine',
      buyerContactName: 'weedmaps',
    };
    const modalComponent = <BuyerDetailModal {...modalProps} />;
    const modalWrapper = shallow(modalComponent);
    expect(modalWrapper.exists()).toEqual(true);
    expect(
      modalWrapper
        .find('DetailDescription')
        .first()
        .text(),
    ).toEqual('weedmaps');
    expect(
      modalWrapper
        .find('DetailDescription')
        .at(3)
        .text(),
    ).toEqual('weedmaps');
    expect(
      modalWrapper
        .find('DetailDescription')
        .at(1)
        .text(),
    ).toEqual('123 Irvine');
    expect(
      modalWrapper
        .find('DetailDescription')
        .at(2)
        .text(),
    ).toEqual('Knock on the door');
    expect(
      modalWrapper
        .find('DetailDescription')
        .at(4)
        .text(),
    ).toEqual('(555) 555-5555');
    expect(
      modalWrapper
        .find('DetailDescription')
        .last()
        .text(),
    ).toEqual('N/A');
  });
  it('should render when there is no buyer phone or with licenses', () => {
    const modalProps = {
      buyerName: 'weedmaps',
      buyerEmail: 'weed@weedmaps.com',
      buyerLicenses: [
        {
          licenseType: 'medical',
          number: 123,
        },
      ],
      buyerDeliveryInstructions: 'Knock on the door',
      buyerAddress: '123 Irvine',
      buyerLocationName: 'weedmaps',
    };
    const modalComponent = <BuyerDetailModal {...modalProps} />;
    const modalWrapper = shallow(modalComponent);

    expect(
      modalWrapper
        .find('DetailDescription')
        .at(4)
        .text(),
    ).toEqual('N/A');
    expect(
      modalWrapper
        .find('DetailDescription')
        .last()
        .text(),
    ).toEqual('medical 123');
  });
});
