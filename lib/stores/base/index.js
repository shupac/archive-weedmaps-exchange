/* eslint-disable no-underscore-dangle */
import { isObservableArray, isObservableMap, configure } from 'mobx';

export default class Store {
  /**
   * Factory method for creating a new instance of the store. Store instances are new on the server,
   * and singletons on the client
   * @param {object} initialState initial state to pass to hydration
   * @param {object} props
   * @param client - Apollo client
   * @param sdk
   * @param args
   * @returns {Store}
   */
  static initStore(initialState, props, client, sdk, ...args) {
    // before hydration, turn off strict mode
    configure({ enforceActions: false });

    if (!this.__store__) {
      this.__store__ = this.createStore(
        initialState,
        props,
        client,
        sdk,
        ...args,
      );
    }

    // turn it back on
    configure({ enforceActions: true });

    return this.__store__;
  }

  static createStore(initialState, props, client, sdk, ...args) {
    const store = new this(initialState, props, client, sdk, ...args);
    store.rehydrate(initialState);
    return store;
  }

  /**
   * Store constructor
   * Don't use this constructor client side, since we want all the stores to be Singletons
   * @param initialState initial state of the store
   * @param props
   * @param service
   * @param sdk
   */
  constructor(initialState, props, service, sdk) {
    this.service = service;
    this.sdk = sdk;
  }

  /**
   * Base rehydrate method
   * @param initialState
   */
  rehydrate(initialState = {}) {
    Object.keys(initialState).forEach(k => {
      if (isObservableArray(this[k]) || isObservableMap(this[k])) {
        this[k].replace(initialState[k]);
      } else {
        this[k] = initialState[k];
      }
    });
  }

  /**
   * Base dehydrate method, returns a serializable object
   * @returns {{}}
   */
  dehydrate() {
    return {};
  }
}
