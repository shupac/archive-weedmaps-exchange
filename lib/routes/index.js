const nextRoutes = require('@ghostgroup/next-routes');

const routes = nextRoutes();

routes.add('home', '/', 'index');
routes.add('help', '/help', 'help');

// BUYER
routes.add(
  'marketplace',
  '/buyer/marketplace/:tab(discover|catalog|watchlist)?',
  'marketplace',
);
routes.add(
  'marketplaceProduct',
  '/buyer/marketplace/:tab(catalog)/product/:productId',
  'marketplace',
);

routes.add('cart', '/buyer/cart', 'cart');

routes.add('cartConfirmation', '/buyer/cart/confirmation/:orderId', 'cart');

routes.add('buyerOrders', '/buyer/orders', 'buyer-orders');

routes.add('buyerOrder', '/buyer/orders/:orderId', 'buyer-orders');

routes.add('settings', '/buyer/settings/:tab(profile|locations)?', 'settings');

// SELLER
routes.add('sellerOrders', '/seller/orders', 'seller-orders');

routes.add('sellerOrder', '/seller/orders/:orderId', 'seller-orders');

routes.add('sellerProducts', '/seller/products', 'seller-products');

routes.add('sellerProduct', '/seller/products/:productId', 'seller-products');

routes.add(
  'sellerSettings',
  '/seller/settings/:tab(general|profile|zones)?',
  'seller-settings',
);


routes.add('health', '/healthz');
routes.config = {};

module.exports = routes;
