import React from 'react';
import { shallow } from 'enzyme';
import { ButtonPrimary } from 'components/atoms/button';
import LocationModal from './';

const mockStore = {
  uiStore: {
    onOpenModal: jest.fn(),
  },
};

describe('LocationModal', () => {
  it('should render the location modal', () => {
    const component = shallow(<LocationModal store={mockStore} />).dive();
    expect(component.find(ButtonPrimary).exists()).toEqual(true);
    component.find(ButtonPrimary).simulate('click');
    expect(mockStore.uiStore.onOpenModal).toHaveBeenCalled();
  });
});
