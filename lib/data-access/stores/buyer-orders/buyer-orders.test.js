import { getSnapshot } from 'mobx-state-tree';
import mockPurchaseOrder from 'lib/mocks/purchase-order';
import mockPurchaseOrders from 'lib/mocks/purchase-orders';
import BuyerOrders from './';

function setup(mockResp) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
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
  it('can fetch purchase order and set data', async () => {
    const { buyerOrders } = setup(mockPurchaseOrder);
    await buyerOrders.fetchOrder();
    expect(getSnapshot(buyerOrders.orderData)).toMatchSnapshot();
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
