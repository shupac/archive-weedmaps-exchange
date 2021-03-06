// @flow
import React from 'react';
import { shallow } from 'enzyme';
import RootStore from 'lib/data-access/stores';
import BuyerOrdersStore from 'lib/data-access/stores/buyer-orders';
import UiStore from 'lib/data-access/stores/ui';
import { ButtonWhiteNoHover } from 'components/atoms/button';
import mockPurchaseOrder from 'mocks/purchase-order';
import Loader from 'components/atoms/loader';
import SellerDetailsModal from './seller-details-modal';
import { BuyerPurchaseOrder } from './';
import { OrderHeader } from './styles';

const orderId = 'b97329d4-a7ae-4c7a-ab5e-4de8aec22f50';

function setup() {
  const props = {
    onCancelOrder: jest.fn(),
    onReorder: jest.fn(),
  };

  const mockFetchClient = {
    fetch: jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: mockPurchaseOrder })),
  };

  const mockStore = {
    ...RootStore,
    buyerOrders: BuyerOrdersStore.create(
      {},
      {
        client: mockFetchClient,
      },
    ),
    uiStore: UiStore.create(),
  };
  const component = (
    <BuyerPurchaseOrder store={mockStore} orderId={orderId} {...props} />
  );
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper, mockStore, props };
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

describe('Seller Details Modal', () => {
  it('should render the seller details modal', () => {
    const props = {
      brandName: 'weed',
      sellerContactName: 'Test',
      sellerEmail: 'test@test.com',
      sellerPhone: '123-123-1234',
      sellerName: 'test',
      sellerLicenses: [],
    };
    const component = <SellerDetailsModal {...props} />;
    const wrapper = shallow(component);
    expect(wrapper.exists()).toEqual(true);
    expect(
      wrapper
        .find('DetailDescription')
        .first()
        .text(),
    ).toEqual('weed');
    expect(
      wrapper
        .find('DetailDescription')
        .at(1)
        .text(),
    ).toEqual('Test');
    expect(
      wrapper
        .find('DetailDescription')
        .at(2)
        .text(),
    ).toEqual('(123) 123-1234');
    expect(
      wrapper
        .find('DetailDescription')
        .at(3)
        .text(),
    ).toEqual('test@test.com');
    expect(
      wrapper
        .find('DetailDescription')
        .at(4)
        .text(),
    ).toEqual('N/A');
  });
  it('should render with no phone and with licenses', () => {
    const props = {
      brandName: 'weed',
      sellerContactName: 'Test',
      sellerEmail: 'test@test.com',
      sellerName: 'test',
      sellerLicenses: [
        {
          licenseType: 'medical',
          number: '123',
          id: '1234',
        },
      ],
    };
    const component = <SellerDetailsModal {...props} />;
    const wrapper = shallow(component);
    expect(
      wrapper
        .find('DetailDescription')
        .at(2)
        .text(),
    ).toEqual('N/A');
    expect(
      wrapper
        .find('DetailDescription')
        .last()
        .text(),
    ).toEqual('medical 123');
  });
});
