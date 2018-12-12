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
import SellerDetailsModal from './seller-details-modal';
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
  StyledSellerName,
} from './styles';

type Props = {
  orderId: string,
  store: StoreType,
  onCancelOrder: string => void,
  onReorder: string => void,
};

class BuyerPurchaseOrder extends Component<Props> {
  componentDidMount() {
    const { orderId, store } = this.props;
    store.buyerOrders.fetchOrder(orderId);
  }

  render() {
    const { orderId, store, onCancelOrder, onReorder } = this.props;
    const { orderData } = store.buyerOrders;

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

    const { sellerName, sellerEmail, sellerPhone, sellerLicenses } = sellerData;

    const { cancelable } = STATUS_TYPES[status];

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
              <ButtonWhiteNoHover onClick={onCancelOrder}>
                Cancel order
              </ButtonWhiteNoHover>
            )}
            <ButtonPrimary onClick={onReorder}>Reorder</ButtonPrimary>
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
                {status === 'canceled' && <th>Reason for Cancelation</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <StyledSellerName
                    onClick={() =>
                      store.uiStore.openModal('sellerDetailsModal')
                    }
                  >
                    {sellerName}
                  </StyledSellerName>
                  {store.uiStore.activeModal === 'sellerDetailsModal' && (
                    <SellerDetailsModal
                      sellerName={sellerName}
                      sellerEmail={sellerEmail}
                      sellerPhone={sellerPhone}
                      sellerLicenses={sellerLicenses}
                    />
                  )}
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
      </PurchaseOrderWrapper>
    );
  }
}
export default inject('store')(observer(BuyerPurchaseOrder));
export { BuyerPurchaseOrder };
