// @flow
import React, { Component } from 'react';
import Menu from 'components/molecules/top-nav-menu';
import { Cart, Settings, Papers } from 'components/atoms/icons';
import Notification from 'components/molecules/top-nav-notification';
import LocationSelector from 'components/atoms/location-selector';
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
  settings: <Settings size={{ width: '24px', height: '24px' }} />,
  cart: (
    <Cart
      size={{ width: '24px', height: '24px' }}
      fill={theme.colors.primary}
    />
  ),
  'buyer-orders': (
    <Papers
      size={{ width: '24px', height: '24px' }}
      fill={theme.colors.primary}
    />
  ),
};

const headerForPath = {
  cart: 'shopping cart',
  'buyer-orders': 'purchase orders',
};

// Add any pathname that will exclude the Location Selector into the array
const excludeLocationSelector = ['cart'];

export class TopNav extends Component<Props> {
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
              <span>{headerForPath[pathName] || pathName}</span>
            </NavContent>
          )}
          <LocationSelector
            isHidden={excludeLocationSelector.includes(pathName)}
          />
        </LeftContainer>
        <RightContainer>
          <Notification />
        </RightContainer>
      </TopNavContainer>
    );
  }
}
export default TopNav;
