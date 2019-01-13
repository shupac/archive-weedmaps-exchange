import React from 'react';
import { shallow } from 'enzyme';
import findByTestId from 'lib/jest/find-by-test-id';
import { DeleteZoneModal } from './';

function setup() {
  const store = {
    uiStore: {
      activeModal: 'deleteZone',
      openModal: jest.fn(),
      closeModal: jest.fn(),
    },
  };
  const component = <DeleteZoneModal store={store} />;
  const wrapper = shallow(component).dive();
  const instance = shallow(<DeleteZoneModal store={store} />).instance();
  return { wrapper, store, instance };
}

describe('Delete Zone Modal', () => {
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
});
