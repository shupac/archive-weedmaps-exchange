import { getSnapshot } from 'mobx-state-tree';
import mockCart from 'lib/mocks/cart';
import BuyerCart from './';

describe('Buyer Cart Store', () => {
  it('can fetch buyer from cart endpoint and set data', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue({ data: mockCart }),
    };
    const buyerCart = BuyerCart.create(
      {},
      {
        client: mockFetchClient,
      },
    );
    await buyerCart.fetchCart();
    expect(getSnapshot(buyerCart.cart)).toMatchSnapshot();
  });

  it('will compute the cart item count', () => {
    const buyerCart = BuyerCart.create({ cart: mockCart }, {});
    expect(buyerCart.cartItemCount).toBe(2);
  });
});
