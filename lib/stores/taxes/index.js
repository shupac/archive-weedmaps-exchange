// @flow
import * as mobx from 'mobx';
import Store from 'lib/stores/base';
import get from 'lodash.get';
import TaxesService from 'lib/services/taxes';
import type { TaxesBulk } from 'lib/types/taxes';
import type { TaxesRow } from '../../types/taxes';

const { observable, action, runInAction } = mobx;

export default class TaxesStore extends Store {
  constructor(state: any, props: any, service: TaxesService) {
    super(state, props, service);
    this.service = service;
  }

  @observable listingTaxes = [];
  @observable taxesPreview = null;
  @observable loading = false;
  @observable previewLoading = false;
  @observable previewCategory = 'indica';
  @observable platformListing = {};
  listing = {};
  wmId = null;

  @action('startLoading')
  startLoading() {
    this.loading = true;
  }

  @action('stopLoading')
  stopLoading() {
    this.loading = false;
  }

  @action('startPreviewLoading')
  startPreviewLoading() {
    this.previewLoading = true;
  }

  @action('stopPreviewLoading')
  stopPreviewLoading() {
    this.previewLoading = false;
  }

  @action('setPreviewCategory')
  setPreviewCategory(category: string) {
    this.previewCategory = category;
  }

  convertSavedTaxes(
    taxRows: TaxesBulk[],
  ): {
    id?: string,
    delivery_fee: number,
    use_type: string,
    taxes: TaxesRow[],
  }[] {
    return taxRows.map(item => {
      delete item.attributes.inserted_at;
      delete item.attributes.updated_at;
      delete item.attributes.listing_id;
      item.attributes.id = item.id;
      return item.attributes;
    });
  }

  /**
   * Requests a tax preview representation from the service
   *
   * @param payload
   * @returns {Promise<void>}
   */
  @action('postTaxesPreview')
  async postTaxesPreview(payload: any) {
    this.startPreviewLoading();
    try {
      const response = await this.service.postTaxesPreview(payload);
      runInAction(() => {
        this.taxesPreview = get(response, 'data.data.attributes', {});
      });
      this.stopPreviewLoading();
    } catch (err) {
      logger.error('TAXES PREVIEW FAIL', err);
    } finally {
      this.stopPreviewLoading();
    }
  }

  /**
   * Sends request to get listing taxes via service
   *
   * @param wmid
   * @returns {Promise<void>}
   */
  @action('fetchListingTaxes')
  async fetchListingTaxes(wmId: number) {
    this.startLoading();
    try {
      const response = await this.service.getListingTaxes(wmId);
      const taxAttributes = get(response, 'data.data', {});
      const normalizedForm = this.convertSavedTaxes(taxAttributes);
      runInAction(() => {
        this.listingTaxes = normalizedForm;
      });
    } catch (err) {
      logger.error('FETCH LISTING TAXES FAIL', err);
    } finally {
      this.stopLoading();
    }
  }

  /**
   * Sends request to tax bulk_update via service
   *
   * @param payload
   * @returns {Promise<void>}
   */
  @action('bulkSaveTaxes')
  async bulkSaveTaxes(payload: any) {
    this.startLoading();
    try {
      const response = await this.service.patchTaxesUpdate(payload);
      const taxAttributes = get(response, 'data.data', {});
      const normalizedForm = this.convertSavedTaxes(taxAttributes);

      runInAction(() => {
        this.listingTaxes = normalizedForm;
      });
      this.stopLoading();
      return normalizedForm;
    } catch (err) {
      return logger.error('TAXES SAVE FAIL', err);
    } finally {
      this.stopLoading();
    }
  }

  /**
   * Sends request to delete single tax item
   *
   * @param taxId
   * @returns {Promise<void>}
   */
  async removeTaxItem(taxId: string) {
    try {
      await this.service.deleteListingTaxes(taxId, this.listing.wmid);
    } catch (err) {
      logger.error('DELETE TAX FAIL', err);
    } finally {
      this.stopLoading();
    }
  }

  /**
   * Requests the listing delivery fee from platform
   *
   * @param wmId
   * @returns {Promise<void>}
   */
  async fetchListing(wmId: number) {
    this.wmId = wmId;
    try {
      const { data } = await this.service.fetchListing(wmId);
      const listing = get(data, 'data.listing', '');
      const findListing = await this.service.fetchListingPlatform(
        listing.slug,
        listing.type,
      );
      this.listing = listing;
      runInAction(() => {
        this.platformListing = get(findListing, 'data.data.findListing', false);
      });
    } catch (err) {
      logger.error('FETCH DELIVERY FEE FAIL', err);
    }
  }

  async setTaxEnabledStatus(status: boolean) {
    try {
      const { data } = await this.service.mutateTaxesEnabled(
        this.listing.slug,
        this.listing.type,
        status,
      );
      const enabledStatus = get(data, 'data.updateListing', false);
      runInAction(() => {
        this.platformListing = enabledStatus;
      });
    } catch (err) {
      logger.error('SET TAXE STATUS FAIL', err);
    }
  }

  dehydrate() {
    return {
      listingTaxes: this.listingTaxes,
      taxesPreview: this.taxesPreview,
      listing: this.listing,
      platformListing: this.platformListing,
      loading: this.loading,
      previewLoading: this.previewLoading,
      previewCategory: this.previewCategory,
    };
  }
}
