// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';
import { getSnapshot, applySnapshot, getEnv } from 'mobx-state-tree';
import { isServer as isServerFn } from 'lib/common/universal-helpers';
import logger from 'lib/common/logger';
import { createRootStore } from 'lib/data-access/stores';

const ENVS_FOR_DEBUG_WINDOW_STORES = ['acceptance', 'development'];

// The store is a singleton on the client so we must store it outside the module
// scope
let storeSingleton;

type Props = {
  req?: any,
  res?: any,
  isServer: boolean,
};

type InitialStoreState = {
  [key: string]: any,
};

/**
 * Factory to create the MobX Store on every Express Request or a singleton
 * on the client side. Can take an initial state to apply as a snapshot
 * @param initialState
 * @param props
 * @returns {*}
 */
function storeFactory(initialState: InitialStoreState = {}, props: Props) {
  const { req, res, isServer } = props;
  logger.debug(
    `Creating ${isServer ? 'new' : 'singleton'} store instances from store`,
  );

  if (isServer) {
    return createRootStore(req, res, isServer);
  }
  if (!storeSingleton) {
    storeSingleton = createRootStore(req, res, isServer);
    applySnapshot(storeSingleton, initialState);

    return storeSingleton;
  }
  return storeSingleton;
}

export default function provide(
  PageComponent: React.ComponentType<any>,
): React.ComponentType<any> {
  const displayName =
    PageComponent.displayName || PageComponent.name || 'Component';

  class StoreProvider extends React.Component<{}> {
    static displayName = displayName;
    static ComposedComponent = PageComponent;

    static getInitialProps: any => any;
    static async getInitialProps(props: Props) {
      let initialProps = {};
      const { res } = props;
      const storeProps = {
        ...props,
        isServer: isServerFn(),
      };
      // Create the store on the client or server
      const store = storeFactory({}, storeProps);

      // Run the pages InitialProps
      // $FlowFixMe
      if (PageComponent.getInitialProps) {
        initialProps = await PageComponent.getInitialProps(props, store);
      }

      // get SDK instance from Store
      const sdk = getEnv(store).wmSdk;
      if (storeProps.isServer && sdk) {
        logger.debug('Flushing auth tokens');
        sdk.user.auth.flush();
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
      if (storeProps.isServer) {
        initialProps.storeInitialState = getSnapshot(store);
      }
      return { ...initialProps };
    }

    store = {};

    constructor(props) {
      super(props);

      this.initStores(props);
    }

    initStores(props) {
      // rehydrate the store on the client with any serialized state
      const storeProps = { ...props, isServer: isServerFn() };
      this.store = storeFactory(props.storeInitialState, storeProps);
      if (
        !isServerFn() &&
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
