// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';

import Menu from 'components/molecules/top-nav-menu';
// import Heading from 'components/molecules/top-nav-heading';
import { Cart } from 'components/atoms/icons';
import Notification from 'components/molecules/top-nav-notification';
import theme from 'lib/styles/theme';
import {
  TopNavContainer,
  LeftContainer,
  RightContainer,
  MenuButton,
  NavContent,
} from './styles';

type Props = {
  activeLink: string,
  user: any,
  avatarUrl?: string,
  onMenuClick: string => void,
  pathname?: string,
};

const NavIcon = {
  marketplace: (
    <Cart
      size={{ width: '24px', height: '24px' }}
      fill={theme.colors.primary}
    />
  ),
};

export default class TopNav extends Component<Props> {
  static defaultProps = {
    user: '',
    activeLink: null,
  };

  render() {
    const { onMenuClick, pathname } = this.props;
    const pathName = pathname && pathname.substring(1);

    return (
      <TopNavContainer>
        <LeftContainer>
          <MenuButton onClick={onMenuClick}>
            <Menu />
          </MenuButton>
          {pathName && (
            <NavContent>
              <div>{NavIcon[pathName]}</div>
              <span>{pathName}</span>
            </NavContent>
          )}
        </LeftContainer>
        <RightContainer>
          <Notification count={3} />
        </RightContainer>
      </TopNavContainer>
    );
  }
}
