// @flow
import { types } from 'mobx-state-tree';
import License, { type LicenseType } from 'models/license';
import Image, { type ImageType } from 'models/image';

const PurchaseOrderBuyer = types.model('PurchaseOrderBuyer', {
  buyerAddress: types.maybeNull(types.string),
  buyerDeliveryInstructions: types.maybeNull(types.string),
  buyerEmail: types.maybeNull(types.string),
  buyerLicenses: types.array(License),
  buyerLocationName: types.maybeNull(types.string),
  buyerPhone: types.maybeNull(types.string),
});

const PurchaseOrderSeller = types.model('PurchaseOrderSeller', {
  sellerName: types.maybeNull(types.string),
  sellerPhone: types.maybeNull(types.string),
  sellerEmail: types.maybeNull(types.string),
  sellerId: types.string,
  sellerAddress: types.maybeNull(types.string),
  sellerLicenses: types.array(License),
});

const OrderItem = types.model('OrderItem', {
  amount: types.number,
  avatarImage: types.maybe(Image),
  categories: types.model({
    child: types.string,
    parent: types.string,
  }),
  id: types.string,
  price: types.string,
  sku: types.string,
  productId: types.string,
  productName: types.string,
  variantName: types.string,
});

const PurchaseOrder = types.model('PurchaseOrder', {
  buyerData: PurchaseOrderBuyer,
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

export const PurchaseOrders = types.array(
  types.model({
    id: types.string,
    total: types.string,
    subtotal: types.string,
    statusReason: types.string,
    status: types.string,
    shippingFee: types.string,
    sellerData: PurchaseOrderSeller,
    orderDate: types.string,
    givenDeliveryEta: types.model({
      etaMinUnit: types.string,
      etaMin: types.number,
      etaMaxUnit: types.string,
      etaMax: types.number,
    }),
    expectedShipDateMin: types.string,
    expectedShipDateMax: types.string,
    buyerData: PurchaseOrderBuyer,
    orderItems: types.array(types.model({ id: types.string })),
  }),
);

export default PurchaseOrder;

export type OrderItemType = {
  avatarImage: ImageType,
  amount: number,
  categories: {
    child: string,
    parent: string,
  },
  id: string,
  price: string,
  sku: string,
  productId: string,
  productName: string,
  variantName: string,
};

export type PurchaseOrderType = {
  buyerData: {
    buyerAddress: string,
    buyerDeliveryInstructions: string,
    buyerEmail: string,
    buyerLicenses: LicenseType[],
    buyerLocationName: string,
    buyerPhone: string,
  },
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
    sellerId: string,
    sellerAddress: string,
    sellerLicenses: LicenseType[],
  },
  status: string,
  statusReason: string,
  subtotal: string,
  shippingFee: string,
  total: string,
};
