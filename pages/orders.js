// @flow
import React, { Component } from 'react';
import provide from 'lib/data-access/stores/provider';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import PurchaseOrders from 'components/organisms/purchase-orders';
import { type StoreType } from 'lib/types/store';

type Props = {
  store: StoreType,
  url: any,
};

export class Orders extends Component<Props> {
  render() {
    const { url } = this.props;
    const { pathname } = url;
    return (
      <PageLayout pathname={pathname}>
        <PageContent>
          <PurchaseOrders />
        </PageContent>
      </PageLayout>
    );
  }
}
export default provide(AuthConnector(inject('store')(Orders)));
