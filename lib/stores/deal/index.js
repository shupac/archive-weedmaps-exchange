// @flow
import { observable, action, runInAction } from 'mobx';
import DealService from 'lib/services/deal';
import Store from 'lib/stores/base';
import get from 'lodash.get';
import Days from 'lib/types/days';
import moment from 'moment';

export type Deal = {
  id?: number,
  dealType: string,
  listingWmid: number,
  title: string,
  pictureId?: number,
  description: string,
  discountDetails: {
    type: string,
  },
  menuItemIds?: number[],
  menuItemCategoryIds?: number[],
  startAt?: moment,
  endAt?: moment,
  daysOfTheWeek?: Days[] | null,
  minPrice?: number,
  maxPrice?: number,
  minWeight?: number,
  maxWeight?: number,
  minQuantity?: number,
  maxQuantity?: number,
};
type CurationStatus = 'approved' | 'pending' | 'denied';
export default class DealStore extends Store {
  constructor(state: any, props: any, service: DealService) {
    super(state, props, service);
    this.service = service;
  }

  @observable deal = {};
  @observable deals = [];
  @observable loading = false;

  statusToCurationStatusFilter = (status: CurationStatus) => {
    if (status === 'pending') {
      return 'needs_approval';
    } else if (status === 'denied') {
      return 'rejected';
    }
    return status;
  };

  setLoadingToFalse = () => {
    this.loading = false;
  };

  @action('createDeal')
  async createDeal(deal: Deal) {
    this.loading = true;

    try {
      const response = await this.service.postDeal(deal);

      runInAction(() => {
        this.deal = get(response, 'data.data.deal', {});
      });
    } catch (err) {
      logger.error('createDeal failed ', get(err, 'response.status'));
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  @action('updateDeal')
  async updateDeal(deal: Deal) {
    this.loading = true;

    try {
      const response = await this.service.patchDeal(deal);

      runInAction(() => {
        this.deal = get(response, 'data.data.deal', {});
      });
    } catch (err) {
      logger.error('updateDeal failed ', get(err, 'response.status'));
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  @action('deleteDeal')
  async deleteDeal(id: number) {
    this.loading = true;

    try {
      await this.service.deleteDeal(id);

      runInAction(() => {
        this.deals = this.deals.filter(deal => deal.id !== id);
      });
    } catch (err) {
      logger.error('deleteDeal failed ', get(err, 'response.status'));
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  async findDeal(id: number) {
    this.loading = true;

    try {
      const response = await this.service.getDeal(id);

      runInAction(() => {
        const dealParams = get(response, 'data.data.deal', {});
        const deal = this.service.paramsToDeal(dealParams);
        this.deal = deal;
      });
    } catch (err) {
      logger.error('getDeal failed ', get(err, 'response.status'));
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  getDeal(): any {
    return this.deal;
  }

  async getDealsByWmids(
    wmids: number[],
    {
      page = 1,
      pageSize = 20,
      curationStatus,
    }: {
      page: number,
      pageSize: number,
      curationStatus: CurationStatus,
    },
  ) {
    runInAction(() => {
      this.deals = [];
    });
    await Promise.all(
      wmids.map(async wmid => {
        const deals = await this.getDealsByWmid(wmid, {
          page,
          page_size: pageSize,
          curation_status: this.statusToCurationStatusFilter(curationStatus),
        });
        try {
          runInAction(() => {
            this.deals = [...this.deals, ...deals];
          });
        } catch (err) {
          logger.error('getDealsByWmid failed ', get(err, 'response.status'));
        }
      }),
    );
  }

  async getDealsByWmid(wmid: number, params: any) {
    try {
      const response = await this.service.getDealsByWmid(wmid, { params });
      const deals = get(response, 'data.data.deals', []);
      return deals;
    } catch (err) {
      logger.error('getDealsByWmid failed ', get(err, 'response.status'));
      return [];
    }
  }

  dehydrate() {
    return {
      deal: this.deal,
      deals: this.deals,
    };
  }
}
