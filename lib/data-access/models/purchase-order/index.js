// @flow
import { types } from 'mobx-state-tree';
import License, { type LicenseType } from 'models/license';
import Image, { type ImageType } from 'models/image';
import { SELLER_STATUS_OPTIONS } from 'lib/common/constants';

const PurchaseOrderBuyer = types.model('PurchaseOrderBuyer', {
  buyerAddress: types.maybeNull(types.string),
  buyerDeliveryInstructions: types.maybeNull(types.string),
  buyerEmail: types.maybeNull(types.string),
  buyerLicenses: types.array(License),
  buyerLocationName: types.maybeNull(types.string),
  buyerPhone: types.maybeNull(types.string),
  buyerName: types.maybeNull(types.string),
  buyerContactName: types.maybeNull(types.string),
});

const PurchaseOrderSeller = types.model('PurchaseOrderSeller', {
  sellerName: types.maybeNull(types.string),
  sellerPhone: types.maybeNull(types.string),
  sellerEmail: types.maybeNull(types.string),
  sellerId: types.string,
  sellerAddress: types.maybeNull(types.string),
  sellerLicenses: types.array(License),
  brandName: types.maybeNull(types.string),
  brandId: types.maybeNull(types.string),
  sellerContactName: types.maybeNull(types.string),
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
  productActive: types.boolean,
});

const PurchaseOrder = types
  .model('PurchaseOrder', {
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
    orderItems: types.maybe(
      types.union(
        types.array(OrderItem),
        types.array(types.model({ id: types.string })),
      ),
    ),
    sellerData: PurchaseOrderSeller,
    shippingFee: types.string,
    status: types.string,
    statusReason: types.string,
    subtotal: types.string,
    total: types.string,
    zoneName: types.maybeNull(types.string),
  })
  .views(self => ({
    get statusChangeOptions() {
      const changeStatus = {
        not_started: ['in_progress', 'shipped', 'completed'],
        in_progress: ['shipped', 'completed', 'canceled'],
        shipped: ['completed'],
      };

      const possibleStatuses = changeStatus[self.status] || [];

      const possibleOptions = possibleStatuses.map(
        status => SELLER_STATUS_OPTIONS[status],
      );
      return possibleOptions;
    },
    get selectedOption() {
      return SELLER_STATUS_OPTIONS[self.status];
    },
  }))
  .actions(self => ({
    setStatus(status) {
      self.status = status;
    },
  }));

export default PurchaseOrder;

export const PurchaseOrderFilterItem = types.model({
  label: types.string,
  id: types.string,
});

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
  productActive: boolean,
  productId: string,
  productName: string,
  variantName: string,
};

type CategorySelected = {
  value: string,
  text: string,
};

export type PurchaseOrderType = {
  buyerData: {
    buyerAddress: string,
    buyerDeliveryInstructions: string,
    buyerEmail: string,
    buyerLicenses: LicenseType[],
    buyerLocationName: string,
    buyerPhone: string,
    buyerName: string,
    buyerContactName?: string,
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
    sellerName?: string,
    sellerPhone: string,
    sellerEmail: string,
    sellerId: string,
    sellerAddress: string,
    brandName: string,
    sellerContactName?: string,
    sellerLicenses: LicenseType[],
  },
  status: string,
  statusReason: string,
  subtotal: string,
  shippingFee: string,
  total: string,
  setStatus: string => void,
  statusChangeOptions: CategorySelected[],
  selectedOption: CategorySelected,
};

export type PurchaseOrderMetaType = {
  totalEntries: number,
  pageSize: number,
  pageNumber: number,
};
