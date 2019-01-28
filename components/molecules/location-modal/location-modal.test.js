import React from 'react';
import { shallow } from 'enzyme';
import { mockFormLocation } from 'mocks/location';
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

function setup() {
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
  const wrapper = shallow(
    <LocationModal location={defaultLocation} store={store} />,
  );
  const instance = wrapper.instance();
  return { wrapper, instance, store };
}

describe('LocationModal', () => {
  it('should render the location modal', () => {
    const { store } = setup();
    const component = (
      <LocationModal location={defaultLocation} store={store} />
    );
    const wrapper = shallow(component);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(Modal).exists()).toEqual(true);
  });

  it('should be able to pop a success toast  ', () => {
    const { instance, store } = setup();
    const notifyToast = jest.spyOn(store.uiStore, 'notifyToast');
    const notification = {
      title: 'Location Success',
      body: 'Your location has been saved',
      autoDismiss: 3000,
      status: 'SUCCESS',
    };
    instance.onConfirmToast(true);
    expect(notifyToast).toHaveBeenCalledWith(notification);
  });

  it('should be able to pop an error toast', () => {
    const { instance, store } = setup();
    const notifyToast = jest.spyOn(store.uiStore, 'notifyToast');
    const notification = {
      title: 'Location Error',
      body:
        'There was a problem saving your location. Please check the address and try again',
      autoDismiss: 8000,
      status: 'ERROR',
    };
    instance.onConfirmToast(false);
    expect(notifyToast).toHaveBeenCalledWith(notification);
  });

  it('should create new location in absence of location id ', async () => {
    const { instance, store } = setup();
    const createNewLocation = jest
      .spyOn(store.buyerSettings, 'createNewLocation')
      .mockReturnValue(true);
    instance.onSubmit(mockFormLocation);
    expect(await createNewLocation).toHaveBeenCalled();
  });

  it('should update location when location id is present ', async () => {
    const { instance, store } = setup();
    const patchLocation = jest
      .spyOn(store.buyerSettings, 'patchLocation')
      .mockReturnValue(true);
    instance.onSubmit({ id: '1234' });
    expect(await patchLocation).toHaveBeenCalled();
  });
});
