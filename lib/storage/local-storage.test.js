// @flow
import LocalStorage from './local-storage';

describe('LocalStorage Service', () => {
  let storage;

  describe('constructor success', () => {
    const MockStorage = {
      setItem: jest.fn(),
      removeItem: jest.fn(),
      getItem: jest.fn(),
    };

    beforeEach(() => {
      storage = new LocalStorage(MockStorage);
    });

    it('should check if it can set storage', () => {
      expect(MockStorage.setItem).toHaveBeenCalled();
      expect(MockStorage.removeItem).toHaveBeenCalled();
    });

    it("should set hasLocalStorage to true if storage methods don't fail", () => {
      expect(storage.hasLocalStorage).toBeTruthy();
    });

    it('should have get, set, and remove methods', () => {
      expect(storage.getInLocal).toBeDefined();
      expect(storage.setInLocal).toBeDefined();
      expect(storage.removeInLocal).toBeDefined();
    });

    it('should set using the storage', () => {
      storage.setInLocal('test', 'store this');
      expect(MockStorage.setItem).toHaveBeenCalledWith('test', 'store this');
    });

    it('should get using the storage', () => {
      storage.getInLocal('test');
      expect(MockStorage.getItem).toHaveBeenCalledWith('test');
    });

    it('should remove using the storage', () => {
      storage.removeInLocal('test');
      expect(MockStorage.removeItem).toHaveBeenCalledWith('test');
    });
  });

  describe('localStorage failure', () => {
    beforeEach(() => {
      storage = new LocalStorage({});
    });

    it('should set hasLocalStorage to false', () => {
      expect(storage.hasLocalStorage).toBeFalsy();
    });

    it('should still have get, set, and remove methods', () => {
      expect(storage.getInLocal).toBeDefined();
      expect(storage.setInLocal).toBeDefined();
      expect(storage.removeInLocal).toBeDefined();
    });

    it('return undefined if something does not exist', () => {
      expect(storage.getInLocal('test')).toBeUndefined();
    });

    it('should be able to set and get values', () => {
      storage.setInLocal('test', 'not undefined');
      expect(storage.getInLocal('test')).toEqual('not undefined');
    });

    it('should remove items', () => {
      storage.setInLocal('test', 'not undefined');
      storage.removeInLocal('test');
      expect(storage.getInLocal('test')).toBeUndefined();
    });
  });
});
