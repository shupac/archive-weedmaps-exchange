import React from 'react';
import { shallow } from 'enzyme';
import Notification, { NotificationWrapper, NotificationCount } from './';

describe('Top Nav Notification', () => {
  it('Notification', () => {
    const tree = shallow(<Notification active="deals" />);
    expect(tree.exists()).toEqual(true);
  });
  it('Notification with count', () => {
    const tree = shallow(<Notification active="deals" count={1} />);
    expect(tree.exists()).toEqual(true);
    expect(tree.find(NotificationWrapper).props().show).toEqual(true);
    expect(
      tree
        .find(NotificationCount)
        .dive()
        .text(),
    ).toEqual('1');
    expect(tree.find(NotificationWrapper).dive()).toHaveStyleRule(
      'transform: scale(1)',
    );
  });
});
