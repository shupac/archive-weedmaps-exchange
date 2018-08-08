// @flow
import React, { Component } from 'react';
import theme from 'lib/styles/theme';
import styled from 'styled-components';
import { Menu as MenuIcon } from 'components/atoms/icons';
import { rem } from 'polished';

const MenuContainer = styled.div`
  display: flex;
  align-content: center;
  height: ${rem(60)};
  width: ${rem(60)};
  border-right: 1px solid ${theme.colors.smoke};
`;

const IconWrapper = styled.div`
  transform: translate(73%, 37%);

  .menu-icon-fill {
    fill: ${theme.colors.aluminum};
  }

  :hover {
    .menu-icon-fill {
      fill: ${theme.colors.steel};
    }
  }
`;

type Props = {};

type State = {
  fill: string,
};

export default class Menu extends Component<Props, State> {
  state = {
    fill: theme.colors.aluminum,
  };

  render() {
    const { fill } = this.state;
    return (
      <MenuContainer>
        <IconWrapper>
          <MenuIcon size={{ width: '24px', height: '16px' }} fill={fill} />
        </IconWrapper>
      </MenuContainer>
    );
  }
}
