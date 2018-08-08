/* global it, expect, describe, beforeEach */
describe('ascii_logo', () => {
  let logo;
  beforeEach(() => {
    logo = require('./ascii_logo');
  });

  describe('acsii_logo', () => {
    it('will be dank af', () => {
      expect(logo).toBeDefined();
    });
  });
});
