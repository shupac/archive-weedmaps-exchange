// @flow
import { types } from 'mobx-state-tree';
import License, { type LicenseType } from 'models/license';

const Brand = types.model('BrandModel', {
  description: types.maybe(types.string),
  id: types.string,
  minimumPurchasePrice: types.number,
  name: types.string,
  shippingFee: types.maybe(types.number),
  slug: types.maybe(types.string),
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

type DeliveryEta = {
  etaMinUnit: string,
  etaMin: number,
  etaMaxUnit: string,
  etaMax: number,
};

export type Brands = {
  slug?: string,
  shippingFee: number,
  name: string,
  minimumPurchasePrice: number,
  description?: string,
  deliveryEta: DeliveryEta,
  id: string,
};

type SettingsDeliveryEta = {
  eta_min_unit: string,
  eta_min: number,
  eta_max_unit: string,
  eta_max: number,
};

export type SettingsBrands = {
  minimum_purchase_price: number | string,
  shipping_fee: number | string,
  delivery_eta: SettingsDeliveryEta,
  name: string,
  id: string,
};

export type BrandType = {
  description: string,
  id: string,
  name: string,
  slug: string,
  licenses?: LicenseType[],
};

export default Brand;
