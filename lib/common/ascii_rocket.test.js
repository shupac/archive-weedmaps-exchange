/* global it, expect, describe, beforeEach */
describe('ascii_rocket', () => {
  let rocket;
  beforeEach(() => {
    rocket = require('./ascii_rocket');
  });

  describe('acsii_rocket', () => {
    it('will be dank af', () => {
      expect(rocket).toBeDefined();
    });
  });
});
