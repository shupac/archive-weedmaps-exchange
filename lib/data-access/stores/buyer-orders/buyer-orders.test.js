import * as MST from 'mobx-state-tree';
import UiStore from 'lib/data-access/stores/ui';
import mockPurchaseOrder from 'lib/mocks/purchase-order';
import mockPurchaseOrders from 'lib/mocks/purchase-orders';
import BuyerOrders from './';

const { getSnapshot } = MST;

jest.useFakeTimers();

function setup(mockResp) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
    put: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
  };

  const mockStore = {
    buyerOrders: BuyerOrders.create(
      {
        orderData: mockPurchaseOrder,
        ordersList: mockPurchaseOrders,
      },
      {
        client: mockFetchClient,
      },
    ),
    uiStore: UiStore.create(),
  };

  return { mockStore, mockFetchClient };
}

describe('Buyer Orders Store', () => {
  it('can fetch all purchase orders and set data', async () => {
    const { mockStore } = setup(mockPurchaseOrders);
    const { buyerOrders } = mockStore;
    await buyerOrders.fetchPurchaseOrders();
    expect(getSnapshot(buyerOrders.ordersList)).toMatchSnapshot();
  });

  it('can calculate PO sellers', async () => {
    const { mockStore } = setup(mockPurchaseOrders);
    const { buyerOrders } = mockStore;
    await buyerOrders.fetchPurchaseOrders();
    expect(buyerOrders.POSellers).toMatchSnapshot();
  });

  it('will handle errors', () => {
    const mockErrorClient = {
      fetch: () => {
        throw new Error('Test');
      },
    };
    const buyerOrders = BuyerOrders.create(
      { orderData: mockPurchaseOrder },
      {
        client: mockErrorClient,
      },
    );
    const log = jest.spyOn(global.console, 'error').mockReturnValue();
    buyerOrders.fetchOrder();
    buyerOrders.fetchPurchaseOrders();
    expect(log).toHaveBeenCalledWith(new Error('Test'));
    log.mockRestore();
  });

  it('can fetch purchase order and set data', async () => {
    const { mockStore } = setup(mockPurchaseOrder);
    const { buyerOrders } = mockStore;
    await buyerOrders.fetchOrder();
    expect(getSnapshot(buyerOrders.orderData)).toMatchSnapshot();
  });

  it('can cancel order', () => {
    const { mockStore } = setup();
    const { buyerOrders, uiStore } = mockStore;
    const getParent = jest.spyOn(MST, 'getParent').mockReturnValue(mockStore);
    const openModal = jest.spyOn(uiStore, 'openModal');
    const setCancelOrderId = jest.spyOn(buyerOrders, 'setCancelOrderId');
    const fetchOrder = jest.spyOn(buyerOrders, 'fetchOrder');
    buyerOrders.cancelOrder('1234');
    expect(setCancelOrderId).toHaveBeenCalledWith('1234');
    expect(openModal).toHaveBeenCalledWith('cancelOrder');
    expect(fetchOrder).toHaveBeenCalledWith('1234');
    getParent.mockRestore();
    openModal.mockRestore();
    fetchOrder.mockRestore();
  });

  it('can close the cancel order modal', () => {
    const { mockStore } = setup();
    const { buyerOrders, uiStore } = mockStore;
    const getParent = jest.spyOn(MST, 'getParent').mockReturnValue(mockStore);
    const openModal = jest.spyOn(uiStore, 'openModal');
    const setCancelOrderId = jest.spyOn(buyerOrders, 'setCancelOrderId');
    const fetchOrder = jest.spyOn(buyerOrders, 'fetchOrder');
    buyerOrders.cancelOrder(null);
    expect(setCancelOrderId).toHaveBeenCalledWith(null);
    expect(openModal).toHaveBeenCalledWith(null);
    expect(fetchOrder).not.toHaveBeenCalled();
    getParent.mockRestore();
    openModal.mockRestore();
    fetchOrder.mockRestore();
  });

  it('can update order status', async () => {
    const { mockStore, mockFetchClient } = setup(mockPurchaseOrder);
    const { buyerOrders } = mockStore;
    const getParent = jest.spyOn(MST, 'getParent').mockReturnValue(mockStore);
    const setOrderData = jest.spyOn(buyerOrders, 'setOrderData');
    await buyerOrders.updateOrderStatus(
      mockPurchaseOrder.id,
      'canceled',
      'Test',
    );
    expect(mockFetchClient.put).toHaveBeenCalledWith(
      `buyer/purchase_orders/${mockPurchaseOrder.id}`,
      {
        data: {
          attributes: {
            status: 'canceled',
            status_reason: 'Test',
          },
        },
      },
    );
    jest.runAllTimers();
    expect(setOrderData).toHaveBeenCalledWith(mockPurchaseOrder);
    getParent.mockRestore();
  });

  it('can update order status for an order in the orders list', async () => {
    const { mockStore, mockFetchClient } = setup(mockPurchaseOrders[0]);
    const { buyerOrders } = mockStore;
    const getParent = jest.spyOn(MST, 'getParent').mockReturnValue(mockStore);
    const setOrderData = jest.spyOn(buyerOrders, 'setOrderData');
    await buyerOrders.updateOrderStatus(
      mockPurchaseOrders[0].id,
      'canceled',
      'Test',
    );
    expect(mockFetchClient.put).toHaveBeenCalledWith(
      `buyer/purchase_orders/${mockPurchaseOrders[0].id}`,
      {
        data: {
          attributes: {
            status: 'canceled',
            status_reason: 'Test',
          },
        },
      },
    );
    jest.runAllTimers();
    expect(setOrderData).toHaveBeenCalledWith(mockPurchaseOrders[0]);
    getParent.mockRestore();
  });

  it('should catch unsuccessful order status updates', async () => {
    const mockErrorClient = {
      fetch: () => {
        throw new Error('Test');
      },
    };
    const buyerOrders = BuyerOrders.create(
      { orderData: mockPurchaseOrder },
      {
        client: mockErrorClient,
      },
    );
    const log = jest.spyOn(global.console, 'error').mockReturnValue();
    await buyerOrders.updateOrderStatus(
      mockPurchaseOrder.id,
      'canceled',
      'Test',
    );
    expect(log).toHaveBeenCalledWith(new Error('Test'));
    log.mockRestore();
  });
});
