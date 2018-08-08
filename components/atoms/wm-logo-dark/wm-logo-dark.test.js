import React from 'react';
import renderer from 'react-test-renderer';
import WmLogoDark from './';

describe('WmLogoDark', () => {
  it('should render logo', () => {
    const tree = renderer.create(<WmLogoDark />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
