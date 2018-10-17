import React from 'react';
import { shallow } from 'enzyme';
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
    const tree = shallow(<Notification store={mockStore} />).dive();
    expect(tree.exists()).toEqual(true);
    expect(
      tree
        .dive()
        .find(NotificationCount)
        .dive()
        .text(),
    ).toEqual('2');
    expect(
      tree
        .dive()
        .find(NotificationWrapper)
        .dive(),
    ).toHaveStyleRule('transform: scale(1)');
  });
});
