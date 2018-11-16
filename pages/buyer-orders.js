// @flow
import React, { Component } from 'react';
import provide from 'lib/data-access/stores/provider';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import ShowIfRoute from 'components/atoms/show-if-route';
import BuyerPurchaseOrders from 'components/organisms/buyer-purchase-orders';
import BuyerPurchaseOrder from 'components/organisms/buyer-purchase-order';
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
          <ShowIfRoute match="/buyer/orders">
            <BuyerPurchaseOrders />
          </ShowIfRoute>
          <ShowIfRoute match="/buyer/orders/(.*)">
            <BuyerPurchaseOrder orderId={url.query.orderId} />
          </ShowIfRoute>
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(AuthConnector(inject('store')(Orders)));
