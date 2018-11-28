const nextRoutes = require('@ghostgroup/next-routes');

const routes = nextRoutes();

routes.add('home', '/', 'index');

routes.add(
  'marketplace',
  '/buyer/marketplace/:tab(discover|catalog|watchlist)?',
  'marketplace',
);

routes.add('cart', '/buyer/cart', 'cart');

routes.add('buyerOrders', '/buyer/orders', 'buyer-orders');

routes.add('buyerOrder', '/buyer/orders/:orderId', 'buyer-orders');

routes.add('cartConfirmation', '/buyer/cart/confirmation/:orderId', 'cart');

routes.add('settings', '/buyer/settings/:tab(profile|locations)?', 'settings');

routes.add(
  'marketplaceProduct',
  '/buyer/marketplace/:tab(catalog)/product/:productId',
  'marketplace',
);

routes.add('catalog', '/catalog', 'catalog');

routes.add('toast', '/toast', 'toast');

routes.config = {};

module.exports = routes;
