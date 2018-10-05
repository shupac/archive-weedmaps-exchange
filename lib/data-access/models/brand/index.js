// @flow
import { types } from 'mobx-state-tree';

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
  description: string,
  id: string,
  name: string,
  slug: string,
};

export default Brand;
