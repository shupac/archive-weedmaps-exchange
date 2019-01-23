import styled from 'styled-components';

import { Cart, Papers, Gear, Info } from 'components/atoms/icons';

function sizeIcon(icon) {
  return styled(icon).attrs({
    size: {
      width: '18px',
      height: '18px',
    },
  })``;
}

export const buyerData = [
  {
    name: 'Marketplace',
    icon: sizeIcon(Cart),
    route: {
      name: 'marketplace',
      params: {
        tab: 'discover',
      },
      path: '/marketplace',
    },
  },
  {
    name: 'Purchase Orders',
    icon: sizeIcon(Papers),
    route: {
      name: 'buyerOrders',
      path: '/buyer-orders',
    },
  },
];

export const sellerData = [
  {
    name: 'Purchase Orders',
    icon: sizeIcon(Cart),
    route: {
      name: 'sellerOrders',
      path: '/seller-orders',
    },
  },
  {
    name: 'Products',
    icon: sizeIcon(Papers),
    route: {
      name: 'sellerProducts',
      path: '/seller-products',
    },
  },
];

export const buyerFooterData = [
  {
    name: 'settings',
    icon: sizeIcon(Gear),
    route: {
      name: 'settings',
      params: {
        tab: 'profile',
      },
      path: '/settings',
    },
  },
  {
    name: 'help',
    icon: sizeIcon(Info),
    route: {
      name: 'help',
      path: '/help',
    },
  },
];

export const sellerFooterData = [
  {
    name: 'settings',
    icon: sizeIcon(Gear),
    route: {
      name: 'sellerSettings',
      params: {
        tab: 'general',
      },
      path: '/seller-settings',
    },
  },
  {
    name: 'help',
    icon: sizeIcon(Info),
    route: {
      name: 'help',
      path: '/help',
    },
  },
];
