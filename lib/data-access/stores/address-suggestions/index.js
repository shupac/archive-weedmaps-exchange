// @flow
import { types, getEnv } from 'mobx-state-tree';
import AddressSuggestion, {
  type AddressType,
} from 'lib/data-access/models/address';

const AddressSuggestionsStore = types
  .model('AddressSuggestionsStore', {
    suggestedAddresses: types.array(AddressSuggestion),
    addressInput: '',
    isAddressCommitted: false,
  })
  .actions(self => ({
    clearAddressSuggestions() {
      self.suggestedAddresses = [];
    },
    async getAddressSuggestions(addressQuery) {
      if (addressQuery) {
        try {
          const results = await getEnv(self).client.fetch(
            `/suggestions?address=${addressQuery}`,
          );
          self.setSuggestedAddresses(results.data);
        } catch (e) {
          console.log(e);
        }
      }
    },
    setSuggestedAddresses(addresses) {
      self.suggestedAddresses = addresses;
    },
    setQuery(input) {
      self.addressInput = input;
    },
    setAddressCommitted(flag) {
      self.isAddressCommitted = flag;
    },
  }));

export type AddressSuggestionsType = {
  suggestedAddresses: AddressType[],
  isAddressCommitted: boolean,
  clearAddressSuggestion: () => void,
  getAddressSuggestions: string => void,
  addressInput: string,
  setAddressCommitted: boolean => void,
  setQuery: string => void,
  clearAddressSuggestions: () => void,
};

export default AddressSuggestionsStore;
