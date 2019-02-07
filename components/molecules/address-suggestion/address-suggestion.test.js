import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockSuggestedAddresses } from 'lib/mocks/address-suggestion';
import AddressSuggestions from './';
import { SuggestionListItem, AddressSuggestionInput } from './styles';

const store = {
  addressSuggestions: {
    suggestedAddresses: mockSuggestedAddresses,
    addressInput: '',
    setQuery: jest.fn(),
    clearAddressSuggestions: jest.fn(),
    getAddressSuggestions: jest.fn(),
    setAddressCommitted: jest.fn(),
  },
};
const props = {
  onChange: jest.fn(),
  setFieldValue: jest.fn(),
};
describe('AddressSuggestion', () => {
  it('renders the correct content', () => {
    const component = shallow(<AddressSuggestions store={store} />).dive();
    expect(component.find(SuggestionListItem).length).toEqual(5);
  });

  it('should handle the onAddressQuery with query supplied', () => {
    const component = shallow(
      <AddressSuggestions store={store} {...props} />,
    ).dive();
    component.find(AddressSuggestionInput).simulate('change', {
      target: {
        name: 'addressQuery',
        value: '41 Discovery',
      },
    });
    expect(store.addressSuggestions.setQuery).toHaveBeenCalledWith(
      '41 Discovery',
    );
  });

  it('should handle the onAddressQuery with NO query supplied', () => {
    const component = mount(<AddressSuggestions store={store} {...props} />);
    const addressInput = component.find(AddressSuggestionInput);

    addressInput.simulate('change', {
      target: {
        name: 'addressQuery',
        value: '',
      },
    });

    expect(store.addressSuggestions.clearAddressSuggestions).toHaveBeenCalled();
    expect(store.addressSuggestions.getAddressSuggestions).toHaveBeenCalledWith(
      '',
    );
  });

  it('should handle the onAddressSuggestion', () => {
    const component = shallow(
      <AddressSuggestions store={store} {...props} />,
    ).dive();
    component
      .find(SuggestionListItem)
      .first()
      .simulate('click');
    expect(store.addressSuggestions.setQuery).toHaveBeenCalledWith(
      '41 Discovery Park Boulevard, Seattle, WA, USA',
    );
  });
  it('should test the lifecycle componentWillUnMount', () => {
    const component = shallow(<AddressSuggestions store={store} />).dive();
    const dispose = jest.spyOn(component.instance(), 'dispose');
    component.unmount();
    expect(dispose).toHaveBeenCalled();
  });
});
