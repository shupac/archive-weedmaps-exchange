import { getSnapshot } from 'mobx-state-tree';
import mockPurchaseOrder from 'lib/mocks/purchase-order';
import mockPurchaseOrders from 'lib/mocks/purchase-orders';
import BuyerOrders from './';

function setup(mockResp) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
    put: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
  };

  const buyerOrders = BuyerOrders.create(
    { orderData: mockPurchaseOrder },
    {
      client: mockFetchClient,
    },
  );
  return { buyerOrders, mockFetchClient };
}

describe('Buyer Orders Store', () => {
  describe('purhase order detail', () => {
    it('can fetch purchase order and set data', async () => {
      const { buyerOrders } = setup(mockPurchaseOrder);
      await buyerOrders.fetchOrder();
      expect(getSnapshot(buyerOrders.orderData)).toMatchSnapshot();
    });

    it('can update order status', async () => {
      const { buyerOrders, mockFetchClient } = setup(mockPurchaseOrder);
      const success = await buyerOrders.updateOrderStatus(
        mockPurchaseOrder.id,
        'canceled',
        'Test',
      );
      expect(mockFetchClient.put).toHaveBeenCalledWith(
        'buyer/purchase_orders/b97329d4-a7ae-4c7a-ab5e-4de8aec22f50',
        {
          data: {
            attributes: {
              status: 'canceled',
              status_reason: 'Test',
            },
          },
        },
      );
      expect(success).toEqual(true);
    });

    it('returns false for unsuccessful order status updates', async () => {
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
      const success = await buyerOrders.updateOrderStatus(
        mockPurchaseOrder.id,
        'canceled',
        'Test',
      );
      expect(success).toEqual(false);
      expect(log).toHaveBeenCalledWith(new Error('Test'));
      log.mockRestore();
    });
  });

  it('can fetch all purchase orders and set data', async () => {
    const { buyerOrders } = setup(mockPurchaseOrders);
    await buyerOrders.fetchOrder();
    expect(getSnapshot(buyerOrders.ordersList)).toMatchSnapshot();
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
});
