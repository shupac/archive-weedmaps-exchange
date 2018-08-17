// @flow
import React from 'react';
import { formatDollars } from 'lib/common/strings';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import {
  OrderSummaryDetailsWrapper,
  OrderSummaryWrapper,
  OrderDetail,
  OrderSummaryHeader,
  OrderTotalDetail,
} from './styles';

type Props = {
  quantity: number,
  subTotal: number,
  shipping: number,
  total: number,
  onSubmit?: () => void,
};
const OrderSummary = ({
  quantity,
  subTotal,
  shipping,
  total,
  onSubmit,
}: Props) => (
  <OrderSummaryWrapper>
    <OrderSummaryHeader>Order Summary</OrderSummaryHeader>
    <OrderSummaryDetailsWrapper>
      <OrderDetail data-test-id="subtotal">
        Subtotal(
        {quantity})<span>{formatDollars(subTotal)}</span>
      </OrderDetail>
      <OrderDetail data-test-id="shipping-fee">
        Shipping Fee
        <span>{formatDollars(shipping)}</span>
      </OrderDetail>
      <OrderTotalDetail data-test-id="order-total">
        Order Total*
        <span>{formatDollars(total)}</span>
      </OrderTotalDetail>
      <ButtonPrimary onClick={onSubmit}>Submit Order</ButtonPrimary>
      <ButtonWhiteNoHover>Continue Shopping</ButtonWhiteNoHover>
    </OrderSummaryDetailsWrapper>
  </OrderSummaryWrapper>
);
export default OrderSummary;
