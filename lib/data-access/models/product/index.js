import { types } from 'mobx-state-tree';
import Image from 'models/image';
import Category from 'models/category';
import Brand from 'models/brand';
import Variant from 'models/variant';

export const Product = types.model('ProductModel', {
  avatarImage: types.maybe(Image),
  brand: Brand,
  categories: types.maybe(types.array(Category)),
  departments: types.maybe(types.array(Category)),
  description: types.string,
  id: types.identifier,
  name: types.string,
  slug: types.string,
  galleryImages: types.maybe(types.array(Image)),
  variants: types.maybe(types.array(Variant)),
});

export const PriceRanges = types.model('PriceRanges', {
  maxPrice: types.number,
  minPrice: types.number,
  unit: types.string,
});

export const BuyerProduct = types.model('BuyerProduct', {
  id: types.identifier,
  priceRanges: types.maybe(types.array(PriceRanges)),
  product: Product,
});

export type PriceRangeType = {
  minPrice: number,
  maxPrice: number,
  unit: string,
};

export type ProductCardType = {
  id: string,
  name: string,
  imageUrl: string,
  brand: string,
  category: string,
  priceRanges: PriceRangeType[],
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
