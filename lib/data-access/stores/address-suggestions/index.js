import { types, getEnv } from 'mobx-state-tree';
import Address, {
  type AddressType,
} from 'lib/data-access/models/address-suggestion';

const AddressSuggestionsStore = types
  .model('AddressSuggestionsStore', {
    suggestedAddresses: types.array(Address),
    addressInput: '',
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
          self.setSuggestedAddresses(results);
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
  }));

export type AddressSuggestionsType = {
  clearAddressSuggestion: () => void,
  getAddressSuggestions: () => void,
  suggestedAddresses: AddressType[],
  addressInput: string,
};

export default AddressSuggestionsStore;
