// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
import { isServer as isServerFn } from 'lib/common/universal-helpers';
import logger from 'lib/common/logger';
import { createRootStore } from 'lib/data-access/stores';
import Client, {
  ExpressTokenStorage,
  BrowserTokenStorage,
} from '@ghostgroup/wm-sdk-js';
import { cookieDomain, uatCookie, apiGatewayUrl } from 'config';

const isServer = isServerFn();
const ENVS_FOR_DEBUG_WINDOW_STORES = ['acceptance', 'development'];

type Props = {
  req?: any,
  res?: any,
  isServer: boolean,
};

/**
 * Create SDK Instance
 * @param req
 * @param res
 */
function createSdk(req, res) {
  const COOKIE_CONFIG = {
    cookieDomain,
    cookieKeyName: uatCookie,
  };

  return new Client({
    storage: req
      ? new ExpressTokenStorage({
          req,
          res,
          ...COOKIE_CONFIG,
        })
      : new BrowserTokenStorage(COOKIE_CONFIG),
    baseUrl: apiGatewayUrl,
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
    `Creating ${isServer ? 'new' : 'singleton'} store instances from store`,
  );

  if (isServer && !snapshot) {
    // Phase 1: Create store and pass SDK for data fetching
    // This happens during getInitialProps lifecycle
    return createRootStore(createSdk(req, res));
  } else if (isServer && snapshot) {
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

export default function provide(
  PageComponent: React.ComponentType<any>,
): React.ComponentType<any> {
  const displayName =
    PageComponent.displayName || PageComponent.name || 'Component';

  class StoreProvider extends React.Component<{}> {
    store: any; // TODO fix these types
    static displayName = displayName;
    static ComposedComponent = PageComponent;
    static async getInitialProps(props: Props) {
      let initialProps = {};
      const { req, res } = props;

      // Create the store on the client or server
      const store = storeFactory(req, res);

      // Run the pages InitialProps
      // $FlowFixMe
      if (PageComponent.getInitialProps) {
        initialProps = await PageComponent.getInitialProps(props, store);
      }

      // If we have been set to redirect, let's end the
      // Express response and label it as finished.
      // This needs to be done at this point so we can
      // refresh the auth cookie above BEFORE
      // we redirect (Server side only)
      if (res && res.WMredirecting) {
        logger.info('Redirecting at end of Express call');
        res.redirect(res.WMredirecting);
        res.end();
        res.finished = true;
        return {};
      }

      initialProps.storeInitialState = {};

      // If we are on the server, we need to snapshot the initial state
      // then we can serialize over the wire
      if (isServer) {
        initialProps.storeInitialState = getSnapshot(store);
      }
      return { ...initialProps };
    }

    constructor(props) {
      super(props);
      this.initStores(props);
    }

    initStores(props) {
      // rehydrate the store on the client with any serialized state
      this.store = storeFactory(null, null, props.storeInitialState);

      if (
        !isServer &&
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
      const { store, props } = this;

      return (
        <Provider store={store}>
          <PageComponent {...props} />
        </Provider>
      );
    }
  }

  return StoreProvider;
}
