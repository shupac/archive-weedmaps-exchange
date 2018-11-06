// @flow
import { getEnv, getParent, types } from 'mobx-state-tree';
import { when } from 'mobx';
import get from 'lodash/get';
import Cart, { type CartType } from 'lib/data-access/models/cart';

type CartItems = { quantity: number, variant_id: string };

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
      // $FlowFixMe
      when(() => getParent(self).authStore.loggedIn, () => self.fetchCart());
    },
    async fetchCart() {
      try {
        const { data: cartData } = await getEnv(self).client.fetch(
          `/buyer/cart`,
        );

        self.setCart(cartData);
      } catch (e) {
        console.error('cart error', e);
      }
    },
    async addCartItems(items: CartItems[]) {
      const payload = { data: [...items] };

      try {
        const { data: cartData } = await getEnv(self).client.post(
          `/buyer/cart/items`,
          payload,
        );

        console.log('cartData items', cartData.items.length);

        self.setCart(cartData);
        return cartData;
      } catch (e) {
        console.error(e);
      }
      return null;
    },
    setCart(cartResp) {
      self.cart = cartResp;
    },
  }));

export type BuyerCartType = {
  fetchCart: () => void,
  addCartItems: (CartItems[]) => CartType,
  cart: CartType,
  cartItemCount: number,
};

export default BuyerCart;
