import React from 'react';
import { shallow } from 'enzyme';
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

describe('Address Manager', () => {
  it('renders itself and its components', () => {
    const component = shallow(
      <AddressManager
        addresses={mockItems}
        selectedAddress={mockItems[2]}
        onSelectAddress={mockSelectAddress}
        addNewAddress={mockAddAddress}
      />,
    );
    expect(component.exists()).toEqual(true);
    expect(component.find(AddButton).exists()).toEqual(true);
    expect(component.find(AddressDropdown).exists()).toEqual(true);
  });

  it('should trigger addNewAddress if addButton is clicked', () => {
    const component = shallow(
      <AddressManager
        addresses={mockItems}
        selectedAddress={mockItems[2]}
        onSelectAddress={mockSelectAddress}
        addNewAddress={mockAddAddress}
      />,
    );
    component.find(AddButton).simulate('click');
    expect(mockAddAddress).toHaveBeenCalled();
  });

  it('should trigger onSelectAddress if a dropdown item has been selected', () => {
    const component = shallow(
      <AddressManager
        addresses={mockItems}
        selectedAddress={mockItems[2]}
        onSelectAddress={mockSelectAddress}
        addNewAddress={mockAddAddress}
        isOpen
      />,
    );

    const dropdown = component.find(AddressDropdown);
    dropdown.simulate('click');
    dropdown.simulate('change', mockItems[0]);
    expect(mockSelectAddress).toHaveBeenCalled();
    expect(mockSelectAddress).toHaveBeenCalledWith(mockItems[0]);
  });
});
