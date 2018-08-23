// @flow
import React, { Component } from 'react';
import Bookmark from 'components/atoms/icons/bookmark';
import Shiitake from 'shiitake';
import {
  LocationCardAddress,
  IconWrapper,
  LocationCardContact,
  LocationCardInstructions,
  LocationCardTitle,
  LocationCardWrapper,
  ButtonWrapper,
  LocationCardButton,
  ContactLine,
} from './styles';

type locationAddressType = {
  street: string,
  city: string,
  state: string,
  zipCode: number,
  country: string,
};

type locationContactType = {
  name?: string,
  phone?: string,
  email?: string,
};

type Props = {
  locationTitle?: string,
  locationAddress: locationAddressType,
  deliveryInstruction?: string,
  locationContact: locationContactType,
  isPrimary: boolean,
};

export default class LocationCard extends Component<Props> {
  static defaultProps = {
    isPrimary: true,
  };

  handleDelete = () => {
    console.log('clicked on delete');
  };
  handleEdit = () => {
    console.log('clicked on edit');
  };

  render() {
    const {
      locationTitle,
      locationAddress,
      deliveryInstruction,
      locationContact,
      isPrimary,
    } = this.props;
    const { street, city, state, zipCode, country } = locationAddress;
    const { name, phone, email } = locationContact;
    return (
      <LocationCardWrapper>
        <LocationCardTitle>
          {locationTitle}
          {isPrimary && (
            <IconWrapper>
              <Bookmark />
            </IconWrapper>
          )}
        </LocationCardTitle>
        <LocationCardAddress>
          <span>{street}</span>
          <br />
          <span>
            {city}, {state} {zipCode}{' '}
          </span>
          <br />
          <span>{country}</span>
        </LocationCardAddress>
        <LocationCardInstructions>
          <span>Delivery Instructions</span> <br />
          <Shiitake lines={2}>{deliveryInstruction || 'N/A'}</Shiitake>
        </LocationCardInstructions>
        <LocationCardContact>
          <span>Contact</span>
          <br />
          {name && <ContactLine>{name}</ContactLine>}
          {phone && <ContactLine>Phone: {phone}</ContactLine>}
          {email && <ContactLine>Email: {email}</ContactLine>}
        </LocationCardContact>
        <ButtonWrapper>
          <LocationCardButton isPrimary={isPrimary} onClick={this.handleEdit}>
            Edit
          </LocationCardButton>
          {!isPrimary && (
            <LocationCardButton onClick={this.handleDelete}>
              Delete
            </LocationCardButton>
          )}
        </ButtonWrapper>
      </LocationCardWrapper>
    );
  }
}
