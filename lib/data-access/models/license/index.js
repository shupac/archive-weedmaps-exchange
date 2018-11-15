// @flow
import { types } from 'mobx-state-tree';

const License = types.model('LicenseModel', {
  id: types.string,
  number: types.string,
  licenseType: types.string,
});

export type LicenseType = {
  id: string,
  number: string,
  licenseType: string,
};

export default License;
