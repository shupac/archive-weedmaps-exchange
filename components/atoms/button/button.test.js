import React from 'react';
import { shallow, mount } from 'enzyme';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import Button, { ButtonGradient, ButtonPrimary, ButtonWhite } from './';

describe('button', () => {
  it('It renders with no props', () => {
    const button = shallow(<Button> Edit </Button>);
    expect(button.exists()).toEqual(true);
  });

  it('It renders width and height props', () => {
    const tree = mount(
      <Button w={40} h={40}>
        Default Button
      </Button>,
    );
    expect(tree.find('button')).toHaveStyleRule('width', rem(40));
    expect(tree.find('button')).toHaveStyleRule('height', rem(40));
  });

  it('It renders a button with primary styles', () => {
    const button = mount(<ButtonPrimary>Primary Button</ButtonPrimary>);
    expect(button).toHaveStyleRule('background', theme.style.state.primary);
  });

  it('It renders a button with gradient style', () => {
    const button = mount(<ButtonGradient>Gradient Button</ButtonGradient>);
    expect(button).toHaveStyleRule('border', '1px solid #CBD1E0');
  });

  it('It renders a button with white styles', () => {
    const button = mount(<ButtonWhite>White Button</ButtonWhite>);
    expect(button).toHaveStyleRule('background', theme.style.state.secondary);
  });
});
