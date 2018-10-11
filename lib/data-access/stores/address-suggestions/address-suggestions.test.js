import { getSnapshot } from 'mobx-state-tree';
import { mockSuggestedAddresses } from 'lib/mocks/address-suggestion';
import AddressSuggestionsStore from './';

describe('Address Suggestions Store', () => {
  it('can fetch data from address suggestion endpoint', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue(mockSuggestedAddresses),
    };
    const addressSuggestion = AddressSuggestionsStore.create(
      {},
      { client: mockFetchClient },
    );
    await addressSuggestion.getAddressSuggestions('41 Discovery');
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      '/suggestions?address=41 Discovery',
    );
    expect(getSnapshot(addressSuggestion.suggestedAddresses)).toMatchSnapshot();
  });
  it('should handle setSuggestedAddress and clearAddressSuggestions', async () => {
    const addressSuggestion = AddressSuggestionsStore.create({}, {});
    addressSuggestion.setSuggestedAddresses(mockSuggestedAddresses);
    expect(addressSuggestion.suggestedAddresses).toEqual(
      mockSuggestedAddresses,
    );
    addressSuggestion.clearAddressSuggestions();
    expect(addressSuggestion.suggestedAddresses).toEqual([]);
  });
  it('should handle setQuery', () => {
    const addressSuggestion = AddressSuggestionsStore.create({}, {});
    addressSuggestion.setQuery('41 Discovery');
    expect(addressSuggestion.addressInput).toEqual('41 Discovery');
  });
});
