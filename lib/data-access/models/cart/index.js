// @flow
import { types } from 'mobx-state-tree';

const CartItem = types.model({
  variantId: types.string,
  price: types.number,
  amount: types.number,
  id: types.identifier,
});

const CartError = types.model('CartError', {
  error: types.string,
  itemId: types.string,
});

const Cart = types.model('CartModel', {
  total: types.number,
  subtotal: types.number,
  shippingFee: types.number,
  cartErrors: types.maybeNull(types.array(CartError)),
  id: types.identifier,
  items: types.maybeNull(types.array(CartItem)),
  brands: types.array(
    types.model({
      slug: types.string,
      shippingFee: types.number,
      name: types.string,
      minimumPurchasePrice: types.number,
      description: types.string,
      deliveryEta: types.model({
        etaMinUnit: types.string,
        etaMin: types.number,
        etaMaxUnit: types.string,
        etaMax: types.number,
      }),
      id: types.string,
    }),
  ),
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
  variantId: string,
  price: number,
  amount: number,
  id: string,
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

export default Cart;
