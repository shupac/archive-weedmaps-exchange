import { observable, action } from 'mobx';
import sortBy from 'lodash.sortby';
import fetch from 'axios';
import urlConfig from 'lib/common/url-config';
import Store from 'lib/stores/base';
import type { SearchStoreSuggestionsCall } from 'lib/types/suggestions';

export default class SearchStore extends Store {
  @observable loading = false;
  @observable active = false;
  @observable results = [];
  @observable selectionIndex = null;

  URL = `${urlConfig.apiV2Url}/suggestions`;

  @action('suggestions')
  suggestions: SearchStoreSuggestionsCall = (
    location: ?string,
    query: string,
    searchTypes: ?Array<string>,
    limit: number,
  ) => {
    const params = this.buildParams(location, query, searchTypes, limit);
    this.loading = true;
    return fetch
      .get(this.URL, { params })
      .then(
        action('onSuggestionsSuccess', response => {
          this.loading = false;
          const filteredData = searchTypes.reduce((acc, type) => {
            acc[type] = response.data[type];
            return acc;
          }, {});
          return filteredData;
        }),
      )
      .catch(
        action('onSuggestionsError', error => {
          this.loading = false;
          return error;
        }),
      );
  };

  @action('setSearchData')
  setSearchData = (data = {}) => {
    const categories = Object.keys(data).reverse();
    const active = categories.length > 0;
    const results = [];

    categories.forEach(category => {
      const items = data[category];
      sortBy(items, 'distance').forEach(item => {
        results.push({ ...item, category, resultIndex: results.length });
        if (item.nearby_listings) {
          item.nearby_listings.forEach(listing => {
            results.push({
              ...listing,
              category,
              resultIndex: results.length,
              parentId: item.id,
            });
          });
        }
      });
    });

    this.results = results;
    this.active = active;
    this.selectionIndex = null;
  };

  @action('setPlaceData')
  setPlaceData = data => {
    const neighborhoods = data.region.map(n =>
      Object.assign(n, { category: 'neighborhoods' }),
    );
    const regions = data.place.map(r =>
      Object.assign(r, { category: 'regions' }),
    );
    const results = neighborhoods
      .concat(regions)
      .map((r, resultIndex) => Object.assign(r, { resultIndex }));

    this.results = results;
    this.active = true;
    this.selectionIndex = null;
  };

  @action('setActive')
  setActive = active => {
    this.active = active;
  };

  @action('setSelectionIndex')
  setSelectionIndex = index => {
    this.selectionIndex = index;
  };

  @action('clearSearch')
  clearSearch = () => {
    this.active = false;
    this.results = [];
    this.selectionIndex = null;
  };

  constrainLimit(limit: number, category: string) {
    // Comply with server-defined limits. 10 for 'place', 20 otherwise.
    if (category === 'place') {
      limit = Math.min(limit, 10);
    }
    return Math.min(limit, 20) || 5;
  }

  buildParams(
    location: ?string,
    query: string,
    categories: ?Array<string>,
    limit: number,
  ) {
    // sets categoryArray;
    const latlng = location || null;
    const categoriesArray = categories || [
      'brand',
      'doctor',
      'dispensary',
      'delivery',
    ];
    const categoryObj = {
      q: query.toLowerCase(),
      latlng,
    };
    let categoryParamString = '';
    categoriesArray.forEach(category => {
      categoryParamString = `${category},${categoryParamString}`;
      limit = this.constrainLimit(limit, category);
      categoryObj[`${category}_max_size`] = limit;
    });
    categoryObj.types = categoryParamString;
    return categoryObj;
  }

  dehydrate() {
    return {
      loading: this.loading,
      active: this.active,
    };
  }
}
