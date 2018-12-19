// @flow
import { types } from 'mobx-state-tree';
import License, { type LicenseType } from 'models/license';

const Brand = types.model('BrandModel', {
  description: types.string,
  id: types.string,
  minimumPurchasePrice: types.number,
  name: types.string,
  shippingFee: types.maybe(types.number),
  slug: types.string,
  licenses: types.maybeNull(types.array(License)),
  deliveryEta: types.maybe(
    types.model({
      etaMin: types.number,
      etaMax: types.number,
      etaMinUnit: types.string,
      etaMaxUnit: types.string,
    }),
  ),
  avatarImage: types.maybe(types.model({ id: types.string })),
});

export type BrandType = {
  description: string,
  id: string,
  name: string,
  slug: string,
  licenses?: LicenseType[],
};

export default Brand;
