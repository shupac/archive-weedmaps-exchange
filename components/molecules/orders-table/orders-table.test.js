import * as MST from 'mobx-state-tree';
import React from 'react';
import { shallow } from 'enzyme';
import mockPurchaseOrders from 'mocks/purchase-orders';
import BuyerOrdersStore from 'lib/data-access/stores/buyer-orders';
import UiStore from 'lib/data-access/stores/ui';
import ContextMenu, { MenuItem } from 'components/molecules/context-menu';
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
        ordersList: mockPurchaseOrders,
      },
      {
        client: mockFetchClient,
      },
    ),
    uiStore: UiStore.create(),
  };
  const component = <OrdersTable store={mockStore} setSort={jest.fn()} />;
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
  it('should cancel order', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    const getParent = jest.spyOn(MST, 'getParent').mockReturnValue(mockStore);
    const cancelOrder = jest.spyOn(instance, 'cancelOrder');
    const openModal = jest.spyOn(mockStore.uiStore, 'openModal');
    const contextMenus = wrapper.find(ContextMenu);
    contextMenus
      .first()
      .find(MenuItem)
      .first()
      .simulate('click');
    expect(cancelOrder).toHaveBeenCalledWith(mockPurchaseOrders[0].id);
    expect(openModal).toHaveBeenCalled();
    getParent.mockRestore();
    openModal.mockRestore();
  });
  it('should handle  reorder', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const reorder = jest.spyOn(instance, 'reorder');
    const contextMenus = wrapper.find(ContextMenu);
    contextMenus
      .first()
      .find(MenuItem)
      .last()
      .simulate('click');
    expect(reorder).toHaveBeenCalledWith(mockPurchaseOrders[0].id);
    reorder.mockRestore();
  });
});
