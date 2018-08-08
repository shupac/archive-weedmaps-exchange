// @flow
import urlConfig from 'lib/common/url-config';
import type AxiosWrapper from 'lib/common/axios';

export default class RegionPlacementsService {
  fetch: AxiosWrapper;

  URL: string = urlConfig.coreApiUrl;
  LISTINGS_URL: string = `${urlConfig.coreApiUrl}/listings`;

  constructor(fetch: AxiosWrapper) {
    this.fetch = fetch;
  }

  async getRegionPlacementsIndex(regionId: number) {
    const url = `${this.URL}/regions/${regionId}/placements`;
    return this.fetch.get(url);
  }

  async postPlacements(placements: [any], regionId: number) {
    const body = {
      placements: placements.map(p => ({
        listing_wmid: p.listing.wmid,
        position: p.position,
      })),
      region_id: regionId,
    };
    return this.fetch.post(`${this.URL}/regions/${regionId}/placements`, body);
  }

  async updatePremiumPlacement(listingWmid: number, featureOrder: number) {
    const url = `${this.LISTINGS_URL}/${listingWmid}`;
    const body = { feature_order: featureOrder, package_level: 'listing_plus' };
    return this.fetch.patch(url, body);
  }

  async deleteNearbyPlacement(listingWmid: number, regionId: number) {
    const url = `${this.LISTINGS_URL}/${listingWmid}/placements/${regionId}`;
    return this.fetch.delete(url);
  }

  async deletePremiumPlacement(listingWmid: number, packageLevel: string) {
    const body = {
      package_level: packageLevel,
      feature_order: 9999,
    };
    const url = `${this.LISTINGS_URL}/${listingWmid}`;
    return this.fetch.patch(url, body);
  }
}
