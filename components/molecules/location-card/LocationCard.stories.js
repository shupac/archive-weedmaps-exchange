import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationCard from './';

const mockLocationCardData = {
  data: {
    locationTitle: 'Irvine Warehouse',
    locationAddress: {
      street: '41 Discovery',
      city: 'Irvine',
      state: 'CA',
      zipCode: 921618,
      country: 'USA',
    },
    isPrimary: true,
    deliveryInstruction:
      'Knock twice, stand on one foot, say the alphabet backwards',
    locationContact: {
      name: 'Bob Ross',
      phone: '310-123-1234',
      email: 'weedmaps@weedmaps.com',
    },
  },
};

export default storiesOf('LocationCard', module)
  .add('Default', () => (
    <LocationCard
      locationTitle={mockLocationCardData.data.locationTitle}
      locationAddress={mockLocationCardData.data.locationAddress}
      deliveryInstruction={mockLocationCardData.data.deliveryInstruction}
      locationContact={mockLocationCardData.data.locationContact}
      isPrimary
    />
  ))
  .add('NonPrimary', () => (
    <LocationCard
      locationTitle={mockLocationCardData.data.locationTitle}
      locationAddress={mockLocationCardData.data.locationAddress}
      deliveryInstruction={mockLocationCardData.data.deliveryInstruction}
      locationContact={mockLocationCardData.data.locationContact}
      isPrimary={false}
    />
  ));
