import React from 'react';
import { shallow } from 'enzyme';
import Profile from './';

describe('Profile', () => {
  it('should render the profile', () => {
    const store = {};
    const component = shallow(<Profile store={store} />)
      .dive()
      .dive();
    expect(component.find('span').text()).toEqual('Profile Page');
  });
});
