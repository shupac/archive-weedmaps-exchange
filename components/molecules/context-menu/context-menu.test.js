import React from 'react';
import { mount } from 'enzyme';
import ContextMenu, { MenuItem } from './';

function setup() {
  const component = (
    <ContextMenu>
      <MenuItem>Foo</MenuItem>
      <MenuItem>Bar</MenuItem>
    </ContextMenu>
  );

  return mount(component);
}

describe('ContextMenu', () => {
  it('should render the component', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should add on click listener on menu open', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    // eslint-disable-next-line no-undef
    const addEventListener = jest.spyOn(document, 'addEventListener');
    instance.openMenu();
    expect(addEventListener).toHaveBeenCalled();
    addEventListener.mockRestore();
  });

  it('should remove on click listener on menu close', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    // eslint-disable-next-line no-undef
    const removeEventListener = jest.spyOn(document, 'removeEventListener');
    instance.closeMenu();
    expect(removeEventListener).toHaveBeenCalled();
    removeEventListener.mockRestore();
  });

  it('should remove on click listener on menu close', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    // eslint-disable-next-line no-undef
    const removeEventListener = jest.spyOn(document, 'removeEventListener');
    instance.componentWillUnmount();
    expect(removeEventListener).toHaveBeenCalled();
    removeEventListener.mockRestore();
  });

  it('should close the menu on click', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const closeMenu = jest.spyOn(instance, 'closeMenu');
    instance.handleClick();
    expect(closeMenu).toHaveBeenCalled();
    closeMenu.mockRestore();
  });
});
