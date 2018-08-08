// @flow
import urlConfig from 'lib/common/url-config';
import BiMap from 'bimap';

import type AxiosWrapper from 'lib/common/axios';
import type Deal from 'lib/stores/deal';

export type DealParams = {
  title?: string,
  picture_id?: number,
  description?: string,
  discount_type?: string,
  purchase_qty?: number,
  gift_qty?: number,
  gift_type?: string,
  gift_amount?: number,
  menu_item_ids?: [number],
  menu_item_category_ids?: [number],
};

export default class DealService {
  fetch: AxiosWrapper;

  constructor(fetch: AxiosWrapper) {
    this.fetch = fetch;
  }

  bimap = () => {
    const bimap = new BiMap();
    bimap.push('id', 'id');
    bimap.push('deal_type', 'dealType');
    bimap.push('listing_wmid', 'listingWmid');
    bimap.push('title', 'title');
    bimap.push('picture_id', 'pictureId');
    bimap.push('description', 'description');
    bimap.push('discount_details', 'discountDetails');
    bimap.push('menu_item_ids', 'menuItemIds');
    bimap.push('menu_item_category_ids', 'menuItemCategoryIds');
    bimap.push('start_at', 'startAt');
    bimap.push('end_at', 'endAt');
    bimap.push('days_of_the_week', 'daysOfTheWeek');
    bimap.push('min_price', 'minPrice');
    bimap.push('max_price', 'maxPrice');
    bimap.push('min_weight', 'minWeight');
    bimap.push('max_weight', 'maxWeight');
    bimap.push('min_quantity', 'minQuantity');
    bimap.push('max_quantity', 'maxQuantity');
    return bimap;
  };

  dealToParams(deal: Deal): DealParams {
    const bimap = this.bimap();
    return Object.keys(deal).reduce((obj, key) => {
      const newKey = bimap.val(key);
      if (newKey) {
        obj[newKey] = deal[key];
      }
      return obj;
    }, {});
  }

  paramsToDeal(params: DealParams): any {
    const bimap = this.bimap();
    const deal = Object.keys(params).reduce((obj, key) => {
      const newKey = bimap.key(key);
      if (newKey) {
        obj[newKey] = params[key];
      }
      return obj;
    }, {});
    if (params.discount_type) {
      deal.discountDetails = { type: params.discount_type }; // temp, waiting on BE change
    }
    return deal;
  }

  async postDeal(deal: Deal) {
    const { listingWmid } = deal;
    const URL = `${urlConfig.coreApiUrl}/listings/${listingWmid}/deals`;
    const params = this.dealToParams(deal);
    return this.fetch.post(URL, params);
  }

  async patchDeal(deal: Deal) {
    const dealId = deal.id;
    const URL = `${urlConfig.coreApiUrl}/deals/${dealId}`;
    const params = this.dealToParams(deal);
    return this.fetch.patch(URL, params);
  }

  async getDeal(id: number) {
    const URL = `${urlConfig.coreApiUrl}/deals/${id}`;
    return this.fetch.get(URL);
  }

  async getDealsByWmid(listingWmid: number, params: any) {
    const URL = `${urlConfig.coreApiUrl}/listings/${listingWmid}/deals`;
    return this.fetch.get(URL, params);
  }

  async deleteDeal(id: number) {
    const URL = `${urlConfig.coreApiUrl}/deals/${id}`;
    return this.fetch.delete(URL);
  }
}
