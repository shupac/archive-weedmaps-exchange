// @flow
import { observable, action, runInAction } from 'mobx';
import Store from 'lib/stores/base';
import get from 'lodash.get';
import findIndex from 'lodash.findindex';

export default class DealModerationStore extends Store {
  constructor(state: any, props: any, service: any) {
    super(state, props, service);
    this.service = service;
  }

  @observable deals = [];
  @observable totalDeals: number;
  @observable loading = false;

  setLoadingToFalse = () => {
    this.loading = false;
  };

  @action('getDealModerationsForRegion')
  async getDealModerationsForRegion({
    page,
    pageSize,
    curationStatus,
    regionId,
    titleMatch,
  }: {
    page: number,
    pageSize: number,
    curationStatus: 'approved' | 'denied' | 'pending',
    regionId: number,
    titleMatch?: string,
  }) {
    this.loading = true;

    try {
      const response = await this.service.getDeals({
        page,
        pageSize,
        regionId,
        curationStatus,
        titleMatch,
      });

      runInAction(() => {
        this.deals = get(response, 'data.data.deals', []);
        this.totalDeals = get(response, 'data.meta.total_deals', 0);
      });
    } catch (err) {
      logger.error(
        'getDealModerationsForRegion failed ',
        get(err, 'response.status'),
      );
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  @action('approveDeal')
  async approveDeal(id: number) {
    return this.moderateDeal({ id, approve: true });
  }

  @action('denyDeal')
  async denyDeal(id: number, curationReason: string) {
    return this.moderateDeal({ id, curationReason, approve: false });
  }

  @action('deleteDeal')
  async deleteDeal(id: number) {
    this.loading = true;

    try {
      await this.service.deleteDeal(id);

      runInAction(() => {
        this.deals = this.deals.filter(deal => deal.id !== id);
        this.totalDeals -= 1;
      });
    } catch (err) {
      logger.error('delete deal failed ', get(err, 'response.status'));
      runInAction(() => {
        const idx = findIndex(this.deals, { id });
        this.deals[idx] = {
          ...this.deals[idx],
          error: true,
        };
      });
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  async moderateDeal({
    id,
    approve,
    curationReason,
  }: {
    id: number,
    approve: boolean,
    curationReason?: string,
  }) {
    this.loading = true;

    try {
      const response = await this.service.moderateDeal({
        id,
        approve,
        curationReason,
      });

      runInAction(() => {
        this.deal = get(response, 'data.data.deal', null);
        const idx = findIndex(this.deals, { id });
        this.deals[idx] = {
          ...this.deals[idx],
          curation_status: this.deal.curation_status,
          error: false,
        };
      });
    } catch (err) {
      logger.error('moderate deal failed ', get(err, 'response.status'));
      runInAction(() => {
        const idx = findIndex(this.deals, { id });
        this.deals[idx] = {
          ...this.deals[idx],
          error: true,
        };
      });
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  dehydrate() {
    return {
      deals: this.deals,
      totalDeals: this.totalDeals,
    };
  }
}
