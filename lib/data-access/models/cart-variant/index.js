// @flow
import { types } from 'mobx-state-tree';
import { Product, type ProductType } from 'models/product';

const CartVariant = types.model('CartVariant', {
  id: types.string,
  name: types.string,
  product: Product,
  size: types.number,
  sku: types.string,
  unit: types.string,
});

export type CartVariantType = {
  id: string,
  name: string,
  product: ProductType,
  size: number,
  sku: string,
  unit: string,
};

export default CartVariant;
