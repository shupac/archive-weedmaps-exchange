import { getSnapshot } from 'mobx-state-tree';
import mockPurchaseOrder from 'lib/mocks/purchase-order';
import BuyerOrders from './';

function setup() {
  const mockFetchClient = {
    fetch: jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: mockPurchaseOrder })),
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
    const { buyerOrders } = setup();
    await buyerOrders.fetchOrder();
    expect(getSnapshot(buyerOrders.orderData)).toMatchSnapshot();
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
    expect(log).toHaveBeenCalledWith(new Error('Test'));
    log.mockRestore();
  });
});
