import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import { SideNavLink, AppHeader } from '@ghostgroup/ui';
import { SideNavComponent } from './page-side-nav';

function setup() {
  const component = (
    <SideNavComponent collapse={false} router={{ route: '/marketplace' }} />
  );
  return shallow(component);
}

describe('The SideNavComponent', () => {
  it('should be render the sidenav', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should prevent default on app header click', () => {
    const wrapper = setup();
    const event = { preventDefault: jest.fn() };
    wrapper
      .find(AppHeader)
      .first()
      .simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should navigate to the path clicked', () => {
    const wrapper = setup();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    wrapper
      .find(SideNavLink)
      .at(1)
      .simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('buyerOrders', undefined);
  });
});
