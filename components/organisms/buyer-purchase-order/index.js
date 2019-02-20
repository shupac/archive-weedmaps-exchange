// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
import at from 'lodash/at';
import StyledLink from 'components/atoms/styled-link';
import BackArrow from 'components/atoms/icons/back-arrow';
import StatusPill from 'components/atoms/order-status-pill';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import Loader from 'components/atoms/loader';
import { formatOrderId, formatDollars } from 'lib/common/strings';
import { formatDate } from 'lib/common/date';
import { type StoreType } from 'lib/types/store';
import { type PurchaseOrderType } from 'models/purchase-order';
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
  Subtotal,
  TotalLabel,
  TotalDivider,
  StyledSellerName,
  InstructionWrapper,
  BuyerInstructions,
  DescriptionWrapper,
} from './styles';

type Props = {
  orderId: string,
  store: StoreType,
  onCancelOrder: string => void,
  onReorder: string => void,
};

class BuyerPurchaseOrder extends Component<Props> {
  @observable
  orderData: ?PurchaseOrderType = null;

  dispose = reaction(
    () => {
      const { uiStore, buyerOrders } = this.props.store;
      const { activeModal, modalTransitioning } = uiStore;
      const { orderData } = buyerOrders;

      return { activeModal, modalTransitioning, orderData: { ...orderData } };
    },
    ({ activeModal, modalTransitioning, orderData }) => {
      if (!activeModal && !modalTransitioning) this.orderData = orderData;
    },
    { name: 'Watch modal transition' },
  );

  componentDidMount() {
    const { orderId, store } = this.props;
    store.buyerOrders.fetchOrder(orderId);
  }

  componentWillUnmount() {
    this.dispose();
  }

  render() {
    const { orderId, onCancelOrder, onReorder, store } = this.props;

    if (!this.orderData) return <Loader />;

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
      sellerEmail,
      sellerPhone,
      sellerLicenses,
      brandName,
      sellerContactName,
    } = sellerData;

    const { buyerDeliveryInstructions, buyerNote } = buyerData;

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
                    {brandName}
                  </StyledSellerName>
                  {store.uiStore.activeModal === 'sellerDetailsModal' && (
                    <SellerDetailsModal
                      brandName={brandName}
                      sellerContactName={sellerContactName}
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
          <BuyerInstructions>
            {buyerDeliveryInstructions.length > 0 && (
              <>
                <InstructionWrapper>
                  <b>Delivery Instructions</b>
                </InstructionWrapper>
                <DescriptionWrapper>
                  {buyerDeliveryInstructions}
                </DescriptionWrapper>
              </>
            )}
            {buyerNote.length > 0 && (
              <>
                <InstructionWrapper>
                  <b>Order Notes</b>
                </InstructionWrapper>
                <DescriptionWrapper>{buyerNote}</DescriptionWrapper>
              </>
            )}
          </BuyerInstructions>
          <BuyerInstructions>
            <TotalLabel>Subtotal</TotalLabel>
            <TotalLabel>Shipping Fee</TotalLabel>
            <TotalDivider />
            <TotalLabel>
              <b>Total</b>
            </TotalLabel>
          </BuyerInstructions>
          <BuyerInstructions>
            <Subtotal>{formatDollars(Number(subtotal))}</Subtotal>
            <Subtotal>{formatDollars(Number(shippingFee))}</Subtotal>
            <TotalDivider />
            <Subtotal>
              <b>{formatDollars(Number(total))}</b>
            </Subtotal>
          </BuyerInstructions>
        </Totals>
      </PurchaseOrderWrapper>
    );
  }
}

BuyerPurchaseOrder.displayName = 'BuyerPurchaseOrder';

export default inject('store')(observer(BuyerPurchaseOrder));
export { BuyerPurchaseOrder };
