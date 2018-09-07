const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('home', '/', 'index');

routes.add(
  'marketplace',
  '/buyer/marketplace/:tab(discover|catalog|watchlist)?',
  'marketplace',
);

routes.add('dev-login', '/dev/login', 'login');

routes.add('catalog', '/catalog', 'catalog');

routes.add('toast', '/toast', 'toast');

routes.config = {};

module.exports = routes;
