// @flow
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Router } from 'lib/routes';
import { Provider } from 'mobx-react';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
import * as React from 'react';
import PageProgressBar from 'components/atoms/nprogress-bar';
import { type NextContext, type NextComponentType } from 'lib/next/types';
import logger from 'lib/common/logger';
import { createRootStore } from 'lib/data-access/stores';
import Client, {
  ExpressTokenStorage,
  BrowserTokenStorage,
} from '@ghostgroup/wm-sdk-js';
import config from 'config';
import { type StoreType } from 'lib/types/store';

const ENVS_FOR_DEBUG_WINDOW_STORES = ['acceptance', 'development'];

/**
 * Create SDK Instance
 * @param req
 * @param res
 */
function createSdk(req, res) {
  const COOKIE_CONFIG = {
    cookieDomain: config.cookieDomain,
    cookieKeyName: config.uatCookie,
  };

  return new Client({
    storage: req
      ? new ExpressTokenStorage({
          req,
          res,
          ...COOKIE_CONFIG,
        })
      : new BrowserTokenStorage(COOKIE_CONFIG),
    baseUrl: config.apiGatewayUrl,
  });
}

// The store is a singleton on the client so we must store it outside the module
// scope
let storeSingleton;

/**
 * Factory to create the MobX Store on every Express Request or a singleton
 * on the client side. Can take an initial state to apply as a snapshot
 * @param req
 * @param res
 * @param snapshot
 * @returns {*}
 */
function storeFactory(req, res, snapshot) {
  logger.debug(
    `Creating ${IS_SERVER ? 'new' : 'singleton'} store instances from store`,
  );

  if (IS_SERVER && !snapshot) {
    // Phase 1: Create store and pass SDK for data fetching
    // This happens during getInitialProps lifecycle
    return createRootStore(createSdk(req, res));
  } else if (IS_SERVER && snapshot) {
    // Phase 2: Create store and apply snapshot
    // This happens after getInitialProps during Rendering phase on the server
    const store = createRootStore(null);
    applySnapshot(store, snapshot);
    return store;
  } else if (!storeSingleton) {
    // Phase 3: This is the first phase on client mounting
    // Create the store again client side and apply the snapshot
    storeSingleton = createRootStore(createSdk());
    applySnapshot(storeSingleton, snapshot);
    return storeSingleton;
  }
  // Phase 4: Client store was already created
  // so return the singleton. This will happen on page transitions
  return storeSingleton;
}

function redirectBuyerOrSeller(ctx: NextContext, type: 'buyer' | 'seller') {
  if (type === 'buyer') {
    if (IS_SERVER) {
      // $FlowFixMe
      ctx.res.locals.redirect = '/buyer/marketplace/discover';
    } else {
      Router.pushRoute('/buyer/marketplace/discover');
    }
  } else if (type === 'seller') {
    if (IS_SERVER) {
      // $FlowFixMe
      ctx.res.locals.redirect = '/seller/orders';
    } else {
      Router.pushRoute('/seller/orders');
    }
  }
}

export default class ExchangeApp extends App {
  static async processRedirects(ctx: NextContext, store: StoreType) {
    const type = store.authStore.org.organizationType;
    const reqUrl = ctx.asPath;
    const isHomePage = reqUrl === '/';
    const isSellerUrl = reqUrl.startsWith('/seller');
    const isBuyerUrl = reqUrl.startsWith('/buyer');

    // A "both" org type means they have both buyers and sellers
    // so all routes are permitted, but we should switch context first
    if (type === 'both') {
      if (isSellerUrl) {
        await store.authStore.setUserContext('seller');
      } else {
        await store.authStore.setUserContext('buyer');
      }

      if (isHomePage) {
        redirectBuyerOrSeller(ctx, store.authStore.activeContext);
      }

      return;
    }

    // If they aren't both, we should redirect to the "homepage"
    // for the org type they have
    if (type === 'buyer' && (isSellerUrl || isHomePage)) {
      redirectBuyerOrSeller(ctx, 'buyer');
    } else if (type === 'seller' && (isBuyerUrl || isHomePage)) {
      redirectBuyerOrSeller(ctx, 'seller');
    }
  }

  static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: NextComponentType<*>,
    ctx: NextContext,
  }) {
    let initialProps = {};
    const { req, res } = ctx;

    // Create the store on the client or server
    const store = storeFactory(req, res);

    // Run the pages InitialProps
    // $FlowFixMe
    if (Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx, store);
    }

    // Process redirects
    if (store.authStore.loggedIn) {
      await ExchangeApp.processRedirects(ctx, store);
    }

    // If we are on the server, we need to snapshot the initial state
    // then we can serialize over the wire
    let storeInitialState;
    if (IS_SERVER) {
      storeInitialState = getSnapshot(store);
    }

    return { pageProps: initialProps, storeInitialState };
  }

  constructor(props: any) {
    super(props);
    this.initStores(props);
  }

  initStores(props: any) {
    // rehydrate the store on the client with any serialized state
    this.store = storeFactory(null, null, props.storeInitialState);

    if (
      !IS_SERVER &&
      ENVS_FOR_DEBUG_WINDOW_STORES.includes(process.env.NODE_ENV)
    ) {
      console.info(
        '%cDebug your MobX stores by accessing window.store.X',
        'color: white ; background-color: DeepPink',
      );
      window.store = this.store;
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Weedmaps Exchange</title>
        </Head>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
        <PageProgressBar />
      </Container>
    );
  }
}
