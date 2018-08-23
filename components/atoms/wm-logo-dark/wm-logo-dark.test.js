import React from 'react';
import { shallow } from 'enzyme';
import WmLogoDark from './';

describe('WmLogoDark', () => {
  it('should render logo', () => {
    const tree = shallow(<WmLogoDark />);
    expect(tree.exists()).toEqual(true);
  });
});
