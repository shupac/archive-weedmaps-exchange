import React from 'react';
import { shallow } from 'enzyme';
import { LICENSE_TYPES } from 'lib/common/constants';
import { mockSuggestedAddresses } from 'lib/mocks/address-suggestion';
import ModalWithHeader from 'components/molecules/modal-with-header';
import { ModalWrapper as AddLocationModal } from './';

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
  uiStore: {
    modalIsOpen: true,
    onCloseModal: jest.fn(),
  },
  addressSuggestions: {
    suggestedAddresses: mockSuggestedAddresses,
    addressInput: '',
    setQuery: jest.fn(),
    clearAddressSuggestions: jest.fn(),
    getAddressSuggestions: jest.fn(),
    setAddressCommitted: jest.fn(),
  },
};

describe('AddLocationModal', () => {
  it('should render the location modal', () => {
    const component = (
      <AddLocationModal
        location={defaultLocation}
        licenseTypes={LICENSE_TYPES}
        store={store}
      />
    );
    const wrapper = shallow(component);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(ModalWithHeader).exists()).toEqual(true);
  });
});
