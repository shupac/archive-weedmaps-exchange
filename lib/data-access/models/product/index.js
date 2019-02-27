import { types } from 'mobx-state-tree';
import Category, { type CategoryType } from 'models/category';
import Image, { type ImageType } from 'models/image';
import Brand, { type BrandType } from 'models/brand';
import Variant, { type VariantType } from 'models/variant';

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
  containsCannabis: types.maybeNull(types.boolean),
});

export type ProductType = {
  avatarImage: ?ImageType,
  brand: BrandType,
  categories: ?(CategoryType[]),
  departments: ?(CategoryType[]),
  description: string,
  id: string,
  name: string,
  slug: string,
  galleryImages: ImageType[],
  variants: VariantType[],
  containsCannabis: boolean,
};

export default Product;
