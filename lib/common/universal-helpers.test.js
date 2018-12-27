import * as universalHelpers from './universal-helpers';

describe('universalHelpers', () => {
  describe('removeUndefinedProperties', () => {
    it('should remove undefined properities', () => {
      const obj = universalHelpers.removeUndefinedProperties({
        number: 1,
        string: 'foo',
        boolean: true,
        null: null,
        array: [],
        object: {},
        undefined,
        nested: {
          a: true,
          b: undefined,
        },
      });

      expect(obj).toEqual({
        number: 1,
        string: 'foo',
        boolean: true,
        null: null,
        array: [],
        object: {},
        nested: {
          a: true,
        },
      });
    });
  });
});
