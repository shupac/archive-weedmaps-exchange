import { Cart, Papers, Gear, Info } from 'components/atoms/icons';

export const buyerData = [
  {
    name: 'Marketplace',
    icon: Cart,
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
    icon: Papers,
    route: {
      name: 'buyerOrders',
      path: '/buyer-orders',
    },
  },
];

export const sellerData = [
  {
    name: 'Purchase Orders',
    icon: Cart,
    route: {
      name: 'sellerOrders',
      path: '/seller-orders',
    },
  },
  {
    name: 'Products',
    icon: Papers,
    route: {
      name: 'sellerProducts',
      path: '/seller-products',
    },
  },
];

export const buyerFooterData = [
  {
    name: 'settings',
    icon: Gear,
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
    icon: Info,
    route: {
      name: 'help',
      path: '/help',
    },
  },
];

export const sellerFooterData = [
  {
    name: 'settings',
    icon: Gear,
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
    icon: Info,
    route: {
      name: 'help',
      path: '/help',
    },
  },
];
