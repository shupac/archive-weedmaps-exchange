import { makeStringArray, generateQuery } from './query-generator';

describe('makeStringArray', () => {
  it('should handle empty values', () => {
    expect(makeStringArray(null)).toEqual([]);
    expect(makeStringArray(undefined)).toEqual([]);
    expect(makeStringArray('')).toEqual([]);
  });

  it('should codify primitive values', () => {
    expect(makeStringArray('foo', 'bar')).toEqual(['foo=bar']);
    expect(makeStringArray('cow', 1)).toEqual(['cow=1']);
    expect(makeStringArray('dog', false)).toEqual(['dog=false']);
    expect(makeStringArray('cat', true)).toEqual(['cat=true']);
    expect(makeStringArray('zebra', 0)).toEqual(['zebra=0']);
  });

  it('should codify arrays', () => {
    expect(makeStringArray('foo', [1, 2, 3])).toEqual([
      'foo[]=1',
      'foo[]=2',
      'foo[]=3',
    ]);
    expect(makeStringArray('foo', ['a', 'b', 'c'])).toEqual([
      'foo[]=a',
      'foo[]=b',
      'foo[]=c',
    ]);
  });

  it('should codify objects', () => {
    expect(makeStringArray('', { dog: 'bark', cow: 'moo' })).toEqual([
      'dog=bark',
      'cow=moo',
    ]);
    expect(makeStringArray('foo', { dog: 'bark', cow: 'moo' })).toEqual([
      'foo[dog]=bark',
      'foo[cow]=moo',
    ]);
    expect(makeStringArray('foo', { dog: 2, cow: false })).toEqual([
      'foo[dog]=2',
      'foo[cow]=false',
    ]);
  });

  it('should codify objects containing arrays', () => {
    expect(
      makeStringArray('foo', { cat: [1, 2, 3], zebra: ['a', 'b', 'c'] }),
    ).toEqual([
      'foo[cat][]=1',
      'foo[cat][]=2',
      'foo[cat][]=3',
      'foo[zebra][]=a',
      'foo[zebra][]=b',
      'foo[zebra][]=c',
    ]);
  });
});

describe('generateQuery', () => {
  it('should handle empty query params', () => {
    const params = {
      search: '',
      availability: '',
      minPrice: undefined,
      maxPrice: null,
    };
    expect(generateQuery(params)).toEqual(null);
    expect(generateQuery({})).toEqual(null);
  });

  it('should generate query for in stock availability', () => {
    const params = {
      search: '',
      categories: '',
      availability: 'inStock',
      brands: '',
      minPrice: undefined,
      maxPrice: null,
    };
    expect(generateQuery(params)).toEqual('?filter[in_stock]=true');
  });

  it('should generate query for out of stock availability', () => {
    const params = {
      search: '',
      categories: '',
      availability: 'outOfStock',
      brands: '',
      minPrice: undefined,
      maxPrice: null,
    };
    expect(generateQuery(params)).toEqual('?filter[in_stock]=false');
  });

  it('should generate query for all availability', () => {
    const params = {
      search: '',
      categories: '',
      availability: 'inStock/outOfStock',
      brands: '',
      minPrice: undefined,
      maxPrice: null,
    };
    expect(generateQuery(params)).toEqual(null);
  });

  it('should generate query', () => {
    const params = {
      search: 'indica',
      categories: 'category1/category2/category3',
      availability: 'inStock/outOfStock',
      brands: 'brand1',
      minPrice: '1.00',
      maxPrice: '5.50',
    };
    expect(generateQuery(params)).toEqual(
      '?query=indica&filter[category_ids][]=category1&filter[category_ids][]=category2&filter[category_ids][]=category3&filter[brand_ids][]=brand1&filter[min_price]=1.00&filter[max_price]=5.50',
    );
  });
});
