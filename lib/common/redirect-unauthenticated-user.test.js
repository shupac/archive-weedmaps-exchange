/* eslint-disable import/first */
import { TYPE_DELIVERY } from 'lib/common/constants';

jest.mock('lib/routes');
import * as redirects from './redirect-unauthenticated-user';

const { redirectUnauthenticatedUser, redirectByName } = redirects;

describe('redirectUnauthenticatedUser', () => {
  let props;
  let stores;
  beforeEach(() => {
    props = {
      req: {
        protocol: 'https',
        hostname: 'internal-weedmaps.com/',
        originalUrl: 'pickup',
      },
      res: {
        redirect: jest.fn(),
        end: jest.fn(),
        finished: false,
      },
    };
    stores = {
      authStore: {
        loggedIn: false,
      },
    };
    global.location.assign = jest.fn();
  });

  describe('when user it not logged in', () => {
    describe('and we are on the server', () => {
      it('and we have all the url info', () => {
        const didRedirect = redirectUnauthenticatedUser(props, stores);
        expect(didRedirect).toBe(true);
        expect(props.res.WMredirecting).toEqual(
          'https://weedmaps.com/login?return_url=https://exchange.weedmaps.com/pickup',
        );
      });

      it('and we want to pass a custom path', () => {
        const didRedirect = redirectUnauthenticatedUser(props, stores, 'test');
        expect(didRedirect).toBe(true);
        expect(props.res.WMredirecting).toEqual(
          'https://weedmaps.com/login?return_url=https://exchange.weedmaps.com/test',
        );
      });
    });

    describe('and we are on the client', () => {
      beforeEach(() => {
        delete props.req;
        global.location.assign = jest.fn();
      });
      it('and we have all the url info', () => {
        const didRedirect = redirectUnauthenticatedUser(props, stores);
        expect(didRedirect).toBe(true);
        expect(global.location.assign).toHaveBeenCalledWith(
          'https://weedmaps.com/login?return_url=http://localhost/',
        );
      });
      it('and we want to pass a custom path', () => {
        const didRedirect = redirectUnauthenticatedUser(props, stores, 'test');
        expect(didRedirect).toBe(true);
        expect(global.location.assign).toHaveBeenCalledWith(
          'https://weedmaps.com/login?return_url=http://localhosttest',
        );
      });
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      stores.authStore.loggedIn = true;
    });
    it('it should not redirect', () => {
      const didRedirect = redirectUnauthenticatedUser(props, stores);
      expect(didRedirect).toBe(false);
    });
  });

  describe('should be able to redirect', () => {
    let routes;
    let mockRouter;
    beforeEach(() => {
      routes = require('lib/routes');
      routes.findByName.mockReturnValue({
        toPath: jest.fn().mockReturnValue('/delivery/slug/cart'),
      });
      mockRouter = require('lib/routes');
    });
    it('by name', () => {
      redirectByName({}, 'bagShow', { type: TYPE_DELIVERY, slug: 'slug' });
      expect(mockRouter.Router.pushRoute).toHaveBeenCalledWith(
        '/delivery/slug/cart',
      );
    });
  });
});
