// @flow
import React, { Component } from 'react';
import provide from 'lib/data-access/stores/provider';
import { withRouter } from 'next/router';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import ShowIfRoute from 'components/atoms/show-if-route';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import CancelOrderModal from 'components/organisms/cancel-order-modal';
import SellerPurchaseOrders from 'components/organisms/seller-purchase-orders';
import SellerPurchaseOrder from 'components/organisms/seller-purchase-order';

import { type StoreType } from 'lib/types/store';

type Props = {
  store: StoreType,
  router: any,
};

export class SellerOrdersPage extends Component<Props> {
  cancelOrder = async (orderId: string) => {
    const { sellerOrders, uiStore } = this.props.store;

    await sellerOrders.cancelOrder(orderId);
    uiStore.openModal('cancelOrder');
  };

  render() {
    const { router } = this.props;
    const {
      query: { orderId },
    } = router;

    return (
      <PageLayout>
        <PageContent>
          <ShowIfRoute match="/seller/orders">
            <SellerPurchaseOrders onCancelOrder={this.cancelOrder} />
          </ShowIfRoute>
          <ShowIfRoute match="/seller/orders/(.*)">
            <SellerPurchaseOrder
              orderId={orderId}
              onCancelOrder={() => this.cancelOrder(orderId)}
            />
          </ShowIfRoute>
          <CancelOrderModal />
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(
  withRouter(AuthConnector(inject('store')(SellerOrdersPage))),
);
