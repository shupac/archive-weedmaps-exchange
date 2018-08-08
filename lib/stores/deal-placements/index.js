import { toJS, observable, action, runInAction } from 'mobx';
import Store from 'lib/stores/base';

export default class DealPlacementsStore extends Store {
  constructor(state, props, service) {
    super(state, props, service);
    this.service = service;
  }

  @observable dealPlacements = {};
  @observable loading = false;

  async getDealPlacementsForRegion(regionId) {
    this.loading = true;

    const response = await this.service.getDealPlacementsIndex(regionId);

    runInAction(() => {
      this.dealPlacements = response.data.data.deal_placements;
      this.loading = false;
    });
  }

  async setDealPlacementsListForRegionAndType(placements, regionId, dealType) {
    const filteredPlacements = placements.filter(p => p.listing_wmid);

    await this.service.patchDealPlacements(
      filteredPlacements,
      regionId,
      dealType,
    );
  }

  async createDealPlacement(placement) {
    const {
      listing,
      type: dealType,
      region: { id: regionId, slug: regionSlug },
      position,
    } = placement;

    const placements = this.addToPlacements({
      deal_type: dealType,
      listing_wmid: listing.wmid,
      listing_name: listing.name,
      listing_id: listing.id,
      listing_avatar_image: '',
      position,
      region_id: regionId,
      region_slug: regionSlug,
      id: 0,
    });

    await this.setDealPlacementsListForRegionAndType(
      placements,
      regionId,
      dealType,
    );
  }

  async updateDealPlacement(placement) {
    this.removeFromPlacements(placement);
    await this.createDealPlacement(placement);
  }

  @action('addToPlacements')
  addToPlacements(placement) {
    const { dealPlacements } = this;
    const { deal_type: dealType } = placement;
    const placements = dealPlacements[dealType];
    placements.splice(placement.position - 1, 0, placement);
    return placements;
  }

  @action('removeFromPlacements')
  removeFromPlacements(placement) {
    const { dealPlacements } = this;
    const { type: dealType, listing } = placement;
    // filtering out placeholders
    const placements = dealPlacements[dealType].filter(
      p => p.listing_wmid !== listing.wmid,
    );

    dealPlacements[dealType] = placements;
  }

  dehydrate() {
    return {
      dealPlacements: toJS(this.dealPlacements),
    };
  }
}
