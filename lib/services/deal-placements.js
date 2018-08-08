// @flow
import urlConfig from 'lib/common/url-config';

import type AxiosWrapper from 'lib/common/axios';

export default class DealPlacementsService {
  fetch: AxiosWrapper;

  constructor(fetch: AxiosWrapper) {
    this.fetch = fetch;
  }

  URL = `${urlConfig.coreApiUrl}/deal_placements`;

  async getDealPlacementsIndex(regionId: number) {
    const url = `${this.URL}?region_id=${regionId}&deal_type=daily`;
    return this.fetch.get(url);
  }

  async patchDealPlacements(
    placements: [any],
    regionId: number,
    dealType: string,
  ) {
    const body = {
      deal_placements: placements.map(p => ({
        listing_wmid: p.listing_wmid,
        position: p.position,
      })),
      region_id: regionId,
      deal_type: dealType,
    };

    return this.fetch.patch(this.URL, body);
  }
}
