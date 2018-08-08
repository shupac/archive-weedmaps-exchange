// @flow
import urlConfig from 'lib/common/url-config';
import type AxiosWrapper from 'lib/common/axios';

export default class Listings {
  fetch: AxiosWrapper;
  constructor(fetch: AxiosWrapper) {
    this.fetch = fetch;
  }

  fetchListingsIndex(listingType: string = 'dispensary', page: number = 1) {
    const URL = `${
      urlConfig.apiV1Url
    }/listings/?listing_type=${listingType}&page=${page}`;
    return this.fetch.get(URL);
  }
}
