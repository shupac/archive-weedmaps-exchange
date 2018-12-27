// @flow
import { types } from 'mobx-state-tree';
import Product, { type ProductType } from 'models/product';

export const SellerProduct = types.model('SellerProduct', {
  active: types.boolean,
  categoryNames: types.model({
    departmentName: types.string,
    categoryName: types.maybeNull(types.string),
  }),
  id: types.identifier,
  product: Product,
  quantity: types.number,
  variantCount: types.number,
  zoneCount: types.number,
});

export type SellerProductType = {
  active: boolean,
  categoryNames: {
    departmentName: string,
    categoryName: string,
  },
  id: string,
  product: ProductType,
  quantity: number,
  variantCount: number,
  zoneCount: number,
};

export default SellerProduct;
