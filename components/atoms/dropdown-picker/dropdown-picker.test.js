import React from 'react';
import { shallow, mount } from 'enzyme';
import DropdownPicker from './';

describe('dropdown picker', () => {
  it('renders correctly', () => {
    const items = ['One', 'Two', 'Three'];
    const onChange = () => null;
    const tree = shallow(<DropdownPicker items={items} onChange={onChange} />);
    expect(tree.exists()).toEqual(true);
  });

  it('renders with selectedItem', () => {
    const selectedItem = 'One';
    const items = ['One', 'Two', 'Three'];
    const onChange = () => null;
    const tree = shallow(
      <DropdownPicker
        items={items}
        onChange={onChange}
        selectedItem={selectedItem}
      />,
    );
    expect(tree.exists()).toEqual(true);
  });

  it('should call onChange when clicking on a SelectionItem', () => {
    const selectedItem = 'Two';
    const items = ['One', 'Two', 'Three'];
    const onChange = jest.fn();
    const wrapper = mount(
      <DropdownPicker
        items={items}
        onChange={onChange}
        selectedItem={selectedItem}
      />,
    );
    wrapper.find('SelectionButton').simulate('click');
    wrapper
      .find('SelectionItem')
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalled();
  });
});
