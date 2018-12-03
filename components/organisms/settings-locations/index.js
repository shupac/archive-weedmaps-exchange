// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import LocationCard from 'components/molecules/location-card';
import LocationModal from 'components/molecules/location-modal';
import { LocationsWrapper, LocationCardWrapper } from './styles';

type Props = {
  store: StoreType,
};

class Locations extends Component<Props> {
  componentDidMount() {
    const { buyerSettings } = this.props.store;
    buyerSettings.getLocations();
  }

  render() {
    const { buyerSettings, uiStore } = this.props.store;
    const { locations } = buyerSettings;

    return (
      <LocationsWrapper>
        {uiStore.activeModal === 'locationModal' && <LocationModal />}

        {locations.map(location => {
          const {
            name,
            address,
            deliveryInstructions,
            source,
            contactName,
            phoneNumber,
            email,
            id,
          } = location;

          return (
            <LocationCardWrapper key={id}>
              <LocationCard
                locationTitle={name}
                locationAddress={address}
                deliveryInstruction={deliveryInstructions}
                isPrimary={source === 'weedmaps'}
                contactName={contactName}
                phone={phoneNumber}
                email={email}
                onDelete={() => buyerSettings.deleteLocation(id)}
                onEdit={() => {
                  buyerSettings.setEditingLocationId(id);
                  return uiStore.openModal('locationModal');
                }}
              />
            </LocationCardWrapper>
          );
        })}
      </LocationsWrapper>
    );
  }
}

export default withRouter(inject('store')(observer(Locations)));
export { Locations };
