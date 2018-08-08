import React from 'react';
import styled from 'styled-components';

import { Cart, Papers, WM, Gear, Info } from '@/components/common/Icons';

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
    path: '/buyer/marketplace',
  },
  {
    name: 'Orders',
    icon: sizeIcon(Papers),
    path: '/buyer/orders',
  },
  {
    name: 'Admin',
    icon: sizeIcon(WM),
  },
];

export const sellerData = [
  {
    name: 'Orders',
    icon: sizeIcon(Cart),
    path: '/seller/orders',
  },
  {
    name: 'Products',
    icon: sizeIcon(Papers),
    path: '/seller/products',
  },
  {
    name: 'Business',
    icon: sizeIcon(WM),
  },
];

export const buyerFooterData = [
  {
    name: 'settings',
    icon: sizeIcon(Gear),
    path: '/buyer/settings',
  },
  {
    name: 'help',
    icon: sizeIcon(Info),
  },
];

export const sellerFooterData = [
  {
    name: 'settings',
    icon: sizeIcon(Gear),
    path: '/seller/settings',
  },
  {
    name: 'help',
    icon: sizeIcon(Info),
  },
];
