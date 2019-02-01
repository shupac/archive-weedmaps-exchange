import ExchangeApp from 'pages/_app.js';

jest.mock('lib/routes');

describe('_app.js', () => {
  describe('ProcessRedirects', () => {
    describe('on the server', () => {
      beforeEach(() => {
        global.IS_SERVER = true;
      });

      afterEach(() => {
        global.IS_SERVER = false;
      });

      describe('when the org type is buyer', () => {
        it('will redirect from the homepage', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'buyer',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockContext.res.locals.redirect).toBe(
            '/buyer/marketplace/discover',
          );
        });

        it('will redirect to buyer page when a seller page is requested', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'buyer',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/seller/settings/zone',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockContext.res.locals.redirect).toBe(
            '/buyer/marketplace/discover',
          );
        });

        it('will do nothing when a buyer page is requested', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'buyer',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/buyer/cart',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockContext.res.locals.redirect).not.toBeDefined();
          expect(mockStore.authStore.setUserContext).not.toHaveBeenCalled();
        });
      });

      describe('when the org type is seller', () => {
        it('will redirect from the homepage', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'seller',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockContext.res.locals.redirect).toBe('/seller/orders');
        });

        it('will redirect to seller page when a buyer page is requested', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'seller',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/buyer/marketplace/discover',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockContext.res.locals.redirect).toBe('/seller/orders');
        });

        it('will do nothing when a seller page is requested', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'seller',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/seller/settings/zones',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockContext.res.locals.redirect).not.toBeDefined();
          expect(mockStore.authStore.setUserContext).not.toHaveBeenCalled();
        });
      });

      describe('when the org type is both', () => {
        it('will redirect from the homepage with buyer context', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'both',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
              activeContext: 'buyer',
            },
          };
          const mockContext = {
            asPath: '/',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockContext.res.locals.redirect).toBe(
            '/buyer/marketplace/discover',
          );
        });

        it('will redirect from the homepage with seller context', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'both',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
              activeContext: 'seller',
            },
          };
          const mockContext = {
            asPath: '/',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockContext.res.locals.redirect).toBe('/seller/orders');
        });

        it('will set the context to buyer with a buyer URL', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'both',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/buyer/marketplace/discover',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockStore.authStore.setUserContext).toHaveBeenCalledWith(
            'buyer',
          );
        });

        it('will set the context to seller with a seller URL', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'both',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/seller/marketplace/discover',
            res: { locals: {} },
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockStore.authStore.setUserContext).toHaveBeenCalledWith(
            'seller',
          );
        });
      });
    });

    describe('on the client', () => {
      let router;
      beforeEach(() => {
        global.IS_SERVER = false;
        router = require('lib/routes').Router;
      });

      describe('when the org type is buyer', () => {
        it('will redirect to buyer page when a seller page is requested', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'buyer',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/seller/settings/zone',
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(router.pushRoute).toHaveBeenCalledWith(
            '/buyer/marketplace/discover',
          );
        });

        it('will do nothing when a buyer page is requested', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'buyer',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/buyer/cart',
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockStore.authStore.setUserContext).not.toHaveBeenCalled();
        });
      });

      describe('when the org type is seller', () => {
        it('will redirect to seller page when a buyer page is requested', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'seller',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/buyer/marketplace/discover',
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(router.pushRoute).toHaveBeenCalledWith('/seller/orders');
        });

        it('will do nothing when a seller page is requested', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'seller',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/seller/settings/zones',
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockStore.authStore.setUserContext).not.toHaveBeenCalled();
        });
      });

      describe('when the org type is both', () => {
        it('will set the context to buyer with a buyer URL', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'both',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/buyer/marketplace/discover',
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockStore.authStore.setUserContext).toHaveBeenCalledWith(
            'buyer',
          );
        });

        it('will set the context to seller with a seller URL', async () => {
          const mockStore = {
            authStore: {
              org: {
                organizationType: 'both',
              },
              setUserContext: jest.fn().mockResolvedValue(true),
            },
          };
          const mockContext = {
            asPath: '/seller/marketplace/discover',
          };
          await ExchangeApp.processRedirects(mockContext, mockStore);
          expect(mockStore.authStore.setUserContext).toHaveBeenCalledWith(
            'seller',
          );
        });
      });
    });
  });
});
