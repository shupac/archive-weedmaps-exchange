const nextRoutes = require('@ghostgroup/next-routes');

const routes = nextRoutes();

routes.add('home', '/', 'index');

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
routes.add('sellerProducts', '/seller/products', 'seller-products');

routes.add('sellerProduct', '/seller/products/:productId', 'seller-products');

routes.config = {};

module.exports = routes;
