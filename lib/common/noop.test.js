/* global it, expect, describe */
import noop from './noop';

describe('noop', () => {
  it('is a function', () => {
    expect(noop).toBeInstanceOf(Function);
  });

  it('returns true', () => {
    expect(noop()).toBe(true);
  });
});
