// @flow
import * as mobx from 'mobx';
import type { IObservableArray } from 'mobx';
import Store from 'lib/stores/base';
import ListingPlacementsService from 'lib/services/listing-placements';
import type {
  ListingPlacement,
  NonPremiumPackageLevel,
} from 'lib/types/listing-placement';
import type { SelectionType } from 'lib/types/selection-type';
import NO_SELECTION from 'lib/types/selection-type';

const { observable, action, runInAction, toJS } = mobx;

export default class ListingPlacementsStore extends Store {
  @observable filterListing: SelectionType = NO_SELECTION;
  listingPlacements: IObservableArray<ListingPlacement> = observable.array([]);
  @observable loading: boolean = false;

  constructor(state: Object, props: Object, service: ListingPlacementsService) {
    super(state, props, service);
    this.service = service;
  }

  setLoadingToFalse = (): void => {
    this.loading = false;
  };

  @action('setFilterListing')
  setFilterListing(listing: SelectionType): void {
    this.filterListing = listing;
    if (listing.wmid === 0) {
      this.listingPlacements.clear();
    } else {
      this.getPlacementsForListing(listing.wmid);
    }
  }

  @action('getPlacementsForListing')
  async getPlacementsForListing(listingWmid: number): Promise<void> {
    this.loading = true;

    try {
      const response = await this.service.getListingPlacementsIndex(
        listingWmid,
      );

      runInAction(
        (): void => {
          this.listingPlacements.replace(
            response.data.data.placements.map(placement => ({
              listing: { wmid: listingWmid },
              ...placement,
            })),
          );
        },
      );
    } catch (err) {
      logger.error('getPlacementsForListing failed ', err);
    } finally {
      runInAction(this.setLoadingToFalse);
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
          this.listingPlacements.replace(
            this.listingPlacements.filter(
              (lp): boolean =>
                !this.isMatchingNearbyPlacement(lp, listingWmid, regionId),
            ),
          );
        },
      );
    } catch (err) {
      logger.error('delete placement failed ', err);
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  @action('deletePremiumPlacement')
  async deletePremiumPlacement(
    listingWmid: number,
    packageLevel: NonPremiumPackageLevel,
  ): Promise<void> {
    this.loading = true;

    try {
      await this.service.deletePremiumPlacement(listingWmid, packageLevel);

      runInAction(
        (): void => {
          this.listingPlacements.replace(
            this.listingPlacements.filter(
              (lp): boolean =>
                !this.isMatchingPremiumPlacement(lp, listingWmid),
            ),
          );
        },
      );
    } catch (err) {
      logger.error('delete placement failed ', err);
    } finally {
      runInAction(this.setLoadingToFalse);
    }
  }

  dehydrate() {
    return { listingPlacements: toJS(this.listingPlacements) };
  }

  isMatchingNearbyPlacement(
    listingPlacement: ListingPlacement,
    listingWmid: number,
    regionId: number,
  ): boolean {
    return (
      listingPlacement.listing.wmid === listingWmid &&
      listingPlacement.region.id === regionId &&
      listingPlacement.type === 'NEARBY'
    );
  }

  isMatchingPremiumPlacement(
    listingPlacement: ListingPlacement,
    listingWmid: number,
  ): boolean {
    return (
      listingPlacement.listing.wmid === listingWmid &&
      listingPlacement.type === 'PREMIUM'
    );
  }
}
