// @flow
import { types } from 'mobx-state-tree';

const Address = types.model('AddressModel', {
  address: types.string,
  id: types.identifier,
});

export type AddressType = {
  address: string,
  id: string,
};

export default Address;
