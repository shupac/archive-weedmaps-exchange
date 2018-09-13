import qs from 'qs';
import mergeWith from 'lodash/mergeWith';

const queryOptions = {
  ignoreQueryPrefix: true,
  arrayFormat: 'bracket',
  encode: false,
  addQueryPrefix: true,
  skipNulls: true,
};

const generateQuery = (params, existingQuery = {}) => {
  const { category, availability, brands, price, search } = params;

  const queryObject = mergeWith(
    {},
    existingQuery,
    {
      search,
      category,
      availability,
      brands,
      minPrice: price ? price.min : undefined,
      maxPrice: price ? price.max : undefined,
    },
    (a, b) => (b === undefined ? a : b),
  );

  if (queryObject.minPrice === '') delete queryObject.minPrice;
  if (queryObject.maxPrice === '') delete queryObject.maxPrice;
  if (queryObject.search === '') delete queryObject.search;

  const query = qs.stringify(queryObject, queryOptions);

  return query;
};

export default {
  generateQuery,
};
