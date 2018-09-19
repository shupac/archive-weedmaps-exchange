// @flow
import { types } from 'mobx-state-tree';

const Category = types.model('CategoryModel', {
  id: types.identifier,
  name: types.string,
  parentVendorId: types.maybe(types.string),
  parentCategoryId: types.maybe(types.string),
  slug: types.string,
  vendorId: types.maybe(types.number),
  insertedAt: types.maybe(types.string),
  updatedAt: types.maybe(types.string),
});

export type CategoryType = {
  id?: string,
  name?: string,
  parentVendorId?: number | null,
  parentCategoryId?: number | null,
  slug?: string,
  vendorId?: number,
  insertedAt?: string,
  updatedAt?: string,
};

export default Category;
