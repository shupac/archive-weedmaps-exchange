// @flow
import React, { Component } from 'react';
import provide from 'lib/data-access/stores/provider';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import ShowIfRoute from 'components/atoms/show-if-route';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import CancelOrderModal from 'components/organisms/cancel-order-modal';
import SellerPurchaseOrders from 'components/organisms/seller-purchase-orders';

import { type StoreType } from 'lib/types/store';

type Props = {
  store: StoreType,
  url: any,
};

export class SellerOrdersPage extends Component<Props> {
  cancelOrder = async (orderId: string) => {
    const { buyerOrders, uiStore } = this.props.store;

    await buyerOrders.cancelOrder(orderId);
    uiStore.openModal('cancelOrder');
  };

  render() {
    const { url } = this.props;
    const { pathname } = url;

    return (
      <PageLayout pathname={pathname}>
        <PageContent>
          <ShowIfRoute match="/seller/orders">
            <SellerPurchaseOrders onCancelOrder={this.cancelOrder} />
          </ShowIfRoute>
          <CancelOrderModal />
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(AuthConnector(inject('store')(SellerOrdersPage)));
