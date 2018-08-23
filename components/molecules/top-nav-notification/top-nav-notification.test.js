import React from 'react';
import { shallow } from 'enzyme';
import Notification from './';

describe('Top Nav Notification', () => {
  it('Notification', () => {
    const tree = shallow(<Notification active="deals" />);
    expect(tree.exists()).toEqual(true);
  });
});
