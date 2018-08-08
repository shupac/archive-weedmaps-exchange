/* global it, expect, describe */
import slugify from './slugify';

describe('slugify', () => {
  it('should convert a string to a slug', () => {
    expect(slugify('1. Some Text')).toBe('1-some-text');
  });

  it('should not need to convert a string that is already a slug', () => {
    expect(slugify('1-some-text')).toBe('1-some-text');
  });
});
