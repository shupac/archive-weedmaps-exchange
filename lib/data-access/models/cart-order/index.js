// @flow
import { types } from 'mobx-state-tree';
import PurchaseOrder, { type PurchaseOrderType } from 'models/purchase-order';

const CartOrder = types.model('CartOrder', {
  id: types.string,
  totalItems: types.number,
  subtotal: types.number,
  shippingFee: types.number,
  total: types.number,
  purchaseOrders: types.array(PurchaseOrder),
});

export default CartOrder;

export type CartOrderType = {
  id: string,
  totalItems: number,
  subtotal: number,
  shippingFee: number,
  total: number,
  purchaseOrders: PurchaseOrderType[],
};
