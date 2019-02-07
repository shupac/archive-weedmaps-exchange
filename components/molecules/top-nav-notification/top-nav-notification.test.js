import React from 'react';
import { shallow, mount } from 'enzyme';
import Notification, { NotificationWrapper, NotificationCount } from './';

function setup() {
  const mockStore = {
    buyerCart: {
      cartItemCount: 2,
    },
  };
  return { mockStore };
}

describe('Top Nav Notification', () => {
  it('Notification', () => {
    const { mockStore } = setup();
    const tree = shallow(<Notification store={mockStore} />);
    expect(tree.exists()).toEqual(true);
  });

  it('Notification with count', () => {
    const { mockStore } = setup();
    const tree = mount(<Notification store={mockStore} />);
    expect(tree.exists()).toEqual(true);
    expect(tree.find(NotificationCount).text()).toEqual('2');
    expect(tree.find(NotificationWrapper)).toHaveStyleRule(
      'transform: scale(1)',
    );
  });
});
