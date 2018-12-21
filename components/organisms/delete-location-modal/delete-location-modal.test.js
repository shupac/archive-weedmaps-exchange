import React from 'react';
import { shallow } from 'enzyme';
import findByTestId from 'lib/jest/find-by-test-id';
import { mockLocations } from 'lib/mocks/location';
import { DeleteLocationModal } from './';

function setup() {
  const store = {
    buyerSettings: {
      locations: mockLocations,
      locationToDelete: mockLocations[0],
      deleteLocation: jest.fn().mockResolvedValue(true),
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
    const cancelButton = findByTestId(wrapper, 'cancel-button');
    cancelButton.simulate('click');
    expect(store.uiStore.openModal).toHaveBeenCalled();
  });

  it('should delete location on button submit ', done => {
    const { wrapper, store } = setup();
    const submitButton = findByTestId(wrapper, 'delete-button');
    submitButton.simulate('click');
    expect(store.buyerSettings.deleteLocation).toHaveBeenCalled();
    setTimeout(() => {
      expect(store.uiStore.closeModal).toHaveBeenCalled();
      done();
    });
  });
});
