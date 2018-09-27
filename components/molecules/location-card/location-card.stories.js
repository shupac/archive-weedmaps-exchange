import React from 'react';
import { storiesOf } from '@storybook/react';
import { mockLocation } from 'lib/mocks/location';
import centered from '@storybook/addon-centered';
import LocationCard from './';

export default storiesOf('LocationCard', module)
  .addDecorator(centered)
  .add('Default', () => (
    <LocationCard
      locationTitle={mockLocation[0].name}
      locationAddress={mockLocation[0].address}
      deliveryInstruction={mockLocation[0].deliveryInstructions}
      isPrimary={mockLocation[0].source === 'weedmaps'}
      contactName={mockLocation[0].contactName}
      phone={mockLocation[0].phoneNumber}
      email={mockLocation[0].email}
    />
  ))
  .add('NonPrimary', () => (
    <LocationCard
      locationTitle={mockLocation[0].name}
      locationAddress={mockLocation[0].address}
      deliveryInstruction={mockLocation[0].deliveryInstructions}
      isPrimary={false}
      contactName={mockLocation[0].contactName}
      phone={mockLocation[0].phoneNumber}
      email={mockLocation[0].email}
    />
  ));
