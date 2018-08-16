import React from 'react';
import { shallow } from 'enzyme';
import TopNav from './';

describe('Top Nav', () => {
  it('Top Nav', () => {
    const tree = shallow(
      <TopNav
        activeLink="deals"
        avatarUrl="http://localhost"
        onMenuClick={() => null}
        count={5}
        userName="gabOng"
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
