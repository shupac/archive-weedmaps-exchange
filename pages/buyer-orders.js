// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
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
  openCancelModal = async (orderId: string) => {
    const { buyerOrders, uiStore } = this.props.store;

    await buyerOrders.cancelOrder(orderId);
    buyerOrders.refreshOrderInList(buyerOrders.orderData);

    uiStore.openModal('cancelOrder');
  };

  closeCancelModal = () => {
    const { buyerOrders, uiStore } = this.props.store;
    buyerOrders.cancelOrder(null);
    uiStore.closeModal();
  };

  submitCancelModal = async (reason: string) => {
    const { buyerOrders } = this.props.store;

    const { cancelOrderId } = buyerOrders;

    const success = await buyerOrders.updateOrderStatus(
      cancelOrderId,
      'canceled',
      reason,
    );

    if (success) this.closeCancelModal();
    else this.showErrorToast();

    await buyerOrders.fetchOrder(cancelOrderId);
    buyerOrders.refreshOrderInList(buyerOrders.orderData);
  };

  reorder = async (orderId: string) => {
    const { buyerOrders, uiStore, buyerCart } = this.props.store;

    const response = await buyerOrders.reorder(orderId);

    let alertContent;

    if (response) {
      const { itemsAdded } = response;
      alertContent = {
        title: this.getTitle(itemsAdded),
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

  getTitle = (itemsAdded: number) =>
    `You added ${itemsAdded} item${itemsAdded === 1 ? '' : 's'} to your cart`;

  showErrorToast = () => {
    const { uiStore } = this.props.store;

    uiStore.notifyToast({
      title: 'Could not complete request',
      body: 'The order status may have changed. Please try again.',
      status: ALERT_STATUS.ERROR,
    });
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
              onCancelOrder={this.openCancelModal}
              onReorder={this.reorder}
            />
          </ShowIfRoute>
          <ShowIfRoute match="/buyer/orders/(.*)">
            <BuyerPurchaseOrder
              orderId={orderId}
              onCancelOrder={() => this.openCancelModal(orderId)}
              onReorder={() => this.reorder(orderId)}
            />
          </ShowIfRoute>

          <CancelOrderModal
            context="buyer"
            onClose={this.closeCancelModal}
            onSubmit={this.submitCancelModal}
          />
        </PageContent>
      </PageLayout>
    );
  }
}

export default withRouter(AuthConnector(inject('store')(BuyerOrdersPage)));
export { BuyerOrdersPage };
