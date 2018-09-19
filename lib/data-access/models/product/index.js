import { types } from 'mobx-state-tree';
import Image from '../image';
import Category from '../category';
import Department from '../department';
import Brand from '../brand';
import Variant from '../variant';

const Product = types.model('ProductModel', {
  id: types.identifier,
  name: types.string,
  slug: types.string,
  categories: types.maybe(types.array(Category)),
  avatarImage: Image,
  galleryImages: types.array(Image),
  departments: types.array(types.maybeNull(Department)),
  brand: Brand,
  variants: types.maybeNull(types.array(Variant)),
});

const BuyerProduct = types.model('BuyerProduct', {
  unit: types.string,
  id: types.identifier,
  minPrice: types.maybeNull(types.number),
  maxPrice: types.maybeNull(types.number),
  product: Product,
});

export type ProductCardType = {
  id: string,
  name: string,
  imageUrl: string,
  priceUnit: string,
  brand: string,
  minPrice: ?number,
  maxPrice: ?number,
  category: string,
  outOfStock?: boolean,
};

export default BuyerProduct;
