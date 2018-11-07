// @flow
import { types } from 'mobx-state-tree';

const Location = types.model('PurchaseOrderLocation', {
  id: types.string,
  name: types.string,
  address: types.string,
});

const Seller = types.model('PurchaseOrderSeller', {
  id: types.string,
  name: types.string,
  phone: types.string,
  email: types.string,
  location: Location,
});

const PurchaseOrder = types.model('PurchaseOrder', {
  id: types.string,
  sellerData: Seller,
});

export default PurchaseOrder;

export type PurchaseOrderType = {
  id: string,
  sellerData: {
    id: string,
    name: string,
    phone: string,
    email: string,
    location: {
      id: string,
      name: string,
      address: string,
    },
  },
};
