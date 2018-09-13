import { types } from 'mobx-state-tree';

const Product = types.model({
  id: types.identifier,
  imageUrl: types.string,
  brand: types.string,
  name: types.string,
  priceUnit: types.string,
  minPrice: types.maybeNull(types.number),
  maxPrice: types.maybeNull(types.number),
  category: types.string,
  outOfStock: types.maybeNull(types.boolean),
});

export type ProductType = {
  id: string,
  imageUrl: string,
  brand: string,
  name: string,
  priceUnit: string,
  minPrice: ?number,
  maxPrice: ?number,
  category: string,
  outOfStock?: boolean,
};

export default Product;
