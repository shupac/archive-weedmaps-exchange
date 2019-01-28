export const makeStringArray = (key, value) => {
  if (value === null || value === undefined || value === '') return [];

  if (Array.isArray(value)) return value.map(v => `${key}[]=${v}`);
  if (typeof value === 'object')
    return Object.keys(value).reduce((acc, k) => {
      if (key) return acc.concat(makeStringArray(`${key}[${k}]`, value[k]));
      return acc.concat(makeStringArray(`${k}`, value[k]));
    }, []);
  return [`${key}=${value}`];
};

export const generateQuery = params => {
  const {
    search,
    categories,
    availability,
    brands,
    minPrice,
    maxPrice,
  } = params;

  let inStock;
  if (availability && availability.split('/').length === 1) {
    if (availability === 'inStock') inStock = true;
    else inStock = false;
  }

  const queryObject = {
    query: search,
    filter: {
      category_ids: categories ? categories.split('/') : null,
      brand_ids: brands ? brands.split('/') : null,
      in_stock: inStock,
      min_price: minPrice,
      max_price: maxPrice,
    },
  };

  const stringArray = makeStringArray('', queryObject);
  if (!stringArray.length) return null;

  return `?${stringArray.join('&')}`;
};
