import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import AuthStore from 'lib/data-access/stores/auth';
import { mockWmProfile, mockWmxUser } from 'lib/mocks/user';
import { UserDropdown } from './';

function setup() {
  const mockStore = {
    authStore: AuthStore.create({
      wmProfile: mockWmProfile,
      wmxUser: mockWmxUser,
      setUserContext: jest.fn(),
    }),
  };
  const wrapper = shallow(<UserDropdown store={mockStore} />);
  const instance = wrapper.instance();
  return { wrapper, instance, mockStore };
}

describe('Top Nav User Dropdown', () => {
  let stopPropagation;
  beforeEach(() => {
    stopPropagation = jest.fn();
  });

  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should should open menu ', () => {
    const { wrapper } = setup();
    const selector = wrapper.find('DropdownSelector');
    selector.simulate('click', { stopPropagation });
    const menu = wrapper.find('UserDropdownMenu');
    expect(menu.exists()).toEqual(true);
  });

  it('should handle documentClick', () => {
    const { instance } = setup();
    instance.documentClick();
    expect(instance.state).toEqual({ open: false });
  });

  it('should be able to switch to buyer context', () => {
    const { wrapper, mockStore } = setup();
    jest.spyOn(Router, 'pushRoute').mockReturnValue();
    const setUserContext = jest.spyOn(mockStore.authStore, 'setUserContext');
    const selector = wrapper.find('DropdownSelector');

    selector.simulate('click', { stopPropagation });
    const buyerButton = wrapper.find('ToggleButton').first();
    buyerButton.simulate('click');
    expect(setUserContext).toHaveBeenCalledWith('buyer');
  });

  it('should be able to switch to seller context ', () => {
    const { wrapper, mockStore } = setup();
    mockStore.authStore.user.userContext = 'seller';
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    const setUserContext = jest.spyOn(mockStore.authStore, 'setUserContext');
    const selector = wrapper.find('DropdownSelector');
    selector.simulate('click', { stopPropagation });

    const sellerButton = wrapper.find('ToggleButton').last();
    sellerButton.simulate('click');
    expect(setUserContext).toHaveBeenCalledWith('seller');
    expect(pushRoute).toHaveBeenCalledWith('/seller/products');
  });

  it('should remove on click listener on menu close', async () => {
    const { instance } = setup();
    global.addEventListener = jest.fn();
    await instance.componentDidMount();
    expect(global.addEventListener).toBeCalledWith(
      'click',
      instance.documentClick,
    );
  });

  it('should remove on click listener on menu close', async () => {
    const { instance } = setup();
    global.removeEventListener = jest.fn();
    await instance.componentWillUnmount();
    expect(global.removeEventListener).toBeCalledWith(
      'click',
      instance.documentClick,
    );
  });
});
