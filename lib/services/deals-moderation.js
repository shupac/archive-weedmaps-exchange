// @flow
/* eslint-disable camelcase */
import urlConfig from 'lib/common/url-config';

import type AxiosWrapper from 'lib/common/axios';

type CurationStatus = 'approved' | 'pending' | 'denied';
export default class DealsModerationService {
  fetch: AxiosWrapper;

  constructor(fetch: AxiosWrapper) {
    this.fetch = fetch;
  }

  MODERATION_URL = `${urlConfig.coreApiUrl}/deals_moderation`;

  statusToCurationStatusFilter = (status: CurationStatus) => {
    if (status === 'pending') {
      return 'needs_approval';
    } else if (status === 'denied') {
      return 'rejected';
    }
    return 'approved';
  };

  async getDeals({
    regionId,
    page = 1,
    pageSize = 20,
    curationStatus,
    titleMatch,
  }: {
    regionId: number,
    page: number,
    pageSize: number,
    curationStatus: CurationStatus,
    titleMatch?: string,
  }) {
    const params = {
      page,
      page_size: pageSize,
      region_id: regionId,
      include_listing: true,
      curation_status: this.statusToCurationStatusFilter(curationStatus),
      title_match: titleMatch,
    };
    return this.fetch.get(this.MODERATION_URL, { params });
  }

  async moderateDeal({
    id,
    approve,
    curationReason,
  }: {
    id: number,
    approve: boolean,
    curationReason: string,
  }) {
    const params = {
      curation_status: approve ? 'Approve' : 'rejected',
      curation_reason: curationReason,
    };
    return this.fetch.patch(`${urlConfig.coreApiUrl}/deals/${id}/moderate`, {
      ...params,
    });
  }

  async deleteDeal(id: number) {
    return this.fetch.delete(`${urlConfig.coreApiUrl}/deals/${id}`);
  }
}
