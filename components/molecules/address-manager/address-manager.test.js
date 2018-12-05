import React from 'react';
import { shallow } from 'enzyme';
import UiStore from 'lib/data-access/stores/ui';
import AddressManager from './';
import { AddButton, AddressDropdown } from './styles';

const mockItems = [
  {
    text: 'One',
    value: '1',
  },
  {
    text: 'Two',
    value: '2',
  },
  {
    text: 'Three',
    value: '3',
  },
];

const mockSelectAddress = jest.fn();
const mockAddAddress = jest.fn();
const mockUiStore = UiStore.create();
const mockStore = { uiStore: mockUiStore };

describe('Address Manager', () => {
  it('renders itself and its components', () => {
    const component = shallow(
      <AddressManager
        addresses={mockItems}
        selectedAddress={mockItems[2]}
        onSelectAddress={mockSelectAddress}
        store={mockStore}
      />,
    ).dive();
    expect(component.exists()).toEqual(true);
    expect(component.find(AddButton).exists()).toEqual(true);
    expect(component.find(AddressDropdown).exists()).toEqual(true);
  });

  it('should trigger onSelectAddress if a dropdown item has been selected', () => {
    const component = shallow(
      <AddressManager
        addresses={mockItems}
        selectedAddress={mockItems[2]}
        onSelectAddress={mockSelectAddress}
        addNewAddress={mockAddAddress}
        isOpen
        store={mockStore}
      />,
    ).dive();

    const dropdown = component.find(AddressDropdown);
    dropdown.simulate('click');
    dropdown.simulate('change', mockItems[0]);
    expect(mockSelectAddress).toHaveBeenCalled();
    expect(mockSelectAddress).toHaveBeenCalledWith(mockItems[0].value);
  });

  it('should handle the open modal', () => {
    const component = shallow(
      <AddressManager
        addresses={mockItems}
        selectedAddress={mockItems[2]}
        onSelectAddress={mockSelectAddress}
        addNewAddress={mockAddAddress}
        isOpen
        store={mockStore}
      />,
    ).dive();

    const openModal = jest.spyOn(mockStore.uiStore, 'openModal');
    component.find('AddButton').simulate('click');
    expect(openModal).toHaveBeenCalledWith('cartModal');
  });
});
