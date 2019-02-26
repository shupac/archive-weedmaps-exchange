// @flow
import { getEnv, types } from 'mobx-state-tree';
import get from 'lodash/get';
import groupBy from 'lodash.groupby';
import Cart, {
  type CartType,
  type CartErrorType,
  type CartItemType,
} from 'models/cart';
import CartOrder, { type CartOrderType } from 'models/cart-order';
import { Router } from 'lib/routes';
import logger from 'lib/common/logger';

type CartItems = { quantity: number, variant_id: string };

const BuyerCart = types
  .model('BuyerCart', {
    cart: types.maybeNull(Cart),
    cartOrderData: types.maybeNull(CartOrder),
    loadingCart: true,
    submittingCart: false,
  })
  .volatile(() => ({
    shipmentNote: {},
  }))
  .views(self => ({
    get cartItems() {
      return get(self.cart, 'items', []);
    },
    get cartItemCount() {
      return this.cartItems.length >= 1 ? this.cartItems.length : false;
    },
    get cartItemsByBrand() {
      const groups = groupBy(
        this.cartItems,
        prod => prod.variant.product.brand.id,
      );

      const groupSortedByBrandName = Object.keys(groups)
        .sort((a, b) => {
          const brandA = groups[a][0].brandName;
          const brandB = groups[b][0].brandName;
          if (brandA < brandB) {
            return -1;
          }
          if (brandA > brandB) {
            return 1;
          }

          return 0;
        })
        .reduce((acc, brandId) => {
          acc[brandId] = groups[brandId];
          return acc;
        }, {});

      return Object.values(groupSortedByBrandName);
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
    get cartOrder() {
      if (!self.cartOrderData) return null;

      let subtotal = 0;
      let shippingFee = 0;
      let total = 0;
      let totalItems = 0;

      self.cartOrderData.purchaseOrders.forEach(po => {
        subtotal += Number(po.subtotal);
        shippingFee += Number(po.shippingFee);
        total += Number(po.total);
        totalItems += po.orderItems.length;
      });

      return {
        ...self.cartOrderData,
        subtotal,
        shippingFee,
        total,
        totalItems,
      };
    },
    get hasShipmentNotes() {
      return Object.keys(self.shipmentNote).length >= 1;
    },
  }))
  .actions(self => ({
    afterAttach() {
      if (!IS_SERVER) {
        const storedNotes =
          getEnv(self).localStorage.getInLocal('shipmentNotes') || false;

        if (typeof storedNotes === 'string') {
          self.setShipmentNote(JSON.parse(storedNotes));
        }
      }
    },
    async fetchCart() {
      self.setCartLoadingStatus(true);
      try {
        const { data: cartData } = await getEnv(self).client.fetch(
          `/buyer/cart`,
        );

        self.setCart(cartData);
      } catch (e) {
        logger.error('cart error', e);
      } finally {
        self.setCartLoadingStatus(false);
        self.setCartSubmittingStatus(false);
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
        logger.error(e);
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
        logger.error('updateCartItem', e);
      }
    },
    async checkoutCart() {
      self.setCartSubmittingStatus(true);
      // reseting submitting flag in component unmount upon success or
      // after fetchCart upon error
      const payload = self.hasShipmentNotes
        ? { data: { buyer_notes: self.shipmentNote } }
        : null;

      try {
        const { data } = await getEnv(self).client.post(
          `/shopping/checkout`,
          payload,
          { timeout: 5000 },
        );
        Router.pushRoute(`/buyer/cart/confirmation/${data.id}`);
      } catch (e) {
        logger.error(e);
        self.fetchCart();
      } finally {
        self.setShipmentNote({});
      }
    },
    async fetchCartOrder(orderId: string) {
      try {
        const { data } = await getEnv(self).client.fetch(
          `/shopping/orders/${orderId}`,
        );

        self.setCartOrderData(data);
      } catch (e) {
        logger.error(e);
      }
    },
    setCart(cartResp) {
      self.cart = cartResp;
    },
    setCartOrderData(cartOrderData) {
      self.cartOrderData = cartOrderData;
    },
    setCartLoadingStatus(flag) {
      self.loadingCart = flag;
    },
    setCartSubmittingStatus(flag) {
      self.submittingCart = flag;
    },
    setShipmentNote(note) {
      self.shipmentNote = note;

      getEnv(self).localStorage.setInLocal(
        'shipmentNotes',
        JSON.stringify(self.shipmentNote),
      );
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
  submittingCart: boolean,
  checkoutCart: () => void,
  updateCartItem: ({ id: string, quantity: number }) => CartType,
  cartErrors: CartErrorType[],
  cartItemsByBrand: CartItemType[],
  cartErrorsByItemId: {
    [string]: {
      error: string,
      itemId: string,
    },
  },
  setCartSubmittingStatus: boolean => void,
  shipmentNote: { [string]: string },
  setShipmentNote: ({ [string]: string }) => void,
  allItemsUnavailable: boolean,
};

export default BuyerCart;
