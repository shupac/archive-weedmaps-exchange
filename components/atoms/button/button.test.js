import React from 'react';
import { shallow } from 'enzyme';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import Button, { ButtonGradient, ButtonPrimary, ButtonWhite } from './';

describe('button', () => {
  it('It renders with no props', () => {
    const tree = shallow(<Button> Edit </Button>);
    expect(tree.find('button')).toHaveLength(1);
  });

  it('It renders width and height props', () => {
    const tree = shallow(
      <Button w={40} h={40}>
        Default Button
      </Button>,
    );
    expect(tree.find('button')).toHaveStyleRule('width', rem(40));
    expect(tree.find('button')).toHaveStyleRule('height', rem(40));
  });

  it('It renders a button with primary styles', () => {
    const tree = shallow(<ButtonPrimary>Primary Button</ButtonPrimary>).dive();
    expect(tree.find('button')).toHaveStyleRule(
      'background',
      theme.style.state.primary,
    );
  });

  it('It renders a button with gradient style', () => {
    const tree = shallow(<ButtonGradient>Gradient Button</ButtonGradient>);
    expect(tree.find('button')).toHaveStyleRule('border', '1px solid #CBD1E0');
  });

  it('It renders a button with white styles', () => {
    const tree = shallow(<ButtonWhite>White Button</ButtonWhite>).dive();
    expect(tree.find('button')).toHaveStyleRule(
      'background',
      theme.style.state.secondary,
    );
  });
});
