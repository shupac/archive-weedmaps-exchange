// @flow
import { getEnv, getParent, types } from 'mobx-state-tree';
import { when } from 'mobx';
import get from 'lodash/get';
import groupBy from 'lodash.groupby';
import CartOrder, { type CartOrderType } from 'models/cart-order';
import mockCartOrder from 'lib/mocks/cart-order';
import Cart, {
  type CartType,
  type CartErrorType,
  type CartItemType,
} from 'models/cart';

type CartItems = { quantity: number, variant_id: string };

const BuyerCart = types
  .model('BuyerCart', {
    cart: types.maybeNull(Cart),
    cartOrder: types.maybeNull(CartOrder),
    loadingCart: true,
  })
  .views(self => ({
    get cartItemCount() {
      const cartItems = get(self.cart, 'items', []);
      return cartItems.length >= 1 ? cartItems.length : false;
    },
    get cartItemsByBrand() {
      const cartItems = get(self.cart, 'items', []);
      const groups =
        groupBy(cartItems, prod => prod.variant.product.brand.id) || [];
      return Object.values(groups);
    },
    get cartErrors() {
      return get(self.cart, 'cartErrors', []);
    },
    get cartErrorsByItemId() {
      return this.cartErrors.reduce((cartErrors, error) => {
        cartErrors[error.itemId] = error;
        return cartErrors;
      }, {});
    },
  }))
  .actions(self => ({
    // Fetch the cart immediately after store creation
    afterAttach() {
      // $FlowFixMe
      when(() => getParent(self).authStore.loggedIn, () => self.fetchCart());
    },
    async fetchCart() {
      self.setCartLoadingStatus(true);
      try {
        const { data: cartData } = await getEnv(self).client.fetch(
          `/buyer/cart`,
        );

        self.setCart(cartData);
      } catch (e) {
        console.error('cart error', e);
      } finally {
        self.setCartLoadingStatus(false);
      }
    },
    async addCartItems(items: CartItems[]) {
      const payload = { data: [...items] };

      try {
        const { data: cartData } = await getEnv(self).client.post(
          `/buyer/cart/items`,
          payload,
        );

        self.setCart(cartData);
        return cartData;
      } catch (e) {
        console.error(e);
      }
      return null;
    },
    async updateCartItem(item: { id: string, quantity: number }) {
      const payload = {
        data: {
          type: 'cart_item',
          id: item.id,
          attributes: {
            quantity: item.quantity,
          },
        },
      };

      try {
        const { data: cartData } = await getEnv(self).client.patch(
          `/buyer/cart/items/${item.id}`,
          payload,
        );
        self.setCart(cartData);
      } catch (e) {
        console.error('updateCartItem', e);
      }
    },
    async checkoutCart() {
      try {
        await getEnv(self).client.post(`/shopping/checkout`);
      } catch (e) {
        console.error(e);
      }
    },
    fetchCartOrder() {
      self.setCartOrder(mockCartOrder);
    },
    setCart(cartResp) {
      self.cart = cartResp;
    },
    setCartOrder(cartOrder) {
      self.cartOrder = cartOrder;
    },
    setCartLoadingStatus(flag) {
      self.loadingCart = flag;
    },
  }));

export type BuyerCartType = {
  fetchCart: () => CartType,
  fetchCartOrder: string => void,
  addCartItems: (CartItems[]) => CartType,
  cart: CartType,
  cartItemCount: number,
  cartOrder: CartOrderType,
  loadingCart: boolean,
  checkoutCart: () => void,
  updateCartItem: ({ id: string, quantity: number }) => CartType,
  cartErrors: CartErrorType[],
  cartItemsByBrand: CartItemType[],
  cartErrorsByItemId: { [string]: string },
};

export default BuyerCart;
