// @flow
import { observable, runInAction } from 'mobx';
import Store from 'lib/stores/base';
import get from 'lodash.get';
import ListingsService from 'lib/services/taxes';

export default class ListingsStore extends Store {
  constructor(state: any, props: any, service: ListingsService) {
    super(state, props, service);
    this.service = service;
  }

  @observable listings = [];
  @observable totalListingsCount: number;
  @observable totalPages: number;

  async fetchListingsIndex(listingType: string, page: number) {
    try {
      const { data } = await this.service.fetchListingsIndex(listingType, page);

      runInAction(() => {
        this.listings = get(data, 'data', []);
        this.totalListingsCount = get(data, 'meta.total', 0);
        this.totalPages = get(data, 'meta.total_pages', 0);
      });
    } catch (err) {
      logger.error('LISTINGS FETCH FAIL', err);
    }
  }

  dehydrate() {
    return {
      listings: this.listings,
      totalListingsCount: this.totalListingsCount,
      totalPages: this.totalPages,
    };
  }
}
