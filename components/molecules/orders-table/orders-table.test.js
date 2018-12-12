import React from 'react';
import { shallow } from 'enzyme';
import mockPurchaseOrders from 'mocks/purchase-orders';
import ContextMenu, { MenuItem } from 'components/molecules/context-menu';
import { OrdersTable } from './';

function setup(props) {
  const component = (
    <OrdersTable orders={mockPurchaseOrders} setSort={jest.fn()} {...props} />
  );
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper };
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

  it('should reverse sort', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    instance.setState({ sortDirection: '' });
    instance.onSort('test');
    expect(instance.state.sortDirection).toEqual('');
    instance.onSort('test');
    expect(instance.state.sortDirection).toEqual('-');
  });

  it('should cancel order', () => {
    const onCancelOrder = jest.fn();
    const { wrapper } = setup({ onCancelOrder });
    const contextMenus = wrapper.find(ContextMenu);
    contextMenus
      .first()
      .find(MenuItem)
      .first()
      .simulate('click');
    expect(onCancelOrder).toHaveBeenCalledWith(mockPurchaseOrders[0].id);
  });

  it('should handle reorder', () => {
    const onReorder = jest.fn();
    const { wrapper } = setup({ onReorder });
    const contextMenus = wrapper.find(ContextMenu);
    contextMenus
      .first()
      .find(MenuItem)
      .last()
      .simulate('click');
    expect(onReorder).toHaveBeenCalledWith(mockPurchaseOrders[0].id);
  });
});
