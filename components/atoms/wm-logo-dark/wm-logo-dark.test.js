import React from 'react';
import { mount } from 'enzyme';
import WmLogoDark, { LogoWrapper } from './';

describe('WmLogoDark', () => {
  it('should render logo', () => {
    const tree = mount(<WmLogoDark width="200px" />);
    expect(tree.exists()).toEqual(true);
    expect(tree.find(LogoWrapper)).toHaveStyleRule('width: 200px');
  });
});
