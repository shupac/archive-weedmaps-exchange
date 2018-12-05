import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import mockPurchaseOrders from 'mocks/purchase-orders';
import BuyerOrdersStore from 'lib/data-access/stores/buyer-orders';
import { BuyerPurchaseOrders } from './';

function setup() {
  const mockFetchClient = {
    fetch: jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: mockPurchaseOrders })),
  };
  const mockStore = {
    buyerOrders: BuyerOrdersStore.create(
      {
        ordersData: mockPurchaseOrders,
      },
      {
        client: mockFetchClient,
      },
    ),
  };
  const tree = shallow(<BuyerPurchaseOrders store={mockStore} />);
  const instance = tree.instance();
  return { tree, instance, mockStore };
}

describe('Buyer Purchase Orders Page', () => {
  it('should render the component', () => {
    const { tree } = setup();
    expect(tree.exists()).toEqual(true);
  });
  it('should be able to set search query', () => {
    const { instance } = setup();
    instance.setSearch('black widow');
    expect(instance.query.toJSON()).toEqual({ query: 'black widow' });
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
    const dispose = jest.spyOn(instance, 'dispose');
    tree.unmount();
    expect(dispose).toHaveBeenCalled();
  });
});
