// @flow
import { types } from 'mobx-state-tree';
import { type ImageType } from 'models/image';
import { Address, type AddressType } from 'models/address';
import License, { type LicenseType } from 'models/license';

const Brand = types.model('BrandModel', {
  id: types.identifier,
  description: types.maybe(types.string),
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
  address: types.maybe(Address),
  contactName: types.maybeNull(types.string),
  phoneNumber: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
});

type DeliveryEtaType = {
  etaMin: number,
  etaMax: number,
  etaMinUnit: string,
  etaMaxUnit: string,
};

export type BrandType = {
  id: string,
  name: string,
  description?: string,
  slug?: string,
  email?: string,
  address?: AddressType,
  contactName?: string,
  phoneNumber?: string,
  avatarImage: ImageType,
  licenses?: LicenseType[],
  minimumPurchasePrice?: number,
  shippingFee?: number,
  deliveryEta?: DeliveryEtaType,
};

export type BrandInputType = {
  id: string,
  name?: string,
  description?: string,
  slug?: string,
  email?: string,
  address?: string,
  contactName?: string,
  phoneNumber?: string,
  avatarImage?: ImageType,
  licenses?: LicenseType[],
  minimumPurchasePrice?: number,
  shippingFee?: number,
  deliveryEta?: DeliveryEtaType,
};

export default Brand;
