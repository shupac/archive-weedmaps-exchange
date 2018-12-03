// @flow
import React from 'react';
import { type StoreType } from 'lib/types/store';
import { inject, observer } from 'mobx-react';
import {
  createNewLocation,
  type LocationType,
  type LocationValueType,
} from 'models/location';
import Modal from 'components/atoms/modal';
import LocationForm from './location-form';
import { LocationModalWrapper } from './styles';

type Props = {
  store: StoreType,
  location: LocationType,
  header: string,
};

class LocationModal extends React.Component<Props> {
  componentDidMount() {
    const { addressSuggestions, buyerSettings } = this.props.store;
    const { editingLocation } = buyerSettings;

    if (!editingLocation) {
      addressSuggestions.setQuery('');
      addressSuggestions.setAddressCommitted(false);
      return;
    }

    const { city, country, streetAddress, territory } = editingLocation.address;

    if (streetAddress) {
      addressSuggestions.setQuery(
        `${streetAddress}, ${city}, ${territory}, ${country.toUpperCase()}`,
      );
    } else {
      addressSuggestions.setQuery('');
    }
    addressSuggestions.setAddressCommitted(true);
  }

  onSubmit = (location: LocationValueType) => {
    const { buyerSettings, uiStore } = this.props.store;

    if (!location.id) {
      const newLicenses = location.licenses.map(item => ({
        license_type: item.licenseType,
        number: item.number,
      }));

      delete location.id;
      location.licenses = newLicenses;

      buyerSettings.createNewLocation(location);
    } else {
      buyerSettings.patchLocation(location);
    }
    uiStore.closeModal();
  };

  render() {
    const { store } = this.props;
    const { editingLocation } = store.buyerSettings;

    const header = editingLocation ? 'Edit Location' : 'Add Location';

    return (
      <Modal header={header} width="644px">
        <LocationModalWrapper>
          <LocationForm
            location={editingLocation || createNewLocation()}
            onSubmit={this.onSubmit}
          />
        </LocationModalWrapper>
      </Modal>
    );
  }
}

const LocationModalWithStore = inject('store')(observer(LocationModal));
export default LocationModalWithStore;
export { LocationModal };
