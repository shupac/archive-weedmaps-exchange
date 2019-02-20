// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import at from 'lodash/at';
import StyledLink from 'components/atoms/styled-link';
import BackArrow from 'components/atoms/icons/back-arrow';
import StatusPillDropDown from 'components/atoms/order-status-pill/status-pill-dropdown';
import { ButtonWhiteNoHover } from 'components/atoms/button';
import Loader from 'components/atoms/loader';
import { formatOrderId, formatDollars } from 'lib/common/strings';
import ProductRow from 'components/organisms/buyer-purchase-order/product-row';
import { formatDate } from 'lib/common/date';
import { type StoreType } from 'lib/types/store';
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
import BuyerDetailsModal from './buyer-details-modal';

type CategorySelected = {
  value: string,
  text: string,
};

type Props = {
  orderId: string,
  store: StoreType,
  onStatusChange: string => CategorySelected => void,
  onReorder: string => void,
};

class SellerPurchaseOrder extends Component<Props> {
  componentDidMount() {
    const { orderId, store } = this.props;

    store.sellerOrders.fetchOrder(orderId);
  }

  render() {
    const { store, orderId, onStatusChange } = this.props;

    const { orderData } = store.sellerOrders;

    if (!orderData) return <Loader />;

    const {
      orderDate,
      buyerData,
      expectedShipDateMin,
      expectedShipDateMax,
      status,
      statusChangeOptions,
      selectedOption,
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

    const {
      buyerDeliveryInstructions,
      buyerEmail,
      buyerLicenses,
      buyerPhone,
      buyerName,
      buyerContactName,
      buyerNote,
    } = buyerData;

    return (
      <PurchaseOrderWrapper>
        <OrderHeader>
          <StyledLink route="/seller/orders">
            <BackArrow />
          </StyledLink>
          <span style={{ marginLeft: '16px' }}>
            Purchase Order: {formatOrderId(orderId)}
          </span>
          <HeaderButtons>
            <ButtonWhiteNoHover onClick={() => window.print()}>
              View or print
            </ButtonWhiteNoHover>
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
                      buyerContactName={buyerContactName}
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
                  <StatusPillDropDown
                    status={status}
                    orderId={orderId}
                    options={statusChangeOptions}
                    selectedOption={selectedOption}
                    onChange={onStatusChange(orderId)}
                  />
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

export default inject('store')(observer(SellerPurchaseOrder));
export { SellerPurchaseOrder };
