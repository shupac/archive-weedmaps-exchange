import { types } from 'mobx-state-tree';
import {
  BuyerProduct,
  type ProductCardType,
} from 'lib/data-access/models/product';

// @TODO: position should not be null
const CategoryProducts = types.model('CategoryProducts', {
  slug: types.string,
  position: types.maybeNull(types.number),
  name: types.string,
  id: types.string,
  buyerProducts: types.array(BuyerProduct),
});

export type CategoryProductsType = {
  id: string,
  name: string,
  slug: string,
  position: number,
  products: ProductCardType[],
};

export default CategoryProducts;
