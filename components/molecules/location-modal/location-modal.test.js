import React from 'react';
import { shallow } from 'enzyme';
import { mockSuggestedAddresses } from 'lib/mocks/address-suggestion';
import Modal from 'components/atoms/modal';
import UiStore from 'lib/data-access/stores/ui';
import BuyerSettings from 'lib/data-access/stores/buyer-settings';
import { LocationModal } from './';

const defaultLocation = {
  name: '',
  address: '',
  instructions: '',
  contact: '',
  phone: '',
  email: '',
  licenses: [],
};

const store = {
  uiStore: UiStore.create({
    modalIsOpen: true,
    closeModal: jest.fn(),
  }),
  buyerSettings: BuyerSettings.create(),
  addressSuggestions: {
    suggestedAddresses: mockSuggestedAddresses,
    addressInput: '',
    setQuery: jest.fn(),
    clearAddressSuggestions: jest.fn(),
    getAddressSuggestions: jest.fn(),
    setAddressCommitted: jest.fn(),
  },
};

describe('LocationModal', () => {
  it('should render the location modal', () => {
    const component = (
      <LocationModal location={defaultLocation} store={store} />
    );
    const wrapper = shallow(component);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(Modal).exists()).toEqual(true);
  });
});
