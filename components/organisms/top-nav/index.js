// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';

import Menu from 'components/molecules/top-nav-menu';
// import Heading from 'components/molecules/top-nav-heading';
import {
  TopNavContainer,
  LeftContainer,
  RightContainer,
  MenuButton,
} from './styles';

type Props = {
  activeLink: string,
  user: any,
  avatarUrl: string,
  onMenuClick: string => void,
};

export default class TopNav extends Component<Props> {
  static defaultProps = {
    user: '',
    activeLink: null,
  };

  render() {
    const { activeLink: active, onMenuClick } = this.props;

    return (
      <TopNavContainer>
        <LeftContainer>
          <MenuButton onClick={onMenuClick}>
            <Menu />
          </MenuButton>
        </LeftContainer>
        <RightContainer />
      </TopNavContainer>
    );
  }
}
