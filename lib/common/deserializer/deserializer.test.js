import Deserializer, {
  formatAttribute,
  formatAttributes,
  makeIncludedHash,
  removeUndefinedProperties,
} from './';
import * as mockData from './test-mock-data';

describe('makeIncludedHash', () => {
  it('should convert included array to hash mapped by type and id', () => {
    const result = makeIncludedHash(mockData.mockIncluded);
    expect(result).toEqual(mockData.mockIncludedHash);
  });
});

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

describe('removeUndefinedProperties', () => {
  it('should remove all properties that are undefined', () => {
    const result = removeUndefinedProperties(mockData.undefinedProperties);
    expect(result).toEqual(mockData.undefinedPropertiesRemoved);
  });
});

describe('Deserializer', () => {
  it('should deserialize an object without related data', () => {
    const result = Deserializer.deserialize(mockData.noRelatedData);
    expect(result).toEqual(mockData.noRelatedDataDeserialized);
  });

  it('should deserialize an object with related data', () => {
    const result = Deserializer.deserialize(mockData.relatedData);
    expect(result).toEqual(mockData.relatedDataDeserialized);
  });

  it('should transform properties into camel case', () => {
    const result = Deserializer.deserialize(mockData.relatedData, {
      attributeFormat: 'camelCase',
    });
    expect(result).toEqual(mockData.relatedDataDeserializedCamel);
  });

  it('should deserialize an array of data', () => {
    const result = Deserializer.deserialize(mockData.arrayData, {
      attributeFormat: 'camelCase',
    });
    expect(result).toEqual(mockData.arrayDataDeserialized);
  });

  it('should deserialize nested related data', () => {
    const result = Deserializer.deserialize(mockData.nestedData, {
      attributeFormat: 'camelCase',
    });
    expect(result).toEqual(mockData.nestedDataDeserialized);
  });

  it('should deserialize data with no included data', () => {
    const result = Deserializer.deserialize(mockData.noIncluded, {
      attributeFormat: 'camelCase',
    });
    expect(result).toEqual(mockData.noIncludedDeserialized);
  });

  it('should add any meta data', () => {
    const result = Deserializer.deserialize(mockData.meta, {
      attributeFormat: 'camelCase',
    });
    expect(result).toEqual(mockData.metaDeserialized);
  });

  it('should add any errors', () => {
    const result = Deserializer.deserialize(mockData.errors, {
      attributeFormat: 'camelCase',
    });
    expect(result).toEqual(mockData.errorsDeserialized);
  });
});
