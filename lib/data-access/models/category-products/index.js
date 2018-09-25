import { types } from 'mobx-state-tree';
import { ProductType } from 'lib/data-access/models/product';

// TODO: update products with products array types as data is available
const CategoryProducts = types.model('CategoryProducts', {
  slug: types.string,
  position: types.number,
  name: types.string,
  id: types.string,
  products: types.array(
    types.model({
      unit: types.string,
      minPrice: types.number,
      maxPrice: types.number,
      id: types.string,
    }),
  ),
});

export type CategoryProductsType = {
  id: string,
  name: string,
  slug: string,
  position: number,
  products: ProductType[],
};

export default CategoryProducts;
