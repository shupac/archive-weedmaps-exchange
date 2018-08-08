import React from 'react';
import { shallow } from 'enzyme';
import { WmLogoMini } from '../icons';

import { Avatar } from './index.js';

describe('Avatar', () => {
  it('should show default mini logo', () => {
    const tree = shallow(<Avatar />).dive();
    expect(tree.find(WmLogoMini)).toBeDefined();
  });

  it('should render avatar url if provided', () => {
    const tree = shallow(<Avatar avatarUrl="blank.jpg" />).dive();
    expect(tree.find('img').prop('src')).toEqual('blank.jpg');
  });

  it('should render out weedmaps avatar string in img alt if no alt is provided', () => {
    const tree = shallow(<Avatar avatarUrl="blank.jpg" />).dive();
    expect(tree.find('img').prop('alt')).toEqual('weedmaps avatar');
  });

  it('should render altTag string in img alt if provided', () => {
    const tree = shallow(
      <Avatar avatarUrl="blank.jpg" altTag="avatar" />,
    ).dive();
    expect(tree.find('img').prop('alt')).toEqual('avatar');
  });

  it('should render if no w or h is provided', () => {
    const tree = shallow(
      <Avatar avatarUrl="blank.jpg" altTag="avatar" />,
    ).dive();
    expect(tree.find('img').props()).toEqual({
      alt: 'avatar',
      height: 40,
      src: 'blank.jpg',
      width: 40,
    });
  });

  it('should render if w or h is provided', () => {
    const tree = shallow(
      <Avatar avatarUrl="blank.jpg" altTag="avatar" w={20} h={20} />,
    ).dive();
    expect(tree.find('img').props()).toEqual({
      alt: 'avatar',
      height: 20,
      src: 'blank.jpg',
      width: 20,
    });
  });
});
