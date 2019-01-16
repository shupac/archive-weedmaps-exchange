import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import AuthStore from 'lib/data-access/stores/auth';
import UiStore from 'lib/data-access/stores/ui';
import { AppHeader } from '@ghostgroup/ui';
import { mockWmProfile, mockWmxUser } from 'lib/mocks/user';
import { SideNavComponent } from './page-side-nav';

function setup() {
  const mockStore = {
    authStore: AuthStore.create({
      wmProfile: mockWmProfile,
      wmxUser: mockWmxUser,
    }),
    uiStore: UiStore.create({}),
  };
  const wrapper = shallow(
    <SideNavComponent
      store={mockStore}
      collapse={false}
      router={{ route: '/marketplace' }}
    />,
  );
  const instance = wrapper.instance();
  return { wrapper, mockStore, instance };
}

describe('The SideNavComponent', () => {
  it('should be render the sidenav', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should prevent default on app header click', () => {
    const { wrapper } = setup();
    const event = { preventDefault: jest.fn() };
    wrapper
      .find(AppHeader)
      .first()
      .simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should navigate to the path clicked', () => {
    const { wrapper } = setup();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    wrapper
      .find('StyledSideNavLink')
      .at(1)
      .simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('buyerOrders', undefined);
  });
});
