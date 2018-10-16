// @flow
import { types } from 'mobx-state-tree';

const AddressSuggestion = types.model('AddressSuggestionModel', {
  address: types.string,
  id: types.string,
});

export const Address = types.model('AddressModel', {
  territory: types.string,
  streetAddress: types.string,
  postalCode: types.string,
  longitude: types.number,
  latitude: types.number,
  country: types.string,
  city: types.string,
  id: types.string,
});

export type AddressType = {
  address: string,
  id: string,
};

export default AddressSuggestion;
