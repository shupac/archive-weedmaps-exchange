class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    // Allow tests to easily coerce errors
    if (key === 'throw-get-error') throw new Error();
    return this.store[key] || null;
  }

  setItem(key, value) {
    if (key === 'throw-set-error') throw new Error();
    this.store[key] = value;
  }

  removeItem(key) {
    if (key === 'throw-remove-error') throw new Error();
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
