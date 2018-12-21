import React from 'react';
import { storiesOf } from '@storybook/react';
import { mockLocations } from 'lib/mocks/location';
import centered from '@storybook/addon-centered';
import LocationCard from './';

export default storiesOf('LocationCard', module)
  .addDecorator(centered)
  .add('Default', () => (
    <LocationCard
      locationTitle={mockLocations[0].name}
      locationAddress={mockLocations[0].address}
      deliveryInstruction={mockLocations[0].deliveryInstructions}
      isPrimary={mockLocations[0].source === 'weedmaps'}
      contactName={mockLocations[0].contactName}
      phone={mockLocations[0].phoneNumber}
      email={mockLocations[0].email}
    />
  ))
  .add('NonPrimary', () => (
    <LocationCard
      locationTitle={mockLocations[0].name}
      locationAddress={mockLocations[0].address}
      deliveryInstruction={mockLocations[0].deliveryInstructions}
      isPrimary={false}
      contactName={mockLocations[0].contactName}
      phone={mockLocations[0].phoneNumber}
      email={mockLocations[0].email}
    />
  ));
