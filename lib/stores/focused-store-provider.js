// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';
import { isServer as isServerFn } from 'lib/common/universal-helpers';
import logger from 'lib/common/logger';
import urlConfig from 'lib/common/url-config';
import Axios from 'lib/common/axios';
import BaseStore from 'lib/stores/base';
import config from 'config';
import Client, {
  ExpressTokenStorage,
  BrowserTokenStorage,
} from '@ghostgroup/wm-sdk-js';

const ENVS_FOR_DEBUG_WINDOW_STORES = ['acceptance', 'development'];

const COOKIE_CONFIG = {
  cookieDomain: config.cookieDomain,
  cookieKeyName: 'mwm.userAccessToken',
};

type StoreDefinitions = {
  [storeKey: string]: {
    Store: BaseStore,
    Service?: any,
  },
};

type Props = {
  req?: any,
  res?: any,
  isServer: boolean,
};

type InitialStoreState = {
  [key: string]: any,
};

function createTokenStorage(req, res, isServer) {
  if (isServer) {
    return new ExpressTokenStorage({
      req,
      res,
      ...COOKIE_CONFIG,
    });
  }
  return new BrowserTokenStorage(COOKIE_CONFIG);
}

function storeFactory(
  storeDefinitions: StoreDefinitions = {},
  initialState: InitialStoreState = {},
  props: Props,
  from: string,
) {
  const { req, res, isServer } = props;
  logger.debug(
    `Creating ${isServer ? 'new' : 'singleton'} store instances from ${from}`,
  );

  const axios = new Axios(req, res);
  const sdk = new Client({
    baseUrl: urlConfig.apiGatewayHost,
    storage: createTokenStorage(req, res, isServer),
  });

  return Object.keys(storeDefinitions).reduce((instances, storeKey) => {
    const service = storeDefinitions[storeKey].Service
      ? new storeDefinitions[storeKey].Service(axios, req, res)
      : null;

    const { Store } = storeDefinitions[storeKey];

    if (isServer) {
      instances[storeKey] = Store.createStore(
        initialState[storeKey],
        props,
        service,
        sdk,
      );
    } else {
      instances[storeKey] = Store.initStore(
        initialState[storeKey],
        props,
        service,
        sdk,
      );
    }

    return instances;
  }, {});
}

export default function withStores(
  PageComponent: React.ComponentType<any>,
  storeDefinitions: StoreDefinitions,
): React.ComponentType<any> {
  const displayName =
    PageComponent.displayName || PageComponent.name || 'Component';

  class StoreProvider extends React.Component<{}> {
    static displayName = displayName;
    static ComposedComponent = PageComponent;

    static getInitialProps: any => any;
    static async getInitialProps(props) {
      let initialProps = {};
      const { res } = props;
      const storeProps = {
        ...props,
        isServer: isServerFn(),
      };
      const stores = storeFactory(
        storeDefinitions,
        {},
        storeProps,
        displayName,
      );

      // $FlowFixMe
      if (PageComponent.getInitialProps) {
        initialProps = await PageComponent.getInitialProps(props, stores);
      }

      if (stores && stores.auth) {
        logger.debug('Flushing auth tokens');
        stores.auth.sdk.user.auth.flush();
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
      if (storeProps.isServer) {
        Object.keys(stores).forEach(k => {
          initialProps.storeInitialState[k] = stores[k].dehydrate();
        });
      }

      return { ...initialProps };
    }

    stores = {};

    constructor(props) {
      super(props);

      this.initStores(props);
    }

    initStores(props) {
      const storeProps = { ...props, isServer: isServerFn() };
      this.stores = storeFactory(
        storeDefinitions,
        props.storeInitialState,
        storeProps,
        displayName,
      );

      if (
        ENVS_FOR_DEBUG_WINDOW_STORES.includes(config.envName) &&
        !storeProps.isServer
      ) {
        logger.info(
          'Store DEBUG mode is ENABLED: (Try: `stores.auth.loggedIn` in console)',
        );
        window.stores = this.stores;
      }
    }

    render() {
      const { stores, props } = this;
      return (
        <Provider {...stores}>
          <PageComponent {...props} />
        </Provider>
      );
    }
  }

  return StoreProvider;
}
