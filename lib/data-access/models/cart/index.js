// @flow
import { types } from 'mobx-state-tree';
import get from 'lodash/get';
import CartVariant, { type CartVariantType } from 'models/cart-variant';

const CartItemAllocation = types.model('CartItemAllocation', {
  active: types.maybe(types.boolean),
  amount: types.maybe(types.number),
  currency: types.maybe(types.string),
  id: types.maybe(types.string),
  normalizedPrice: types.maybe(types.number),
  price: types.maybe(types.string),
  zone: types.maybe(
    types.model({
      id: types.string,
    }),
  ),
});

const CartItem = types
  .model('CartItem', {
    id: types.string,
    amount: types.number,
    price: types.number,
    variant: CartVariant,
    allocation: types.maybe(CartItemAllocation),
  })
  .views(self => ({
    get brandName() {
      return get(self, ['variant', 'product', 'brand', 'name'], '');
    },
    get allocatedAmount() {
      return get(self, 'allocation.amount', null);
    },
  }));

const CartError = types.model('CartError', {
  error: types.string,
  itemId: types.string,
});

const Cart = types.model('CartModel', {
  id: types.identifier,
  cartErrors: types.maybe(types.array(CartError)),
  items: types.maybe(types.array(CartItem)),
  shippingFee: types.number,
  subtotal: types.number,
  total: types.number,
});

type DeliveryEta = {
  etaMinUnit: string,
  etaMin: number,
  etaMaxUnit: string,
  etaMax: number,
};

type Brands = {
  slug: string,
  shippingFee: number,
  name: string,
  minimumPurchasePrice: number,
  description: string,
  deliveryEta: DeliveryEta,
  id: string,
};

type Items = {
  id: string,
  amount: number,
  price: number,
  variant: CartVariantType,
};

export type CartType = {
  total: number,
  subtotal: number,
  shippingFee: number,
  cartErrors: any[],
  id: string,
  items: Items[],
  brands: Brands[],
};

export type CartErrorType = {
  error: string,
  itemId: string,
};

export type CartItemType = {
  amount: number,
  id: string,
  price: number,
  variant: CartVariantType,
  brandName: string,
  allocatedAmount?: number,
};

export default Cart;
