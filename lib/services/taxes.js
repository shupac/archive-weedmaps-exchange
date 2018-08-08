// @flow
import urlConfig from 'lib/common/url-config';
import type AxiosWrapper from 'lib/common/axios';

export default class Taxes {
  fetch: AxiosWrapper;
  constructor(fetch: AxiosWrapper) {
    this.fetch = fetch;
  }

  fetchListingPlatform(slug: string, type: string) {
    const URL = `${urlConfig.platformUrl}`;
    return this.fetch.post(URL, {
      query: `{
        findListing(slug: "${slug}" , type: "${type}") {
          deliveryFee
          taxesEnabled
        }
      }`,
    });
  }

  mutateTaxesEnabled(
    slug: string,
    type: string,
    taxesEnabled: boolean | string,
  ) {
    const URL = `${urlConfig.platformUrl}`;
    return this.fetch.post(URL, {
      query: `mutation {
        updateListing(type: "${type}" , slug: "${slug}" , taxesEnabled: ${String(
        taxesEnabled,
      )}) {
          taxesEnabled
          deliveryFee
        }
      }`,
    });
  }

  fetchListing(wmId: number) {
    const URL = `${urlConfig.apiV2Url}/listings/${wmId}`;
    return this.fetch.get(URL);
  }

  postTaxesPreview(previewPayload: any) {
    const URL = `${urlConfig.taxesUrl}/preview`;
    return this.fetch.post(URL, previewPayload, {
      headers: { 'content-type': 'application/vnd.api+json' },
    });
  }

  patchTaxesUpdate(taxesPayload: any) {
    const URL = `${urlConfig.taxesUrl}/bulk_update`;
    return this.fetch.patch(URL, taxesPayload, {
      headers: { 'content-type': 'application/vnd.api+json' },
    });
  }

  getListingTaxes(wmId: number) {
    const URL = `${urlConfig.taxesUrl}/${wmId}`;
    return this.fetch.get(URL, {
      headers: { 'content-type': 'application/vnd.api+json' },
    });
  }

  deleteListingTaxes(taxId: string, wmId: number) {
    const URL = `${urlConfig.taxesUrl}/${taxId}`;
    return this.fetch.delete(URL, {
      headers: { 'content-type': 'application/vnd.api+json' },
      params: { listing_id: wmId },
    });
  }
}
