import { types } from 'mobx-state-tree';
import { ProductType } from 'lib/data-access/models/product';

// TODO: update products with products array types as data is available
const CarouselCategories = types.model({
  slug: types.string,
  position: types.number,
  name: types.string,
  id: types.string,
  products: types.array(
    types.model({
      unit: types.string,
      minPrice: types.null,
      maxPrice: types.null,
      id: types.string,
    }),
  ),
});

export type CarouselCategoriesTypes = {
  slug: string,
  position: number,
  name: string,
  id: string,
  products: ProductType[],
};

export default CarouselCategories;
