import React from 'react';
import { shallow, mount } from 'enzyme';
import { Select } from './index';
import { SelectButton, Menu, Item } from './styles';

const items = [
  {
    text: 'Apple',
    value: 1,
  },
  {
    text: 'Pear',
    value: 2,
  },
  {
    text: 'Orange',
    value: 3,
  },
  {
    text: 'Grape',
    value: 4,
  },
  {
    text: 'Banana',
    value: 5,
  },
];

const itemToString = item => item.text;

describe('Select', () => {
  it('renders a closed Select', () => {
    const component = mount(
      <Select items={items} hasError itemToString={itemToString} />,
    );
    expect(component.find(Select).exists()).toEqual(true);
  });

  it('renders an open Select', () => {
    const component = mount(
      <Select items={items} isOpen itemToString={itemToString} />,
    );
    component
      .find(SelectButton)
      .first()
      .simulate('click');
    expect(component.find(Menu).length).toEqual(1);
  });

  it('should render menu items', () => {
    const component = mount(
      <Select items={items} isOpen itemToString={itemToString} />,
    );
    component
      .find(SelectButton)
      .first()
      .simulate('click');
    const optionItem = component
      .find(Item)
      .first()
      .simulate('click');
    expect(optionItem.props().isActive).toEqual(false);
  });

  it('renders inverted', () => {
    const wrapper = mount(
      <Select items={items} isInverted itemToString={itemToString} />,
    );
    expect(wrapper.find(Select).length).toBe(1);
  });

  it('should trigger onBlur', () => {
    const onBlur = jest.fn();
    const wrapper = shallow(
      <Select
        items={items}
        onBlur={onBlur}
        isOpen
        itemToString={itemToString}
      />,
    );
    const button = wrapper
      .find('[data-test-id="ui-select"]')
      .dive()
      .find('[data-test-id="ui-select-button"]');
    button.simulate('blur', {
      preventDownshiftDefault: () => {},
    });
    expect(onBlur).toHaveBeenCalled();
  });

  it('should trigger onFocus', () => {
    const onFocus = jest.fn();
    const wrapper = shallow(
      <Select
        items={items}
        onFocus={onFocus}
        isOpen
        itemToString={itemToString}
      />,
    );
    const button = wrapper
      .find('[data-test-id="ui-select"]')
      .dive()
      .find('[data-test-id="ui-select-button"]');
    button.simulate('focus');
    expect(onFocus).toHaveBeenCalled();
  });
});
