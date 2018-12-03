import React from 'react';
import { shallow } from 'enzyme';
import mockPurchaseOrders from 'mocks/purchase-orders';
import BuyerOrdersStore from 'lib/data-access/stores/buyer-orders';
import { OrdersTable } from './';

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
  const component = <OrdersTable store={mockStore} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper, mockStore };
}

describe('OrdersTable', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });
  it('should fetch purchase orders on mount ', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    const fetchPurchaseOrders = jest.spyOn(
      mockStore.buyerOrders,
      'fetchPurchaseOrders',
    );
    instance.componentDidMount();
    expect(fetchPurchaseOrders).toHaveBeenCalledWith({
      sort: '-date_ordered',
    });
  });
  it('should sort on order id ', () => {
    const { wrapper } = setup();
    const mockOnSort = jest.spyOn(wrapper.instance(), 'onSort');
    const sortButton = wrapper.find('SortButton').first();
    sortButton.simulate('click');
    expect(mockOnSort).toHaveBeenCalledWith('order_id');
  });
  it('should sort on date ordered ', () => {
    const { wrapper } = setup();
    const mockOnSort = jest.spyOn(wrapper.instance(), 'onSort');
    const sortButton = wrapper.find('SortButton').at(1);
    sortButton.simulate('click');
    expect(mockOnSort).toHaveBeenCalledWith('date_ordered');
  });
  it('should sort on seller ', () => {
    const { wrapper } = setup();
    const mockOnSort = jest.spyOn(wrapper.instance(), 'onSort');
    const sortButton = wrapper.find('SortButton').at(2);
    sortButton.simulate('click');
    expect(mockOnSort).toHaveBeenCalledWith('brand_name');
  });
  it('should sort on shipping location ', () => {
    const { wrapper } = setup();
    const mockOnSort = jest.spyOn(wrapper.instance(), 'onSort');
    const sortButton = wrapper.find('SortButton').at(3);
    sortButton.simulate('click');
    expect(mockOnSort).toHaveBeenCalledWith('location');
  });
  it('should sort on expected ship date ', () => {
    const { wrapper } = setup();
    const mockOnSort = jest.spyOn(wrapper.instance(), 'onSort');
    const sortButton = wrapper.find('SortButton').at(4);
    sortButton.simulate('click');
    expect(mockOnSort).toHaveBeenCalledWith('expected_ship_date');
  });
  it('should sort on expected total ', () => {
    const { wrapper } = setup();
    const mockOnSort = jest.spyOn(wrapper.instance(), 'onSort');
    const sortButton = wrapper.find('SortButton').at(5);
    sortButton.simulate('click');
    expect(mockOnSort).toHaveBeenCalledWith('total');
  });
  it('should sort on status ', () => {
    const { wrapper } = setup();
    const mockOnSort = jest.spyOn(wrapper.instance(), 'onSort');
    const sortButton = wrapper.find('SortButton').at(6);
    sortButton.simulate('click');
    expect(mockOnSort).toHaveBeenCalledWith('status');
  });
});
