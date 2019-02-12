import * as mockData from 'mocks/json-api';
import { formatAttribute, formatAttributes } from './object';

describe('formatAttribute', () => {
  it('should convert attribute to camel case', () => {
    expect(formatAttribute('test_case', 'camelCase')).toEqual('testCase');
  });

  it('should convert attribute to snake case', () => {
    expect(formatAttribute('testCase', 'snakeCase')).toEqual('test_case');
  });

  it('should convert attribute to kebab case', () => {
    expect(formatAttribute('test-case', 'kebabCase')).toEqual('test-case');
  });

  it('should return original format if no provided', () => {
    expect(formatAttribute('test_case')).toEqual('test_case');
  });
});

describe('formatAttributes', () => {
  it('should convert attributes to camel case', () => {
    const result = formatAttributes(mockData.attributesObject, 'camelCase');
    expect(result).toEqual(mockData.attributesObjectCamel);
  });

  it('should return original format if no format is provided', () => {
    const result = formatAttributes(mockData.attributesObject);
    expect(result).toEqual(mockData.attributesObject);
  });
});
