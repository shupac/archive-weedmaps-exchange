import { getSnapshot } from 'mobx-state-tree';
import mockCart, {
  buyerCartItem,
  mockErrorCart,
  mockCartErrors,
} from 'lib/mocks/cart';
import mockCartOrder from 'lib/mocks/cart-order';
import BuyerCart from './';

function setup() {
  const mockFetchClient = {
    post: jest.fn().mockReturnValue(Promise.resolve({ data: mockCart })),
    patch: jest.fn().mockReturnValue(Promise.resolve({ data: mockCart })),
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
const updatedCartItems = {
  id: 'e0c6412f-05e4-4779-b964-86932d4de96a',
  quantity: 3,
};

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

  it('will compute the cart item by brand', () => {
    const { buyerCart } = setup();
    expect(buyerCart.cartItemsByBrand).toEqual(buyerCartItem);
  });

  it('will compute the cart errors', () => {
    const buyerCart = BuyerCart.create({ cart: mockErrorCart });
    expect(buyerCart.cartErrors).toEqual(mockCartErrors);
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
        patch: () => {
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
      buyerCart.updateCartItem(updatedCartItems);
      expect(log).toHaveBeenCalledWith(new Error('Test'));
      buyerCart.fetchCart(cartItems);
      expect(log).toHaveBeenCalledWith(new Error('Test'));
    });
  });

  describe('When updating items to cart', () => {
    it('will post to cart endpoint ', () => {
      const { buyerCart, mockFetchClient } = setup();

      buyerCart.updateCartItem(updatedCartItems);
      expect(mockFetchClient.patch).toHaveBeenCalledWith(
        '/buyer/cart/items/e0c6412f-05e4-4779-b964-86932d4de96a',
        {
          data: {
            attributes: { quantity: 3 },
            id: 'e0c6412f-05e4-4779-b964-86932d4de96a',
            type: 'cart_item',
          },
        },
      );
    });
  });

  describe('When checkout cart', () => {
    it('will post to cart endpoint when checking out cart', () => {
      const { buyerCart, mockFetchClient } = setup();

      buyerCart.checkoutCart();
      expect(mockFetchClient.post).toHaveBeenCalledWith(
        '/shopping/checkout',
        null,
        { timeout: 5000 },
      );
    });
  });

  describe('Fetch cart order', () => {
    it('will fetch cart order', () => {
      const mockFetchClient = {
        fetch: jest
          .fn()
          .mockReturnValue(Promise.resolve({ data: mockCartOrder })),
      };
      const buyerCart = BuyerCart.create(
        { cartOrderData: mockCartOrder },
        {
          client: mockFetchClient,
        },
      );
      buyerCart.fetchCartOrder(mockCartOrder.id);
      expect(mockFetchClient.fetch).toHaveBeenCalledWith(
        `/shopping/orders/${mockCartOrder.id}`,
      );
    });

    it('will calculate the total values for the order', () => {
      const mockFetchClient = {
        fetch: jest
          .fn()
          .mockReturnValue(Promise.resolve({ data: mockCartOrder })),
      };
      const buyerCart = BuyerCart.create(
        { cartOrderData: mockCartOrder },
        {
          client: mockFetchClient,
        },
      );

      expect(buyerCart.cartOrder.subtotal).toEqual(194250);
      expect(buyerCart.cartOrder.shippingFee).toEqual(200);
      expect(buyerCart.cartOrder.total).toEqual(194450);
      expect(buyerCart.cartOrder.totalItems).toEqual(8);
    });

    it('will handle errors', () => {
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
      buyerCart.fetchCartOrder('foo');
      expect(log).toHaveBeenCalledWith(new Error('Test'));
      log.mockRestore();
    });
  });
});
