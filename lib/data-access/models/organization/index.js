import { types } from 'mobx-state-tree';
import License from 'models/license';
import { Address } from 'models/address';
import Location from 'models/location';
import Brand from 'models/brand';

const Organization = types.model('OrganizationModel', {
  contactName: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  id: types.string,
  name: types.string,
  address: types.maybe(Address),
  organizationType: types.string,
  phoneNumber: types.maybeNull(types.string),
  licenses: types.array(License),
  description: types.maybeNull(types.string),
  brands: types.maybe(types.array(Brand)),
  locations: types.maybe(types.array(Location)),
});

export type OrganizationType = {
  contactName: string,
  id: string,
  email: string,
  name: string,
  organizationType: string,
  phoneNumber: string,
};

export default Organization;
