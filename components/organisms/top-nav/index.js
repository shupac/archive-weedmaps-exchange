// @flow
import React, { Component } from 'react';
import Menu from 'components/molecules/top-nav-menu';
import { inject, observer } from 'mobx-react';
import { Cart, Settings, Papers } from 'components/atoms/icons';
import Notification from 'components/molecules/top-nav-notification';
import LocationSelector from 'components/atoms/location-selector';
import UserDropdown from 'components/molecules/top-nav-user-dropdown';
import { type StoreType } from 'lib/types/store';
import { withRouter } from 'next/router';
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
  router: any,
  store: StoreType,
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
  'seller-products': (
    <Papers
      size={{ width: '24px', height: '24px' }}
      fill={theme.colors.primary}
    />
  ),
  'seller-orders': (
    <Cart
      size={{ width: '24px', height: '24px' }}
      fill={theme.colors.primary}
    />
  ),
};

const headerForPath = {
  cart: 'shopping cart',
  'buyer-orders': 'purchase orders',
  'seller-settings': 'Settings',
  'seller-products': 'products',
  'seller-orders': 'purchase orders',
};

// Add any pathname that will exclude the Location Selector into the array
const excludeLocationSelector = ['cart'];

export class TopNav extends Component<Props> {
  static defaultProps = {
    user: '',
    activeLink: null,
  };

  render() {
    const { router, store } = this.props;
    const { authStore, uiStore } = store;
    const { activeContext } = authStore;
    const { pathname } = router;
    const pathName = pathname && pathname.substring(1);

    return (
      <TopNavContainer>
        <LeftContainer>
          <MenuButton onClick={uiStore.toggleSideNavCollapse}>
            <Menu />
          </MenuButton>
          {pathName && (
            <NavContent>
              <div>{NavIcon[pathName]}</div>
              <span>{headerForPath[pathName] || pathName}</span>
            </NavContent>
          )}
          {activeContext === 'buyer' && (
            <LocationSelector
              isHidden={excludeLocationSelector.includes(pathName)}
            />
          )}
        </LeftContainer>
        <RightContainer>
          {activeContext === 'buyer' && <Notification />}
          <UserDropdown />
        </RightContainer>
      </TopNavContainer>
    );
  }
}
export default withRouter(inject('store')(observer(TopNav)));
