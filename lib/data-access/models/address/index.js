// @flow
import { types } from 'mobx-state-tree';

const AddressSuggestion = types.model('AddressSuggestionModel', {
  address: types.string,
  id: types.string,
});

export const Address = types.model('AddressModel', {
  territory: types.maybe(types.string),
  streetAddress: types.maybe(types.string),
  postalCode: types.maybe(types.string),
  longitude: types.maybe(types.number),
  latitude: types.maybe(types.number),
  country: types.maybe(types.string),
  city: types.maybe(types.string),
  id: types.string,
});

export type AddressType = {
  address: string,
  id: string,
};

export default AddressSuggestion;
