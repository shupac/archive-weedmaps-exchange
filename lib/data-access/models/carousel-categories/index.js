import { types } from 'mobx-state-tree';
import Product, { ProductType } from 'lib/data-access/models/product';

const CarouselCategories = types.model({
  slug: types.string,
  position: types.number,
  name: types.string,
  id: types.string,
  products: types.array(Product),
});

export type CarouselCategoriesTypes = {
  slug: string,
  position: number,
  name: string,
  id: string,
  products: ProductType[],
};

export default CarouselCategories;
