// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import provide from 'lib/data-access/stores/provider';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import ShowIfRoute from 'components/atoms/show-if-route';
import BuyerPurchaseOrders from 'components/organisms/buyer-purchase-orders';
import BuyerPurchaseOrder from 'components/organisms/buyer-purchase-order';
import CancelOrderModal from 'components/organisms/cancel-order-modal';
import { ALERT_STATUS } from 'lib/common/constants';

import { type StoreType } from 'lib/types/store';

type Props = {
  store: StoreType,
  router: any,
};

class BuyerOrdersPage extends Component<Props> {
  cancelOrder = async (orderId: string) => {
    const { buyerOrders, uiStore } = this.props.store;

    await buyerOrders.cancelOrder(orderId);
    uiStore.openModal('cancelOrder');
  };

  reorder = async (orderId: string) => {
    const { buyerOrders, uiStore, buyerCart } = this.props.store;

    const response = await buyerOrders.reorder(orderId);

    let alertContent;

    if (response) {
      const { itemsAdded } = response;
      alertContent = {
        title: `You added ${itemsAdded} item${
          itemsAdded === 1 ? '' : 's'
        } to you cart`,
        link: { label: 'VIEW CART', route: '/buyer/cart' },
        status: ALERT_STATUS.SUCCESS,
        autoDismiss: 4000,
      };
    } else {
      alertContent = {
        title: 'There were some issues with your request.',
        status: ALERT_STATUS.ERROR,
      };
    }

    uiStore.notifyToast(alertContent);
    buyerCart.fetchCart();
  };

  render() {
    const { router } = this.props;
    const {
      query: { orderId },
    } = router;

    return (
      <PageLayout>
        <PageContent>
          <ShowIfRoute match="/buyer/orders">
            <BuyerPurchaseOrders
              onCancelOrder={this.cancelOrder}
              onReorder={this.reorder}
            />
          </ShowIfRoute>
          <ShowIfRoute match="/buyer/orders/(.*)">
            <BuyerPurchaseOrder
              orderId={orderId}
              onCancelOrder={() => this.cancelOrder(orderId)}
              onReorder={() => this.reorder(orderId)}
            />
          </ShowIfRoute>

          <CancelOrderModal />
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(
  withRouter(AuthConnector(inject('store')(BuyerOrdersPage))),
);
export { BuyerOrdersPage };
