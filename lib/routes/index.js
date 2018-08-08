const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('home', '/', 'index');
routes.add('dev-login', '/dev/login', 'login');

routes.add('deals-moderation', '/deals/moderation', 'deals-moderation');
routes.add('deals-placement', '/deals/placement', 'deals-placement');
routes.add('deals-management', '/deals/management', 'deals-management');
routes.add('deal-create', '/deals/:listingWmid/new', 'deal-create');
routes.add('deal-edit', '/deals/:listingWmid/edit/:dealId', 'deal-edit');
routes.add(
  'deals-schedule',
  '/deals/schedule/:listingWmid/new',
  'deals-schedule',
);

routes.add('pickup', '/pickup/:wmid', 'pickup');
routes.add('delivery', '/delivery/:wmid', 'delivery');

routes.add('taxes', '/taxes/:wmid', 'taxes');
routes.add('listings', '/listings/:wmid', 'listings');

routes.add(
  'listings-placements',
  '/listings-placements',
  'listings-placements',
);

// Use these to debug Honeybadger
// routes.add('error-1', '/error-1', 'error-1');
// routes.add('error-2', '/error-2', 'error-2');
// routes.add('error-3', '/error-3', 'error-3');

routes.add(
  'listings-placements-type',
  '/listings-placements/:listingType(storefronts|doctors|deliveries)',
  'listings-placements',
);
routes.config = {};

module.exports = routes;
