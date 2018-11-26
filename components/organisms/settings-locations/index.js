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
    const location =
      uiStore.locationId !== null
        ? locations.filter(x => x.id === uiStore.locationId)[0]
        : undefined;
    return (
      <LocationsWrapper>
        {uiStore.modalIsOpen && (
          <LocationModal
            header={uiStore.locationId ? 'Edit Location' : 'Add Location'}
            location={location}
          />
        )}
        {locations.map(locationCard => {
          const {
            name,
            address,
            deliveryInstructions,
            source,
            contactName,
            phoneNumber,
            email,
            id,
          } = locationCard;
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
                  uiStore.setLocationId(id);
                  return uiStore.onOpenModal();
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
