// @flow
import { types } from 'mobx-state-tree';
import type { ImageType } from '../image';

const License = types.model('LicenseModel', {
  number: types.string,
  licenseType: types.string,
  id: types.string,
});

const Brand = types.model('BrandModel', {
  description: types.string,
  id: types.string,
  name: types.string,
  slug: types.string,
  licenses: types.maybeNull(types.array(License)),
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
