import * as MST from 'mobx-state-tree';
import mockPurchaseOrders, {
  ordersBrands,
  ordersLocations,
} from 'lib/mocks/purchase-orders';
import mockPurchaseOrder from 'lib/mocks/purchase-order';
import SellerOrders from './';

const { getSnapshot } = MST;

function setup(mockResp) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
    put: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
    post: jest.fn().mockReturnValue(Promise.resolve({ data: mockResp })),
  };

  const mockStore = {
    sellerOrders: SellerOrders.create(
      {
        ordersList: mockPurchaseOrders,
        orderData: mockPurchaseOrders[0],
      },
      {
        client: mockFetchClient,
      },
    ),
  };

  return { mockStore, mockFetchClient };
}

describe('Seller Orders Store', () => {
  it('can fetch purchase order and set data', async () => {
    const { mockStore } = setup(mockPurchaseOrder);
    const { sellerOrders } = mockStore;
    await sellerOrders.fetchOrder();
    expect(getSnapshot(sellerOrders.orderData)).toMatchSnapshot();
  });

  it('can fetch all purchase orders and set data', async () => {
    const { mockStore } = setup(mockPurchaseOrders);
    const { sellerOrders } = mockStore;
    await sellerOrders.fetchOrders();
    expect(getSnapshot(sellerOrders.ordersList)).toMatchSnapshot();
  });

  it('can compute sellerBrandsFilterOptions', async () => {
    const { mockStore } = setup(ordersBrands);
    const { sellerOrders } = mockStore;
    await sellerOrders.fetchPOBuyers();
    expect(sellerOrders.sellerBrandsFilterOptions).toEqual([
      {
        value: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
        text: 'GfarmaLabs',
      },
    ]);
  });

  it('can compute sellerLocationsFilterOptions', async () => {
    const { mockStore } = setup(ordersLocations);
    const { sellerOrders } = mockStore;
    await sellerOrders.fetchPOBuyers();
    expect(sellerOrders.sellerLocationsFilterOptions).toEqual([
      {
        value: '244a4623-009f-48de-b294-9d463b9973c6',
        text: 'SF Location',
      },
    ]);
  });

  it('can update order status', async () => {
    const { mockStore, mockFetchClient } = setup(mockPurchaseOrder);
    const { sellerOrders } = mockStore;
    const setOrderData = jest.spyOn(sellerOrders, 'setOrderData');
    await sellerOrders.updateOrderStatus(
      mockPurchaseOrder.id,
      'canceled',
      'Test',
    );
    expect(mockFetchClient.put).toHaveBeenCalledWith(
      `seller/orders/${mockPurchaseOrder.id}`,
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

  it('can compute sellerZonesFilterOptions', async () => {
    const { mockStore } = setup(ordersLocations);
    const { sellerOrders } = mockStore;
    await sellerOrders.fetchPOBuyers();
    expect(sellerOrders.sellerZonesFilterOptions).toEqual([
      {
        value: '244a4623-009f-48de-b294-9d463b9973c6',
        text: 'SF Location',
      },
    ]);
  });
});
