// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
import at from 'lodash/at';
import StyledLink from 'components/atoms/styled-link';
import BackArrow from 'components/atoms/icons/back-arrow';
import StatusPillDropDown from 'components/atoms/order-status-pill/status-pill-dropdown';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import Loader from 'components/atoms/loader';
import { formatOrderId, formatCurrency } from 'lib/common/strings';
import ProductRow from 'components/organisms/buyer-purchase-order/product-row';
import { formatDate } from 'lib/common/date';
import { type StoreType } from 'lib/types/store';
import { type PurchaseOrderType } from 'models/purchase-order';
import { STATUS_TYPES } from 'lib/common/constants';
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
  StyledSellerName,
  InstructionWrapper,
} from './styles';
import BuyerDetailsModal from './buyer-details-modal';

type Props = {
  orderId: string,
  store: StoreType,
  onCancelOrder: string => void,
  onReorder: string => void,
};

class SellerPurchaseOrder extends Component<Props> {
  @observable
  orderData: ?PurchaseOrderType = null;

  dispose = reaction(
    () => {
      const { uiStore, sellerOrders } = this.props.store;
      const { activeModal, modalTransitioning } = uiStore;
      const { orderData } = sellerOrders;

      return { activeModal, modalTransitioning, orderData: { ...orderData } };
    },
    ({ activeModal, modalTransitioning, orderData }) => {
      if (!activeModal && !modalTransitioning) this.orderData = orderData;
    },
    { name: 'Watch modal transition' },
  );

  componentDidMount() {
    const { orderId, store } = this.props;
    store.sellerOrders.fetchOrder(orderId);
  }

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    const { orderId, onCancelOrder, store } = this.props;

    if (!this.orderData) return <Loader />;

    const {
      orderDate,
      buyerData,
      expectedShipDateMin,
      expectedShipDateMax,
      status,
      statusReason,
      orderItems,
      subtotal,
      shippingFee,
      total,
    } = this.orderData;

    const address = at(JSON.parse(buyerData.buyerAddress), [
      'street_address',
      'city',
      'territory',
      'postal_code',
    ]).join(', ');

    const shipDate = `${formatDate(expectedShipDateMin)}-${formatDate(
      expectedShipDateMax,
    )}`;

    const {
      buyerDeliveryInstructions,
      buyerEmail,
      buyerLicenses,
      buyerPhone,
      buyerName,
    } = buyerData;

    const { cancelable } = STATUS_TYPES[status];

    return (
      <PurchaseOrderWrapper>
        <OrderHeader>
          <StyledLink href="/seller/orders">
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
              <ButtonPrimary onClick={onCancelOrder}>
                Cancel order
              </ButtonPrimary>
            )}
          </HeaderButtons>
        </OrderHeader>

        <OrderInfo>
          <table>
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Date Ordered</th>
                <th>Shipping Address</th>
                <th>Expected Shipping Date</th>
                <th>Status</th>
                {status === 'canceled' && <th>Reason for Cancelation</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <StyledSellerName
                    onClick={() => store.uiStore.openModal('buyerDetailsModal')}
                  >
                    {buyerName}
                  </StyledSellerName>
                  {store.uiStore.activeModal === 'buyerDetailsModal' && (
                    <BuyerDetailsModal
                      buyerName={buyerName}
                      buyerEmail={buyerEmail}
                      buyerPhone={buyerPhone}
                      buyerLicenses={buyerLicenses}
                      buyerDeliveryInstructions={buyerDeliveryInstructions}
                      buyerAddress={address}
                    />
                  )}
                </td>

                <td>{formatDate(orderDate)}</td>
                <td>{address}</td>
                <td>{shipDate}</td>
                <td>
                  <StatusPillDropDown status={status} orderId={orderId} />
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
            <InstructionWrapper>
              <b>Delivery Instructions</b>
            </InstructionWrapper>
            <TotalLabel>Subtotal</TotalLabel>
            <Subtotal>{formatCurrency(subtotal)}</Subtotal>
          </TotalsRow>

          <TotalsRow>
            <InstructionWrapper>{buyerDeliveryInstructions}</InstructionWrapper>
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
      </PurchaseOrderWrapper>
    );
  }
}

export default inject('store')(observer(SellerPurchaseOrder));
export { SellerPurchaseOrder };
