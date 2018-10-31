// @flow
import { types } from 'mobx-state-tree';
import { Product } from 'models/product';

const Variant = types.model('CartVariant', {
  id: types.string,
  name: types.string,
  product: Product,
  size: types.number,
  sku: types.string,
  unit: types.string,
});

const CartItem = types.model('CartItem', {
  amount: types.number,
  id: types.string,
  price: types.number,
  variant: Variant,
});

const CartError = types.model('CartError', {
  error: types.string,
  itemId: types.string,
});

const Cart = types.model('CartModel', {
  cartErrors: types.maybe(types.array(CartError)),
  id: types.identifier,
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
