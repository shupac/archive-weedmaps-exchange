// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import LocationCard from 'components/molecules/location-card';
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
    const { locations } = this.props.store.buyerSettings;
    return (
      <LocationsWrapper>
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
