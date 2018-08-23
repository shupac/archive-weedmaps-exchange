import React from 'react';
import { shallow } from 'enzyme';
import Shiitake from 'shiitake';
import LocationCard from './index';
import { LocationCardInstructions } from './styles';

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

describe('Location Card', () => {
  it('should render out the Location Card with Delivery Instructions', () => {
    const component = shallow(
      <LocationCard {...mockLocationCardData.data} />,
    ).dive();
    expect(component.find(LocationCardInstructions).length).toEqual(1);
    expect(
      component
        .find(LocationCardInstructions)
        .children()
        .find(Shiitake)
        .dive()
        .text(),
    ).toContain('Knock twice, stand on one foot, say the alphabet backwards');
  });
  it('should render out the Location Card with No Delivery Instructions', () => {
    const component = shallow(
      <LocationCard
        locationTitle={mockLocationCardData.data.locationTitle}
        locationAddress={mockLocationCardData.data.locationAddress}
        locationContact={mockLocationCardData.data.locationContact}
      />,
    );
    expect(
      component
        .find(LocationCardInstructions)
        .children()
        .find(Shiitake)
        .dive()
        .text(),
    ).toContain('N/A');
  });
});
