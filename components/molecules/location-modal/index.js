// @flow
import React from 'react';
import { type StoreType } from 'lib/types/store';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ModalBody } from 'components/molecules/modal-with-header/styles';
import { type LocationType } from 'lib/types/locations';
import { type LocationValueType } from 'lib/data-access/models/location';
import { LICENSE_TYPES } from 'lib/common/constants';
import ModalWithHeader from 'components/molecules/modal-with-header';
import LocationForm from './location-form';

type Props = {
  store: StoreType,
  location: LocationType,
  licenseTypes: string[],
  header: string,
};

const LocationModalWrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

class ModalWrapper extends React.Component<Props> {
  static defaultProps = {
    location: {
      name: '',
      address: '',
      deliveryInstructions: '',
      contactName: '',
      phoneNumber: '',
      email: '',
      licenses: [],
    },
    licenseTypes: LICENSE_TYPES,
  };

  componentDidMount() {
    const { addressSuggestions } = this.props.store;
    const {
      city,
      country,
      streetAddress,
      territory,
    } = this.props.location.address;
    if (streetAddress) {
      addressSuggestions.setQuery(
        `${streetAddress}, ${city}, ${territory}, ${country.toUpperCase()}`,
      );
      addressSuggestions.setAddressCommitted(true);
    } else {
      addressSuggestions.setQuery('');
      addressSuggestions.setAddressCommitted(true);
    }
  }

  // $FlowFixMe
  onSubmit = (values): { values: LocationValueType } => {
    const { buyerSettings, uiStore } = this.props.store;
    if (!values.id) {
      const newLicenses = values.licenses.map(item => ({
        license_type: item.licenseType,
        number: item.number,
      }));
      delete values.id;
      values.licenses = newLicenses;
      buyerSettings.createNewLocation(values);
    } else {
      buyerSettings.patchLocation(values);
    }
    uiStore.onCloseModal();
  };

  render() {
    const { store, location, licenseTypes, header } = this.props;
    return (
      <ModalWithHeader
        store={store}
        header={header}
        width="644px"
        height="56px"
      >
        <ModalBody width="610px">
          <LocationModalWrapper>
            <LocationForm
              location={location}
              licenseTypes={licenseTypes}
              onSubmit={this.onSubmit}
            />
          </LocationModalWrapper>
        </ModalBody>
      </ModalWithHeader>
    );
  }
}

const LocationModal = inject('store')(observer(ModalWrapper));
export default LocationModal;
export { ModalWrapper };
