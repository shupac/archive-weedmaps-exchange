// @flow
import { types } from 'mobx-state-tree';
import CartVariant, { type CartVariantType } from 'models/cart-variant';
import License, { type LicenseType } from 'models/license';

const PurchaseOrderSeller = types.model('PurchaseOrderSeller', {
  sellerName: types.maybeNull(types.string),
  sellerPhone: types.maybeNull(types.string),
  sellerEmail: types.maybeNull(types.string),
  sellerAddress: types.maybeNull(types.string),
  sellerLicenses: types.array(License),
});

const OrderItem = types.model('OrderItem', {
  amount: types.number,
  categories: types.model({
    child: types.string,
    parent: types.string,
  }),
  id: types.string,
  price: types.string,
  productName: types.string,
  sku: types.string,
  variant: CartVariant,
  variantName: types.string,
});

const PurchaseOrder = types.model('PurchaseOrder', {
  expectedShipDateMax: types.string,
  expectedShipDateMin: types.string,
  givenDeliveryEta: types.maybe(
    types.model({
      etaMin: types.number,
      etaMax: types.number,
      etaMinUnit: types.string,
      etaMaxUnit: types.string,
    }),
  ),
  id: types.string,
  orderDate: types.string,
  orderItems: types.maybe(types.array(OrderItem)),
  sellerData: PurchaseOrderSeller,
  shippingFee: types.string,
  status: types.string,
  statusReason: types.string,
  subtotal: types.string,
  total: types.string,
});

export default PurchaseOrder;

type OrderItemType = {
  amount: number,
  categories: {
    child: string,
    parent: string,
  },
  id: string,
  price: string,
  productName: string,
  sku: string,
  variant: CartVariantType,
  variantName: string,
};

export type PurchaseOrderType = {
  expectedShipDateMax: string,
  expectedShipDateMin: string,
  givenDeliveryEta?: {
    etaMin: number,
    etaMax: number,
    etaMinUnit: string,
    etaMaxUnit: string,
  },
  id: string,
  orderDate: string,
  orderItems: OrderItemType[],
  sellerData: {
    sellerName: string,
    sellerPhone: string,
    sellerEmail: string,
    sellerAddress: string,
    sellerLicenses: LicenseType[],
  },
  status: string,
  statusReason: string,
  subtotal: string,
  shippingFee: string,
  total: string,
};
