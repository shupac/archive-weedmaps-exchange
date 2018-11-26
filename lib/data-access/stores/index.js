import { types } from 'mobx-state-tree';
import { apiGatewayUrl, apiRootPath } from 'config';
import Deserializer from 'lib/common/deserializer';
import { isServer as isServerFn } from 'lib/common/universal-helpers';
// Import Stores
import AuthStore from './auth';
import UiStore from './ui';
import BuyerSettings from './buyer-settings';
import BuyerProducts from './buyer-products';
import BuyerCart from './buyer-cart';
import BuyerOrders from './buyer-orders';
import AddressSuggestionsStore from './address-suggestions';

const isServer = isServerFn();

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
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      },
    ) =>
      sdk
        .fetch(`${apiGatewayUrl}${apiRootPath}${endpoint}`, {
          ...config,
        })
        .then(res => {
          if (res.status === 204) {
            return res;
          }
          return res.json();
        })
        .then(data =>
          Deserializer.deserialize(data, {
            attributeFormat: 'camelCase',
          }),
        ),

    post: (endpoint, data, config) =>
      client.fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        ...config,
      }),

    put: (endpoint, data, config) =>
      client.fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        ...config,
      }),

    patch: (endpoint, data, config) =>
      client.fetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        ...config,
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
  buyerOrders: BuyerOrders,
  uiStore: UiStore,
});

/**
 * Factory to create a RootStore that takes an instance of the SDK and a flag
 * that tells us if we are on the server. This point can serve as our central "DI"
 * container since MobX state tree has a `getEnv` function to get env items from the
 * root store.
 * @param sdk
 */
export const createRootStore = sdk =>
  // Create a store with empty initial state
  RootStore.create(
    {
      addressSuggestions: AddressSuggestionsStore.create(),
      authStore: AuthStore.create(),
      buyerCart: BuyerCart.create(),
      buyerProducts: BuyerProducts.create(),
      buyerSettings: BuyerSettings.create(),
      buyerOrders: BuyerOrders.create(),
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

export default RootStore;
