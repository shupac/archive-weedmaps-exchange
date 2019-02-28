import React from 'react';
import { shallow } from 'enzyme';
import { mockLocations } from 'lib/mocks/location';
import BuyerSettings from 'lib/data-access/stores/buyer-settings';
import UiStore from 'lib/data-access/stores/ui';
import { LocationSelector } from './';
import { Select } from './styles';

function setup() {
  const mockStore = {
    buyerSettings: BuyerSettings.create(
      { locations: mockLocations },
      { client: { fetch: jest.fn().mockReturnValue(mockLocations) } },
    ),
    uiStore: UiStore.create(),
  };
  const component = <LocationSelector store={mockStore} />;
  const wrapper = shallow(component);
  return { wrapper, mockStore };
}

describe('Location Selector', () => {
  it('should render the component and option labels', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
    expect(
      wrapper
        .find(Select)
        .props()
        .itemToString(mockLocations[0]),
    ).toEqual(mockLocations[0].text);
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

  it('should show error toast if updateActiveLocation throws error', () => {
    const { wrapper, mockStore } = setup();
    const notifyToast = jest.spyOn(mockStore.uiStore, 'notifyToast');
    const selection = {
      text: "Andrew's Cryb",
      value: 'fake value',
    };
    jest
      .spyOn(mockStore.buyerSettings, 'updateActiveLocation')
      .mockReturnValue(false);
    const instance = wrapper.instance();
    const notification = {
      title: 'Location Error',
      body: 'Location was deleted by another user.',
      autoDismiss: 8000,
      status: 'ERROR',
    };
    instance.handleSelectChange(selection);
    setTimeout(() => {
      expect(notifyToast).toHaveBeenCalledWith(notification);
    }, 100);
  });

  it('disposes of the reaction when unmounting', () => {
    const { wrapper } = setup();
    const dispose = jest.spyOn(wrapper.instance(), 'dispose');
    wrapper.unmount();
    expect(dispose).toHaveBeenCalled();
  });

  it('will sync data with server when active location changes ', () => {
    const { mockStore } = setup();
    const mocksyncActiveLocation = jest
      .spyOn(mockStore.buyerSettings, 'syncActiveLocation')
      .mockReturnValue();
    mockStore.buyerSettings.setActiveLocation(
      '7f98075f-a924-4606-a817-b6f99a61f289',
    );
    expect(mocksyncActiveLocation).toHaveBeenCalled();
  });

  it('should render null if is hidden', () => {
    const { mockStore } = setup();
    const component = <LocationSelector store={mockStore} isHidden />;
    const wrapper = shallow(component);
    expect(wrapper.getElement()).toEqual(null);
  });
});
