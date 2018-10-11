import React from 'react';
import { shallow } from 'enzyme';
import { mockLocations } from 'lib/mocks/location';
import BuyerSettings from 'lib/data-access/stores/buyer-settings';
import { LocationSelector } from './';

function setup() {
  const mockStore = {
    buyerSettings: BuyerSettings.create(
      {},
      { client: { fetch: jest.fn().mockReturnValue(mockLocations) } },
    ),
  };
  const component = <LocationSelector store={mockStore} />;
  const wrapper = shallow(component);
  return { wrapper, mockStore };
}

describe('Location Selector', () => {
  describe('when mounts', () => {
    it('should fetch locations from the store  ', () => {
      const { wrapper, mockStore } = setup();
      const mockGetLocations = jest.spyOn(
        mockStore.buyerSettings,
        'getLocations',
      );
      const instance = wrapper.instance();
      instance.componentDidMount();
      // Check to see that the action to fetch locations is fired
      expect(mockGetLocations).toHaveBeenCalled();
    });
  });

  it('should handle a selection change', () => {
    const { wrapper, mockStore } = setup();
    const selection = {
      text: "Andrew's Cryb",
      value: '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
    };
    const mockUpdateActiveLocation = jest.spyOn(
      mockStore.buyerSettings,
      'updateActiveLocation',
    );
    const instance = wrapper.instance();
    instance.handleSelectChange(selection);
    expect(mockUpdateActiveLocation).toHaveBeenCalledWith(selection.value);
  });
});
