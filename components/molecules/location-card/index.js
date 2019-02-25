// @flow
import React, { Component } from 'react';
import Bookmark from 'components/atoms/icons/bookmark';
import { observer } from 'mobx-react';
import Shiitake from 'shiitake';
import Tooltip from 'components/atoms/tool-tip';
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
  streetAddress: string,
  city: string,
  country: string,
  postalCode: number,
  territory: string,
};

type Props = {
  locationTitle?: string,
  locationAddress: locationAddressType,
  deliveryInstruction?: string,
  contactName: string,
  phone: string,
  email: string,
  isPrimary?: boolean,
  onEdit: () => void,
  onDelete: () => void,
};

export class LocationCard extends Component<Props> {
  static defaultProps = {
    isPrimary: true,
  };

  render() {
    const {
      locationTitle,
      locationAddress,
      deliveryInstruction,
      contactName,
      phone,
      email,
      isPrimary,
    } = this.props;
    const {
      streetAddress,
      city,
      territory,
      postalCode,
      country,
    } = locationAddress;
    return (
      <LocationCardWrapper>
        <LocationCardTitle>
          {locationTitle}
          {isPrimary && (
            <IconWrapper>
              <Tooltip message="This location is tied to an existing Weedmaps listing">
                <Bookmark />
              </Tooltip>
            </IconWrapper>
          )}
        </LocationCardTitle>
        <LocationCardAddress>
          {streetAddress ? (
            <>
              <span>{streetAddress}</span>
              <br />
              <span>
                {city}, {territory} {postalCode}{' '}
              </span>
              <br />
              <span style={{ textTransform: 'uppercase' }}>{country}</span>
            </>
          ) : (
            'Address Incomplete'
          )}
        </LocationCardAddress>
        <LocationCardInstructions>
          <span>Delivery Instructions</span> <br />
          <Shiitake lines={2}>{deliveryInstruction || 'N/A'}</Shiitake>
        </LocationCardInstructions>
        <LocationCardContact>
          <span>Contact</span>
          <br />
          {contactName && <ContactLine>{contactName}</ContactLine>}
          {phone && <ContactLine>Phone: {phone}</ContactLine>}
          {email && <ContactLine>Email: {email}</ContactLine>}
        </LocationCardContact>
        <ButtonWrapper>
          <LocationCardButton isPrimary={isPrimary} onClick={this.props.onEdit}>
            Edit
          </LocationCardButton>
          {!isPrimary && (
            <LocationCardButton onClick={this.props.onDelete}>
              Delete
            </LocationCardButton>
          )}
        </ButtonWrapper>
      </LocationCardWrapper>
    );
  }
}
export default observer(LocationCard);
