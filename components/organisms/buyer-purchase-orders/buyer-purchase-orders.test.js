import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import mockPurchaseOrders from 'mocks/purchase-orders';
import BuyerOrdersStore from 'lib/data-access/stores/buyer-orders';
import UiStore from 'lib/data-access/stores/ui';
import EmptyState from 'components/atoms/empty-state';
import Loader from 'components/atoms/loader';
import { BuyerPurchaseOrders } from './';

function createMockStore(ordersLoading) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(
      Promise.resolve({
        data: mockPurchaseOrders,
        meta: {
          totalEntries: 10,
          pageSize: 25,
          pageNumber: 1,
        },
      }),
    ),
  };

  return {
    buyerOrders: BuyerOrdersStore.create(
      {
        orderList: mockPurchaseOrders,
        ordersLoading,
      },
      {
        client: mockFetchClient,
      },
    ),
    uiStore: UiStore.create(),
  };
}

function setup(ordersLoading = false) {
  const mockStore = createMockStore(ordersLoading);
  const tree = shallow(<BuyerPurchaseOrders store={mockStore} />, {
    disableLifecycleMethods: true,
  });
  const instance = tree.instance();
  return { tree, instance, mockStore };
}

describe('Buyer Purchase Orders Page', () => {
  it('should render the component', () => {
    const { tree } = setup();
    expect(tree.exists()).toEqual(true);
  });

  it('should fetch POs on mount', () => {
    const { instance, mockStore } = setup();
    const fetchPurchaseOrders = jest.spyOn(
      mockStore.buyerOrders,
      'fetchPurchaseOrders',
    );
    const fetchPOSellers = jest
      .spyOn(mockStore.buyerOrders, 'fetchPOSellers')
      .mockReturnValue();
    instance.componentDidMount();

    expect(fetchPurchaseOrders).toHaveBeenCalledWith({
      sort: '-date_ordered',
    });
    expect(fetchPOSellers).toHaveBeenCalled();
    expect(instance.state).toEqual({ mounted: true });
  });

  it('should be able to set search query', () => {
    const { instance } = setup();
    instance.setSearch('black widow');
    expect(instance.query.toJSON()).toEqual({
      purchase_order_query: 'black widow',
    });
  });

  it('should be able to set sort query', () => {
    const { instance } = setup();
    instance.setSort('date_ordered');
    expect(instance.query.toJSON()).toEqual({ sort: 'date_ordered' });
  });

  it('should be able to set filters query', () => {
    const { instance } = setup();
    instance.setFilter('status', ['shipped']);
    expect(instance.query.toJSON()).toEqual({ 'filter[status]': ['shipped'] });
  });

  it('should be able to set paging', () => {
    const { instance } = setup();
    instance.setPage(2);
    expect(instance.query.toJSON()).toEqual({ 'page[number]': 2 });
  });

  it('can stringify moment date object', () => {
    const { instance } = setup();
    const stringifiedDate = instance.stringifyDate(moment('2018-08-12'));
    expect(stringifiedDate).toEqual('2018-08-12');
  });

  it('will return empty string when date obj is null', () => {
    const { instance } = setup();
    const stringifiedDate = instance.stringifyDate(null);
    expect(stringifiedDate).toEqual('');
  });

  it('should be able to set start date filter', () => {
    const { instance } = setup();
    const mockSetFilter = jest.spyOn(instance, 'setFilter');
    const mockDateRange = {
      startDate: moment('2018-08-12'),
      endDate: moment('2018-09-10'),
    };
    instance.setDateRange(mockDateRange);
    expect(mockSetFilter).toHaveBeenCalled();
  });

  it('should clean up disposer on unmount', () => {
    const { tree, instance } = setup();
    const disposeFetchOrders = jest.spyOn(instance, 'disposeFetchOrders');
    const disposeWatchModal = jest.spyOn(instance, 'disposeWatchModal');
    tree.unmount();
    expect(disposeFetchOrders).toHaveBeenCalled();
    expect(disposeWatchModal).toHaveBeenCalled();
  });

  it('should render a loader if unmounted', () => {
    const { tree } = setup();
    expect(tree.find(Loader).exists()).toEqual(true);
  });

  it('should render a loader if loading', () => {
    const { tree, instance } = setup(true);
    instance.setState({ mounted: true });
    expect(tree.find(Loader).exists()).toEqual(true);
  });

  it('should render the empty state', () => {
    const { tree, instance } = setup(false);
    instance.setState({ mounted: true });
    expect(tree.find(EmptyState).exists()).toEqual(true);
  });

  it('should not update order data if modal is transitioning', done => {
    const { instance, mockStore } = setup();
    jest.spyOn(mockStore.buyerOrders, 'fetchPOSellers').mockReturnValue();
    instance.componentDidMount();

    setTimeout(() => {
      mockStore.uiStore.openModal('testModal');
    }, 0);

    setTimeout(() => {
      mockStore.buyerOrders.setPurchaseOrders([]);
      mockStore.uiStore.closeModal();
    }, 400);

    setTimeout(() => {
      expect(instance.orders.length).toEqual(2);
      done();
    }, 410);
  });
});
