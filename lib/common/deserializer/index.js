/**
 * JSONAPI Deserializer
 *
 * Deserializes serialized jsonapi data
 * Also accepts optional options object to change attribute format
 *
 * @prop {object} data - Root object from jsonapi response.
 * @prop {object} options - Options object. Currently accepting
 * attributeFormat {string} property to change attribute format.
 *
 *
 *  Example usage
 *  =============
 *  import Deserializer from 'lib/common/deserializer';
 *
 *  Deserializer.deserialize(data, {
 *    attributeFormat: 'camelCase',
 *  });
 *
 */

import get from 'lodash/get';
import { formatAttributes } from 'lib/common/object';

export const makeIncludedHash = included => {
  if (!included) return {};

  return included.reduce(
    (acc, item) => ({
      ...acc,
      [item.type]: {
        ...acc[item.type],
        [item.id]: item,
      },
    }),
    {},
  );
};

export const removeUndefinedProperties = object =>
  Object.keys(object)
    .filter(key => object[key] !== undefined)
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: object[key],
      }),
      {},
    );

const deserializeObject = (object, includedHash) => {
  const { id, attributes, relationships } = object;

  let relatedAttributes;

  if (relationships) {
    relatedAttributes = Object.keys(relationships).reduce((acc, key) => {
      const relatedData = relationships[key].data;

      if (!relatedData) return acc;

      if (Array.isArray(relatedData)) {
        const relatedDataDeserialized = relatedData.map(item => {
          const includedData = get(includedHash, [item.type, item.id], item);
          return deserializeObject(includedData, includedHash);
        });

        return {
          ...acc,
          [key]: relatedDataDeserialized,
        };
      }

      const includedData = get(
        includedHash,
        [relatedData.type, relatedData.id],
        relatedData,
      );

      return {
        ...acc,
        [key]: deserializeObject(includedData, includedHash),
      };
    }, {});
  }

  return {
    id,
    ...attributes,
    ...relatedAttributes,
  };
};

const deserialize = (item, includedHash, options = {}) => {
  if (!item) return null;

  if (Array.isArray(item))
    return item.map(v => deserialize(v, includedHash, options));
  return deserializeObject(item, includedHash, options);
};

const deserializeResponse = (response, options = {}) => {
  const { data, included, errors, meta } = response;

  const includedHash = makeIncludedHash(included);
  const { attributeFormat } = options;

  let result = {
    data: deserialize(data, includedHash),
    meta,
    errors,
  };

  result = formatAttributes(result, attributeFormat);
  result = removeUndefinedProperties(result);
  return result;
};

export default {
  deserialize: deserializeResponse,
};
