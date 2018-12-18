import { types } from 'mobx-state-tree';
import Product, { type ProductType } from 'models/product';
import { type ImageType } from 'models/image';
import { type VariantType } from 'models/variant';

export const PriceRange = types.model('PriceRange', {
  maxPrice: types.number,
  minPrice: types.number,
  unit: types.string,
});

export const BuyerProduct = types.model('BuyerProduct', {
  id: types.identifier,
  priceRanges: types.maybe(types.array(PriceRange)),
  product: Product,
});

export type PriceRangeType = {
  minPrice: number,
  maxPrice: number,
  unit: string,
};

export type BuyerProductType = {
  id: string,
  priceRanges: ?PriceRangeType,
  product: ProductType,
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

export type ProductDetailsType = {
  id: string,
  name: string,
  description: string,
  brand: string,
  minPrice: string,
  maxPrice: string,
  priceUnit: string,
  galleryImages: ImageType[],
  variants: VariantType[],
};

export default BuyerProduct;
