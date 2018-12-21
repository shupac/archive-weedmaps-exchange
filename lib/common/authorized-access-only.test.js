import authorizedAccessOnly from './authorized-access-only';

describe('authorizedAccessOnly', () => {
  let props;
  let stores;
  beforeEach(() => {
    props = {
      req: {
        protocol: 'https',
        hostname: 'weedmaps.com/',
        originalUrl: 'cart',
      },
      res: {
        send: jest.fn(),
      },
    };
    stores = {
      auth: {
        user: {
          roles: ['listing_owner'],
        },
      },
    };
  });

  describe('when user is unauthorized', () => {
    describe('and we are on the server', () => {
      beforeEach(() => {
        global.IS_SERVER = true;
      });

      afterEach(() => {
        global.IS_SERVER = false;
      });

      it('should return false and send "Unauthorized"', () => {
        const isAuthorized = authorizedAccessOnly(props, stores, [
          'ops_manager',
        ]);
        expect(isAuthorized).toBe(false);
        expect(props.res.send).toHaveBeenCalledWith(403, 'Unauthorized');
      });
    });
  });

  describe('when user is authorized', () => {
    beforeEach(() => {
      stores.auth.loggedIn = true;
    });
    it('it should return true and not call send', () => {
      const isAuthorized = authorizedAccessOnly(props, stores, [
        'listing_owner',
      ]);
      expect(isAuthorized).toBe(true);
      expect(props.res.send).not.toHaveBeenCalled();
    });
  });
});
