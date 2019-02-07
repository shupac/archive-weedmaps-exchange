// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import ShowIfRoute from 'components/atoms/show-if-route';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import CancelOrderModal from 'components/organisms/cancel-order-modal';
import SellerPurchaseOrders from 'components/organisms/seller-purchase-orders';
import SellerPurchaseOrder from 'components/organisms/seller-purchase-order';
import { ALERT_STATUS } from 'lib/common/constants';

import { type StoreType } from 'lib/types/store';

type Props = {
  store: StoreType,
  router: any,
};

type OptionType = {
  text: string,
  value: string,
};

export class SellerOrdersPage extends Component<Props> {
  handleStatusChange = (orderId: string) => async (option: OptionType) => {
    const status = option.value;
    if (status === 'cancel') this.openCancelModal(orderId);
    else {
      const { sellerOrders } = this.props.store;
      const success = await sellerOrders.updateOrderStatus(orderId, status);
      if (!success) this.showErrorToast();
    }
  };

  openCancelModal = async (orderId: string) => {
    const { uiStore, sellerOrders } = this.props.store;

    await sellerOrders.cancelOrder(orderId);
    uiStore.openModal('cancelOrder');
  };

  closeCancelModal = () => {
    const { sellerOrders, uiStore } = this.props.store;
    sellerOrders.cancelOrder(null);
    uiStore.closeModal();
  };

  submitCancelModal = async (reason: string) => {
    const { sellerOrders } = this.props.store;

    const { cancelOrderId, ordersList } = sellerOrders;

    const success = await sellerOrders.updateOrderStatus(
      cancelOrderId,
      'canceled',
      reason,
    );

    if (success) this.closeCancelModal();
    else this.showErrorToast();

    await sellerOrders.fetchOrder(cancelOrderId);
    if (ordersList) sellerOrders.refreshOrderInList(sellerOrders.orderData);
  };

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
          <ShowIfRoute match="/seller/orders">
            <SellerPurchaseOrders onStatusChange={this.handleStatusChange} />
          </ShowIfRoute>
          <ShowIfRoute match="/seller/orders/(.*)">
            <SellerPurchaseOrder
              orderId={orderId}
              onStatusChange={this.handleStatusChange}
            />
          </ShowIfRoute>
          <CancelOrderModal
            context="seller"
            onClose={this.closeCancelModal}
            onSubmit={this.submitCancelModal}
          />
        </PageContent>
      </PageLayout>
    );
  }
}

export default withRouter(AuthConnector(inject('store')(SellerOrdersPage)));
