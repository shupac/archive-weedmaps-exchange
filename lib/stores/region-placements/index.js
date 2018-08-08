// @flow
import { toJS, observable, action, runInAction } from 'mobx';
import type { IObservableArray } from 'mobx';
import Store from 'lib/stores/base';
import RegionPlacementsService from 'lib/services/region-placements';
import type { ListingPlacement } from 'lib/types/listing-placement';
import type { SelectionType } from 'lib/types/selection-type';
import NO_SELECTION from 'lib/types/selection-type';

export default class RegionPlacementsStore extends Store {
  @observable filterRegion: SelectionType = NO_SELECTION;
  regionPlacements: IObservableArray<ListingPlacement> = observable.array([]);
  @observable loading: boolean = false;

  constructor(state: Object, props: Object, service: RegionPlacementsService) {
    super(state, props, service);
    this.service = service;
  }

  setLoadingToFalse = (): void => {
    this.loading = false;
  };

  @action('setFilterRegion')
  setFilterRegion(region: SelectionType): void {
    this.filterRegion = region;
    if (region.id === 0) {
      this.regionPlacements.clear();
    } else {
      this.getPlacementsForRegion(region.id);
    }
  }

  @action('getPlacementsForRegion')
  async getPlacementsForRegion(regionId: number): Promise<void> {
    this.loading = true;

    try {
      const response = await this.service.getRegionPlacementsIndex(regionId);

      runInAction(
        (): void => {
          this.regionPlacements.replace(
            response.data.data.placements.map(placement => ({
              region: { id: regionId },
              ...placement,
            })),
          );
        },
      );
    } catch (err) {
      logger.error('getPlacementsForRegion failed:', err);
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  @action('updateNearbyPlacement')
  async updateNearbyPlacement(
    placement: ListingPlacement,
    regionId: number,
  ): Promise<any> {
    const placements = [placement];
    try {
      const result = await this.service.postPlacements(placements, regionId);
      this.updateCachedPlacement(placement);
      return result;
    } catch (err) {
      logger.error('update nearby placement failed:', err);
      return err;
    }
  }

  @action('deleteNearbyPlacement')
  async deleteNearbyPlacement(
    listingWmid: number,
    regionId: number,
  ): Promise<void> {
    this.loading = true;

    try {
      await this.service.deleteNearbyPlacement(listingWmid, regionId);

      runInAction(
        (): void => {
          this.regionPlacements.replace(
            this.regionPlacements.filter(
              (rp): boolean =>
                !this.isMatchingNearbyPlacement(rp, listingWmid, regionId),
            ),
          );
        },
      );
    } catch (err) {
      logger.error('delete placement failed:', err);
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  @action('updatePremiumPlacement')
  async updatePremiumPlacement(placement: ListingPlacement): Promise<any> {
    this.loading = true;
    try {
      const resp = await this.service.updatePremiumPlacement(
        placement.listing.wmid,
        placement.position,
      );
      this.updateCachedPlacement(placement);
      return resp;
    } catch (err) {
      logger.error('got an error updating placements:', err);
      return err;
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  @action('updateCachedPlacement')
  updateCachedPlacement(placement: ListingPlacement) {
    const exists = this.regionPlacements.find(
      p => p.listing.wmid === placement.listing.wmid,
    );

    if (!exists) {
      this.regionPlacements.push(placement);
    }

    this.regionPlacements.replace(
      this.regionPlacements
        .map(p => {
          if (p.listing.wmid === placement.listing.wmid) {
            return { ...p, position: placement.position };
          }
          return p;
        })
        .sort((a, b) => a.position - b.position),
    );
  }

  @action('deletePremiumPlacement')
  async deletePremiumPlacement(
    listingWmid: number,
    packageLevel: string,
  ): Promise<void> {
    this.loading = true;

    try {
      await this.service.deletePremiumPlacement(listingWmid, packageLevel);

      runInAction(
        (): void => {
          this.regionPlacements.replace(
            this.regionPlacements.filter(
              (rp): boolean =>
                !this.isMatchingPremiumPlacement(rp, listingWmid),
            ),
          );
        },
      );
    } catch (err) {
      logger.error('delete placement failed:', err);
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  dehydrate() {
    return { regionPlacements: toJS(this.regionPlacements) };
  }

  isMatchingNearbyPlacement(
    placement: ListingPlacement,
    listingWmid: number,
    regionId: number,
  ): boolean {
    return (
      placement.listing.wmid === listingWmid &&
      placement.region.id === regionId &&
      placement.type === 'NEARBY'
    );
  }

  isMatchingPremiumPlacement(
    placement: ListingPlacement,
    listingWmid: number,
  ): boolean {
    return (
      placement.listing.wmid === listingWmid && placement.type === 'PREMIUM'
    );
  }
}
