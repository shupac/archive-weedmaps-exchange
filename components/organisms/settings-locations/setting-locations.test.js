import React from 'react';
import { shallow } from 'enzyme';
import { mockLocations } from 'lib/mocks/location';
import LocationCard from 'components/molecules/location-card';
import { Locations } from './';

describe('Locations', () => {
  const store = {
    buyerSettings: {
      locations: mockLocations,
      getLocations: jest.fn(),
    },
    modalStore: {
      locationId: '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
      setLocationId: jest.fn(),
    },
    uiStore: {
      modalIsOpen: true,
    },
  };
  it('should render out the Locations', () => {
    const component = shallow(<Locations store={store} />, {
      disableLifecycleMethods: true,
    });
    expect(
      component
        .find(LocationCard)
        .first()
        .props().locationAddress,
    ).toEqual({
      city: 'Irvine',
      country: 'us',
      id: 'b393b3e0-0814-4352-aa63-95a4d07fe1af',
      latitude: 33.6618199,
      longitude: -117.7597545,
      postalCode: '92618',
      streetAddress: '55 Discovery',
      territory: 'CA',
    });
  });
});
