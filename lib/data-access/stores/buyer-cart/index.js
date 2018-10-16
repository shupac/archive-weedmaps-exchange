import { getEnv, types } from 'mobx-state-tree';
import get from 'lodash/get';
import Cart from 'lib/data-access/models/cart';

const BuyerCart = types
  .model('BuyerCart', {
    cart: types.maybeNull(Cart),
  })
  .views(self => ({
    get cartItemCount() {
      const cartItems = get(self.cart, 'items', []);
      return cartItems.length >= 1 ? cartItems.length : false;
    },
  }))
  .actions(self => ({
    // Fetch the cart immediately after store creation
    afterAttach() {
      self.fetchCart();
    },
    async fetchCart() {
      try {
        const { data: cartData } = await getEnv(self).client.fetch(
          `/buyer/cart`,
        );
        self.setCart(cartData);
      } catch (e) {
        console.log('cart error', e);
      }
    },
    setCart(cartResp) {
      self.cart = cartResp;
    },
  }));

export type BuyerCartType = {
  mockAddToCart: () => string,
};

export default BuyerCart;
