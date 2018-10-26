import { types } from 'mobx-state-tree';

const Location = types.model('LocationModel', {
  source: types.string,
  phoneNumber: types.maybeNull(types.string),
  name: types.string,
  email: types.string,
  deliveryInstructions: types.maybeNull(types.string),
  contactName: types.maybeNull(types.string),
  active: types.boolean,
  id: types.identifier,
  address: types.model('AddressModel', {
    territory: types.string,
    streetAddress: types.string,
    postalCode: types.string,
    longitude: types.number,
    latitude: types.number,
    country: types.string,
    city: types.string,
    id: types.string,
  }),
  licenses: types.array(
    types.model('LicenseModel', {
      number: types.string,
      licenseType: types.string,
      id: types.string,
    }),
  ),
});

export type AddressType = {
  territory: string,
  streetAddress: string,
  postalCode: string,
  longitude: number,
  latitude: number,
  country: string,
  city: string,
  id: string,
};

export type LicensesType = {
  number: string,
  licenseType: string,
  id: string,
};

export type LocationType = {
  source: string,
  phoneNumber: string,
  name: string,
  email: string,
  deliveryInstructions?: string,
  contactName: string,
  active: boolean,
  id: string,
  address: AddressType,
  licenses: LicensesType[],
};

export default Location;
