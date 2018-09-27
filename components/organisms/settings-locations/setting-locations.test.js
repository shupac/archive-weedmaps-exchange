import React from 'react';
import { shallow } from 'enzyme';
import { mockLocation } from 'lib/mocks/location';
import LocationCard from 'components/molecules/location-card';
import { Locations } from './';

describe('Locations', () => {
  it('should render out the Locations', () => {
    const store = {
      buyerSettings: {
        locations: mockLocation,
      },
    };
    const component = shallow(<Locations store={store} />, {
      disableLifecycleMethods: true,
    });
    expect(component.find(LocationCard).props()).toEqual({
      contactName: 'Andre Smithh',
      deliveryInstruction: 'TEST.',
      email: 'asciametta@aol.com',
      isPrimary: true,
      locationAddress: {
        city: 'Irvine',
        country: 'us',
        id: 'b393b3e0-0814-4352-aa63-95a4d07fe1af',
        latitude: 33.6618199,
        longitude: -117.7597545,
        postalCode: '92618',
        streetAddress: '55 Discovery',
        territory: 'CA',
      },
      locationTitle: "Andrew's Cryb",
      phone: '(303) 555-5555',
    });
  });
});
