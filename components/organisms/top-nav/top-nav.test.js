import React from 'react';
import { shallow } from 'enzyme';
import LocationSelector from 'components/atoms/location-selector';
import TopNav from './';

describe('Top Nav', () => {
  let props;
  props = {
    pathname: '/marketplace',
  };
  it('Top Nav', () => {
    const tree = shallow(
      <TopNav
        activeLink="deals"
        avatarUrl="http://localhost"
        onMenuClick={() => null}
        count={5}
        userName="gabOng"
        {...props}
      />,
    );
    expect(tree.exists()).toEqual(true);
    expect(tree.find(LocationSelector).exists()).toEqual(true);
  });
  it('Top Nav render the Location Selector', () => {
    props = {
      pathname: '/cart',
    };
    const tree = shallow(
      <TopNav
        activeLink="deals"
        avatarUrl="http://localhost"
        onMenuClick={() => null}
        count={5}
        userName="gabOng"
        {...props}
      />,
    );
    expect(tree.find(LocationSelector).exists()).toEqual(false);
  });
});
