import { types } from 'mobx-state-tree';
import Image from 'models/image';
import Category from 'models/category';
import Brand from 'models/brand';
import Variant from 'models/variant';

const Product = types.model('ProductModel', {
  brand: Brand,
  categories: types.maybe(types.array(Category)),
  departments: types.maybe(types.array(Category)),
  description: types.string,
  id: types.identifier,
  name: types.string,
  slug: types.string,
  avatarImage: types.maybe(Image),
  galleryImages: types.maybe(types.array(Image)),
  variants: types.maybeNull(types.array(Variant)),
});

const BuyerProduct = types.model('BuyerProduct', {
  id: types.identifier,
  maxPrice: types.maybeNull(types.number),
  minPrice: types.maybeNull(types.number),
  product: Product,
  unit: types.string,
});

export type ProductCardType = {
  id: string,
  name: string,
  imageUrl: string,
  brand: string,
  category: string,
  minPrice: ?number,
  maxPrice: ?number,
  priceUnit: string,
  outOfStock?: boolean,
};

export type VariantType = {
  id: string,
  name: string,
  size: string,
  defaultPrice: string,
  unit: string,
};

export type GalleryImageType = {
  id: string,
  smallUrl: string,
  largeUrl: string,
};

export type ProductDetailsType = {
  id: string,
  name: string,
  description: string,
  brand: string,
  minPrice: string,
  maxPrice: string,
  priceUnit: string,
  galleryImages: GalleryImageType[],
  variants: VariantType[],
};

export default BuyerProduct;
