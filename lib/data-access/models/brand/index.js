// @flow
import { types } from 'mobx-state-tree';
import License, { type LicenseType } from 'models/license';

const Brand = types.model('BrandModel', {
  description: types.string,
  id: types.string,
  name: types.string,
  slug: types.string,
  licenses: types.maybeNull(types.array(License)),
});

export type BrandType = {
  description: string,
  id: string,
  name: string,
  slug: string,
  licenses?: LicenseType[],
};

export default Brand;
