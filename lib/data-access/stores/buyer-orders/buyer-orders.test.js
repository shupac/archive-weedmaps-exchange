import * as MST from 'mobx-state-tree';
import mockPurchaseOrder from 'lib/mocks/purchase-order';
import mockPurchaseOrders, {
  ordersLocations,
  ordersBrands,
} from 'lib/mocks/purchase-orders';
import BuyerOrders from './';

const { getSnapshot } = MST;

function setup(mockResp) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
    put: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
    post: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
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

  it('can fetch brands Filters', async () => {
    const { mockStore } = setup(ordersBrands);
    const { buyerOrders } = mockStore;
    await buyerOrders.fetchPOSellers();
    expect(buyerOrders.ordersBrands).toMatchSnapshot();
  });

  it('can compute brandsFilterOptions', async () => {
    const { mockStore } = setup(ordersBrands);
    const { buyerOrders } = mockStore;
    await buyerOrders.fetchPOSellers();
    expect(buyerOrders.brandsFilterOptions).toEqual([
      {
        value: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
        text: 'GfarmaLabs',
      },
    ]);
  });

  it('can compute locationsFilterOptions', async () => {
    const { mockStore } = setup(ordersLocations);
    const { buyerOrders } = mockStore;
    await buyerOrders.fetchPOSellers();
    expect(buyerOrders.locationsFilterOptions).toEqual([
      {
        value: '244a4623-009f-48de-b294-9d463b9973c6',
        text: 'SF Location',
      },
    ]);
  });

  it('can fetch locations Filters', async () => {
    const { mockStore } = setup(ordersLocations);
    const { buyerOrders } = mockStore;
    await buyerOrders.fetchPOSellers();
    expect(buyerOrders.ordersLocations).toMatchSnapshot();
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
    buyerOrders.fetchPOSellers();
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
    const { buyerOrders } = mockStore;
    const setCancelOrderId = jest.spyOn(buyerOrders, 'setCancelOrderId');
    const fetchOrder = jest.spyOn(buyerOrders, 'fetchOrder');
    buyerOrders.cancelOrder('1234');
    expect(setCancelOrderId).toHaveBeenCalledWith('1234');
    expect(fetchOrder).toHaveBeenCalledWith('1234');
    fetchOrder.mockRestore();
  });

  it('can close the cancel order modal', () => {
    const { mockStore } = setup();
    const { buyerOrders } = mockStore;
    const setCancelOrderId = jest.spyOn(buyerOrders, 'setCancelOrderId');
    const fetchOrder = jest.spyOn(buyerOrders, 'fetchOrder');
    buyerOrders.cancelOrder(null);
    expect(setCancelOrderId).toHaveBeenCalledWith(null);
    expect(fetchOrder).not.toHaveBeenCalled();
    fetchOrder.mockRestore();
  });

  it('can update order status', async () => {
    const { mockStore, mockFetchClient } = setup(mockPurchaseOrder);
    const { buyerOrders } = mockStore;
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
    expect(setOrderData).toHaveBeenCalledWith(mockPurchaseOrder);
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

  it('should reorder a purchase order', async () => {
    const { mockStore, mockFetchClient } = setup(mockPurchaseOrders[0]);
    const { buyerOrders } = mockStore;
    const reorder = jest.spyOn(buyerOrders, 'reorder');
    const newOrder = await buyerOrders.reorder(mockPurchaseOrders[0].id);
    expect(mockFetchClient.post).toHaveBeenCalledWith(
      `buyer/purchase_orders/${mockPurchaseOrders[0].id}/reorder`,
    );
    expect(newOrder).toEqual(mockPurchaseOrders[0]);
    reorder.mockRestore();
  });

  it('should catch a failed reorder', async () => {
    const mockErrorClient = {
      post: () => {
        throw new Error('Test');
      },
    };
    const buyerOrders = BuyerOrders.create(
      {},
      {
        client: mockErrorClient,
      },
    );
    const log = jest.spyOn(global.console, 'error').mockReturnValue();
    const newOrder = await buyerOrders.reorder(mockPurchaseOrders[0].id);
    expect(newOrder).toEqual(false);
    expect(log).toHaveBeenCalledWith(new Error('Test'));
    log.mockRestore();
  });
});
