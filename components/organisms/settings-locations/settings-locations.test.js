import React from 'react';
import { shallow } from 'enzyme';
import { mockLocations } from 'lib/mocks/location';
import LocationCard from 'components/molecules/location-card';
import { Locations } from './';

const store = {
  buyerSettings: {
    locations: mockLocations,
    getLocations: jest.fn(),
  },
};

describe('Locations', () => {
  it('should render out the Locations', () => {
    const component = shallow(<Locations store={store} />, {
      disableLifecycleMethods: true,
    });
    expect(component.find(LocationCard)).toMatchSnapshot();
  });

  it('should fetch locations on mount', () => {
    shallow(<Locations store={store} />);
    expect(store.buyerSettings.getLocations).toHaveBeenCalled();
  });
});
