import { getSnapshot } from 'mobx-state-tree';
import mockCart from 'lib/mocks/cart';
import BuyerCart from './';

function setup() {
  const mockFetchClient = {
    post: jest.fn().mockReturnValue(Promise.resolve({ data: mockCart })),
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockCart })),
  };

  const buyerCart = BuyerCart.create(
    { cart: mockCart },
    {
      client: mockFetchClient,
    },
  );
  return { buyerCart, mockFetchClient };
}

const cartItems = [
  { variant_id: 'e0c6412f-05e4-4779-b964-86932d4de96a', quantity: 2 },
];

describe('Buyer Cart Store', () => {
  it('can fetch buyer from cart endpoint and set data', async () => {
    const { buyerCart } = setup();
    await buyerCart.fetchCart();
    expect(getSnapshot(buyerCart.cart)).toMatchSnapshot();
  });

  it('will compute the cart item count', () => {
    const { buyerCart } = setup();
    expect(buyerCart.cartItemCount).toBe(2);
  });

  describe('When adding items to cart', () => {
    it('will post to cart endpoint ', () => {
      const { buyerCart, mockFetchClient } = setup();

      buyerCart.addCartItems(cartItems);
      expect(mockFetchClient.post).toHaveBeenCalledWith('/buyer/cart/items', {
        data: [
          { quantity: 2, variant_id: 'e0c6412f-05e4-4779-b964-86932d4de96a' },
        ],
      });
    });

    it('will handle errors ', () => {
      const mockErrorClient = {
        post: () => {
          throw new Error('Test');
        },
        fetch: () => {
          throw new Error('Test');
        },
      };
      const buyerCart = BuyerCart.create(
        { cart: mockCart },
        {
          client: mockErrorClient,
        },
      );
      const log = jest.spyOn(global.console, 'error').mockReturnValue();
      buyerCart.addCartItems(cartItems);
      expect(log).toHaveBeenCalledWith(new Error('Test'));
      buyerCart.fetchCart(cartItems);
      expect(log).toHaveBeenCalledWith(new Error('Test'));
      log.mockRestore();
    });
  });
});
