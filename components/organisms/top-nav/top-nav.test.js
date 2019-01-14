import React from 'react';
import { shallow } from 'enzyme';
import UiStore from 'lib/data-access/stores/ui';
import LocationSelector from 'components/atoms/location-selector';
import Notification from 'components/molecules/top-nav-notification';
import TopNav from './';

function setup(customerType) {
  const props = {
    router: {
      pathname: '/marketplace',
    },
    store: {
      authStore: {
        activeContext: customerType,
      },
      uiStore: UiStore.create({}),
    },
  };
  const component = (
    <TopNav
      activeLink="deals"
      avatarUrl="http://localhost"
      onMenuClick={() => null}
      count={5}
      userName="gabOng"
      {...props}
    />
  );
  const wrapper = shallow(component)
    .dive()
    .dive();
  return { wrapper };
}
describe('Top Nav', () => {
  it('Top Nav', () => {
    const { wrapper } = setup('buyer');
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(LocationSelector).exists()).toEqual(true);
    expect(wrapper.find(Notification).exists()).toEqual(true);
  });

  it('Seller Top Nav', () => {
    const { wrapper } = setup('seller');
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find(LocationSelector).exists()).toEqual(false);
    expect(wrapper.find(Notification).exists()).toEqual(false);
  });
});
