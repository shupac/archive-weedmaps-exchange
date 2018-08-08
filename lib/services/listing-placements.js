// @flow
/* eslint-disable camelcase */
import urlConfig from 'lib/common/url-config';
import type AxiosWrapper from 'lib/common/axios';
import type {
  NonPremiumPackageLevel,
  ListingPlacement,
} from 'lib/types/listing-placement';
import type {
  ListingSuggestionsCallReturn,
  ListingSuggestionsInputParams,
  ListingSuggestionsPlacementParams,
} from 'lib/types/listing-suggestions';
import type { SuggestionsCallParams } from 'lib/types/suggestions';

type ListingSuggestionsPlacement = SuggestionsCallParams & {
  placement?: ListingPlacement,
};

export default class ListingPlacementsService {
  fetch: AxiosWrapper;

  URL: string = `${urlConfig.coreApiUrl}/listings`;

  constructor(fetch: AxiosWrapper) {
    this.fetch = fetch;
  }

  placementToParams = (
    placement?: ListingPlacement,
  ): ListingSuggestionsPlacementParams => {
    if (placement === undefined) {
      return {};
    }

    const { region, type: placementType } = placement;

    if (placementType === 'NEARBY') {
      return {
        exclude_region_id: region.id,
        proximity_to_region_id: region.id,
      };
    }

    // PREMIUM creation
    return { region_id: region.id, package_levels: ['free', 'basic'] };
  };

  suggestionInputToParams = (
    inputParams: SuggestionsCallParams,
  ): ListingSuggestionsInputParams => {
    const { phrase: q, listingType: listing_type } = inputParams;
    return { q, listing_type };
  };

  async getListingPlacementsIndex(listingWmid: number): Promise<any> {
    const url = `${this.URL}/${listingWmid}/placements`;
    return this.fetch.get(url);
  }

  async deleteNearbyPlacement(
    listingWmid: number,
    regionId: number,
  ): Promise<any> {
    const url = `${this.URL}/${listingWmid}/placements/${regionId}`;
    return this.fetch.delete(url);
  }

  async deletePremiumPlacement(
    listingWmid: number,
    packageLevel: NonPremiumPackageLevel,
  ): Promise<any> {
    const body = {
      package_level: packageLevel,
      feature_order: 9999,
    };
    const url = `${this.URL}/${listingWmid}`;
    return this.fetch.patch(url, body);
  }

  async suggestions(
    suggestionPlacementParams: ListingSuggestionsPlacement,
  ): ListingSuggestionsCallReturn {
    const url = `${urlConfig.coreApiUrl}/listing_suggestions`;
    const { placement, ...suggestionInput } = suggestionPlacementParams;
    const params = {
      ...this.suggestionInputToParams(suggestionInput),
      ...this.placementToParams(placement),
    };

    try {
      const resp = await this.fetch.get(url, { params });
      return resp.data.data;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}
