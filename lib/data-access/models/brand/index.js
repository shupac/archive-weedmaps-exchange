// @flow
import { types } from 'mobx-state-tree';
import type { ImageType } from '../image';

const Brand = types.model({
  description: types.string,
  id: types.string,
  name: types.string,
  slug: types.string,
});

export type BrandType = {
  id?: string,
  name?: string,
  slug?: string | null,
  vendorId: number | null,
  description: string,
  avatarImageId: string,
  avatarImage: ImageType,
  insertedAt: string,
  updatedAt: string,
};

export default Brand;
