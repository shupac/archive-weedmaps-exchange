/* global it, expect, describe, window, jest */
import { observable } from 'mobx';
import Store from './index';

describe('Store', () => {
  describe('dehydrate', () => {
    it('returns a serializable data structure', () => {
      const store = new Store({});
      expect(store.dehydrate()).toEqual({});
    });
  });

  describe('constructor', () => {
    it('will call this.rehydrate if defined', () => {
      const mock = jest.fn();
      class NewStore extends Store {
        rehydrate() {
          // eslint-disable-line class-methods-use-this
          mock();
        }
      }
      NewStore.createStore(false, { test: true }); // eslint-disable-line no-new
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('rehydrate', () => {
    it('will assign any matching keys on the store instance, from the initial data', () => {
      class NewStore extends Store {
        @observable
        location = null;
      }
      const store = NewStore.createStore({ location: '37.222, -134.223' });
      expect(store.location).toBe('37.222, -134.223');
    });
  });

  describe('initStore', () => {
    describe('on the server', () => {
      it('should return a new instance', () => {
        const store = Store.initStore({});
        expect(store).toBeInstanceOf(Store);
      });
    });
    describe('on the client', () => {
      it('should return a singleton instance', () => {
        const store = Store.initStore({});
        const newStore = Store.initStore({});
        expect(store).toBeInstanceOf(Store);
        expect(store).toEqual(newStore);
      });
    });
  });
});
