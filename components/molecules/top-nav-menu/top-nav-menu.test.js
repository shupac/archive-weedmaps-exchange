import React from 'react';
import { shallow } from 'enzyme';
import Menu from './';

describe('Top Nav Menu', () => {
  it('Menu', () => {
    const tree = shallow(<Menu active="deals" />);
    expect(tree).toMatchSnapshot();
  });
});
