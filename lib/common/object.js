import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import kebabCase from 'lodash/kebabCase';

const attributeFormats = {
  camelCase,
  snakeCase,
  kebabCase,
};

export const formatAttribute = (key, format) => {
  if (!format) return key;
  return attributeFormats[format](key);
};

export const formatAttributes = (object, format) => {
  if (!format) return object;

  if (object === null) return null;

  if (Array.isArray(object))
    return object.map(item => formatAttributes(item, format));

  if (typeof object === 'object') {
    return Object.keys(object).reduce(
      (acc, key) => ({
        ...acc,
        [formatAttribute(key, format)]: formatAttributes(object[key], format),
      }),
      {},
    );
  }

  return object;
};
