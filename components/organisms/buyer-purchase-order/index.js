// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import at from 'lodash/at';
import StyledLink from 'components/atoms/styled-link';
import BackArrow from 'components/atoms/icons/back-arrow';
import StatusPill from 'components/atoms/order-status-pill';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import Loader from 'components/atoms/loader';
import { formatOrderId, formatCurrency } from 'lib/common/strings';
import { formatDate } from 'lib/common/date';
import { type StoreType } from 'lib/types/store';
import { STATUS_TYPES } from 'lib/common/constants';
import CancelOrderModal from './cancel-order-modal';
import ProductRow from './product-row';
import {
  PurchaseOrderWrapper,
  OrderHeader,
  OrderInfo,
  HeaderButtons,
  ProductsLabels,
  Totals,
  TotalsRow,
  Subtotal,
  TotalLabel,
  TotalDivider,
} from './styles';

type Props = {
  orderId: string,
  store: StoreType,
};

class BuyerPurchaseOrder extends Component<Props> {
  componentDidMount() {
    this.fetchOrder();
  }

  fetchOrder = () => {
    const { orderId, store } = this.props;
    store.buyerOrders.fetchOrder(orderId);
  };

  openCancelModal = () => {
    this.props.store.uiStore.openModal('cancelOrder');
    this.fetchOrder();
  };

  submitCancelOrder = async (reason: string) => {
    const { orderId, store } = this.props;

    const success = await store.buyerOrders.updateOrderStatus(
      orderId,
      'canceled',
      reason,
    );

    if (success) store.uiStore.closeModal();
  };

  render() {
    const { orderId, store } = this.props;

    const { buyerOrders, uiStore } = store;

    const { orderData } = buyerOrders;
    const { activeModal, closeModal } = uiStore;

    if (!orderData) return <Loader />;

    const {
      orderDate,
      buyerData,
      sellerData,
      expectedShipDateMin,
      expectedShipDateMax,
      status,
      statusReason,
      orderItems,
      subtotal,
      shippingFee,
      total,
    } = orderData;

    const address = at(JSON.parse(buyerData.buyerAddress), [
      'street_address',
      'city',
      'territory',
      'postal_code',
    ]).join(', ');

    const shipDate = `${formatDate(expectedShipDateMin)}-${formatDate(
      expectedShipDateMax,
    )}`;

    const { sellerId, sellerName } = sellerData;

    const brandLink = `/buyer/marketplace/catalog?brands=${sellerId}`;

    const { text: statusText, cancelable } = STATUS_TYPES[status];

    return (
      <PurchaseOrderWrapper>
        <OrderHeader>
          <StyledLink href="/buyer/orders">
            <BackArrow />
          </StyledLink>
          <span style={{ marginLeft: '16px' }}>
            Purchase Order: {formatOrderId(orderId)}
          </span>
          <HeaderButtons>
            <ButtonWhiteNoHover onClick={() => window.print()}>
              View or print
            </ButtonWhiteNoHover>
            {cancelable && (
              <ButtonWhiteNoHover onClick={() => this.openCancelModal()}>
                Cancel order
              </ButtonWhiteNoHover>
            )}
            <ButtonPrimary>Reorder</ButtonPrimary>
          </HeaderButtons>
        </OrderHeader>

        <OrderInfo>
          <table>
            <thead>
              <tr>
                <th>Seller Name</th>
                <th>Date Ordered</th>
                <th>Shipping Address</th>
                <th>Expected Shipping Date</th>
                <th>Status</th>
                {status === 'canceled' && <th>Reason for Cancellation</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <StyledLink href={brandLink}>{sellerName}</StyledLink>
                </td>

                <td>{formatDate(orderDate)}</td>
                <td>{address}</td>
                <td>{shipDate}</td>
                <td>
                  <StatusPill status={status} />
                </td>
                {status === 'canceled' && <td>{statusReason}</td>}
              </tr>
            </tbody>
          </table>
        </OrderInfo>

        <ProductsLabels>
          <div>Product</div>
          <div>Category</div>
          <div>Unit price</div>
          <div>Quantity</div>
          <div>Total</div>
        </ProductsLabels>

        <div>
          {orderItems.map(item => (
            <ProductRow key={item.id} item={item} />
          ))}
        </div>

        <Totals>
          <TotalsRow>
            <TotalLabel>Subtotal</TotalLabel>
            <Subtotal>{formatCurrency(subtotal)}</Subtotal>
          </TotalsRow>

          <TotalsRow>
            <TotalLabel>Shipping Fee</TotalLabel>
            <Subtotal>{formatCurrency(shippingFee)}</Subtotal>
          </TotalsRow>

          <TotalsRow>
            <TotalDivider />
          </TotalsRow>

          <TotalsRow>
            <TotalLabel>Total</TotalLabel>
            <Subtotal>{formatCurrency(total)}</Subtotal>
          </TotalsRow>
        </Totals>

        {activeModal === 'cancelOrder' && (
          <CancelOrderModal
            status={statusText}
            cancelable={cancelable}
            onClose={closeModal}
            onSubmit={this.submitCancelOrder}
            store={store}
          />
        )}
      </PurchaseOrderWrapper>
    );
  }
}
export default inject('store')(observer(BuyerPurchaseOrder));
export { BuyerPurchaseOrder };
