// @flow
const testLocalStorage = '__storage_test__';
let fallbackStorage;

export default class LocalStorage {
  storage: null | any = null;
  hasLocalStorage = false;

  constructor(storage: any) {
    try {
      storage.setItem(testLocalStorage, testLocalStorage);
      storage.removeItem(testLocalStorage);
      this.storage = storage;
      this.hasLocalStorage = true;
    } catch (e) {
      this.hasLocalStorage = false;
      if (!fallbackStorage) fallbackStorage = new Map();
    }
  }

  getInLocal(key: string) {
    if (this.storage && this.hasLocalStorage) {
      return this.storage.getItem(key);
    }
    return fallbackStorage.get(key);
  }

  setInLocal(key: string, value: string) {
    if (this.storage && this.hasLocalStorage) {
      this.storage.setItem(key, value);
    } else {
      fallbackStorage.set(key, value);
    }
  }

  removeInLocal(key: string) {
    if (this.storage && this.hasLocalStorage) {
      this.storage.removeItem(key);
    } else {
      fallbackStorage.delete(key);
    }
  }
}
