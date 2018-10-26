import { types } from 'mobx-state-tree';
import Client, {
  ExpressTokenStorage,
  BrowserTokenStorage,
} from '@ghostgroup/wm-sdk-js';
import { cookieDomain, uatCookie, apiGatewayUrl, apiRootPath } from 'config';
import Deserializer from 'lib/common/deserializer';
// Import Stores
import AuthStore from './auth';
import UiStore from './ui';
import BuyerSettings from './buyer-settings';
import BuyerProducts from './buyer-products';
import BuyerCart from './buyer-cart';
import AddressSuggestionsStore from './address-suggestions';

const COOKIE_CONFIG = {
  cookieDomain,
  cookieKeyName: uatCookie,
};

/**
 * Create the appropriate storage medium for either the client or the server
 * @param req
 * @param res
 * @param isServer
 * @returns {*}
 */
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

/**
 * It is important that ALL http requests go through this interface so that the
 * SDK can manage refreshing the Auth tokens. This is why this wrapper is required
 * @param sdk
 * @returns {{fetch: function(*, *=): *, post: function(*=, *=, *=): (*|{}), put: function(*=, *=, *=): (*|{}), patch: function(*=, *=, *=): (*|{}), delete: function(*=, *=): (*|{})}}
 */
function createSdkFetchWrapper(sdk) {
  const client = {
    fetch: (
      endpoint,
      config = {
        method: 'GET',
      },
    ) =>
      sdk.user.auth
        .fetch(`${apiGatewayUrl}${apiRootPath}${endpoint}`, {
          ...config,
        })
        .then(res => res.json())
        .then(data =>
          Deserializer.deserialize(data, {
            attributeFormat: 'camelCase',
          }),
        ),

    post: (endpoint, data) =>
      client.fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),

    put: (endpoint, data) =>
      client.fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),

    patch: (endpoint, data) =>
      client.fetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),

    delete: (endpoint, config = {}) =>
      client.fetch(endpoint, {
        method: 'DELETE',
        ...config,
      }),
  };
  return client;
}

// Define our RootStore
export const RootStore = types.model({
  addressSuggestions: AddressSuggestionsStore,
  authStore: AuthStore,
  buyerCart: BuyerCart,
  buyerProducts: BuyerProducts,
  buyerSettings: BuyerSettings,
  uiStore: UiStore,
});

/**
 * Factory to create a RootStore that takes an Express Request/Response and a flag
 * that tells us if we are on the server. This point can serve as our central "DI"
 * container since MobX state tree has a `getEnv` function to get env items from the
 * root store.
 * @param req
 * @param res
 * @param isServer
 * @returns {TAndInterface<ModelInstanceType<PROPS, OTHERS, {authStore: *}, ModelSnapshotType<PROPS>>, {toJSON?(): ModelSnapshotType<PROPS>} & IStateTreeNode<ModelCreationType<PROPS>, ModelSnapshotType<PROPS>>>}
 */
export const createRootStore = (req, res, isServer) => {
  const sdk = new Client({
    baseUrl: apiGatewayUrl,
    storage: createTokenStorage(req, res, isServer),
  });

  // Create a store with empty initial state
  return RootStore.create(
    {
      addressSuggestions: AddressSuggestionsStore.create(),
      authStore: AuthStore.create(),
      buyerCart: BuyerCart.create(),
      buyerProducts: BuyerProducts.create(),
      buyerSettings: BuyerSettings.create(),
      uiStore: UiStore.create(),
    },
    // MobX state tree "env" DI container. Store global Models and Stores will
    // here
    {
      isServer,
      wmSdk: sdk,
      client: createSdkFetchWrapper(sdk),
    },
  );
};

export default RootStore;
