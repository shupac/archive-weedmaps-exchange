import React from 'react';
import { shallow } from 'enzyme';
import WmLogoDark, { LogoWrapper } from './';

describe('WmLogoDark', () => {
  it('should render logo', () => {
    const tree = shallow(<WmLogoDark width="200px" />);
    expect(tree.exists()).toEqual(true);
    expect(tree.find(LogoWrapper).dive()).toHaveStyleRule('width: 200px');
  });
});
