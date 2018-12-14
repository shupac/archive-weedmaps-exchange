import React from 'react';
import { shallow } from 'enzyme';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { mockLocations } from 'lib/mocks/location';
import { DeleteLocationModal } from './';

function setup() {
  const store = {
    buyerSettings: {
      locations: mockLocations,
      locationToDelete: mockLocations[0],
      deleteLocation: jest.fn().mockReturnValue(Promise.resolve(true)),
    },
    uiStore: {
      activeModal: 'deleteLocation',
      openModal: jest.fn(),
      closeModal: jest.fn(),
    },
  };
  const component = <DeleteLocationModal store={store} />;
  const wrapper = shallow(component).dive();
  const instance = shallow(<DeleteLocationModal store={store} />).instance();
  return { wrapper, store, instance };
}

describe('Delete Location Modal', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should close modal when cancel button clicked', () => {
    const { wrapper, store } = setup();
    const cancelButton = wrapper.find(ButtonWhiteNoHover);
    cancelButton.simulate('click');
    expect(store.uiStore.openModal).toHaveBeenCalled();
  });
  it('should delete location on button submit ', async () => {
    const { wrapper, store } = setup();
    const submitButton = wrapper.find(ButtonPrimary);
    submitButton.simulate('click');
    expect(await store.buyerSettings.deleteLocation).toHaveBeenCalled();
    expect(store.uiStore.closeModal).toHaveBeenCalled();
  });
});
