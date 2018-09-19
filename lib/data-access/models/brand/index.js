// @flow
import { types } from 'mobx-state-tree';
import Image from '../image';
import type { ImageType } from '../image';

const Brand = types.model({
  vendorId: types.number,
  slug: types.string,
  name: types.string,
  id: types.string,
  description: types.string,
  avatarImage: types.null,
  licenses: types.model({
    updatedAt: types.null,
    number: types.null,
    licenseType: types.null,
    insertedAt: types.null,
    id: types.string,
  }),
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
