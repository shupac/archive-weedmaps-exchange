// @flow
import React from 'react';
import { formatDollars } from 'lib/common/strings';
import errorDictionary from 'lib/common/cart-errors';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { type CartType } from 'lib/data-access/models/cart';
import {
  OrderSummaryDetailsWrapper,
  OrderSummaryWrapper,
  OrderDetail,
  OrderSummaryHeader,
  OrderTotalDetail,
  ErrorMessage,
} from './styles';

type Props = {
  cart: CartType,
  onSubmit?: () => void,
};

const CartOrderSummary = ({ cart, onSubmit }: Props) => {
  const { total, subtotal, shippingFee, items, cartErrors } = cart;
  const quantity = items.reduce((acc, value) => acc + value.amount, 0);
  return (
    <OrderSummaryWrapper>
      <OrderSummaryHeader>Order Summary</OrderSummaryHeader>
      <OrderSummaryDetailsWrapper>
        <OrderDetail data-test-id="subtotal">
          Subtotal ({quantity} items)
          <span>{formatDollars(subtotal)}</span>
        </OrderDetail>
        <OrderDetail data-test-id="shipping-fee">
          Shipping Fee
          <span>{formatDollars(shippingFee)}</span>
        </OrderDetail>
        <OrderTotalDetail data-test-id="order-total">
          Order Total*
          <span>{formatDollars(total)}</span>
        </OrderTotalDetail>
        {cartErrors.length > 0 ? (
          cartErrors.map(cartError => (
            <ErrorMessage>{errorDictionary[cartError.error]}</ErrorMessage>
          ))
        ) : (
          <ButtonPrimary onClick={onSubmit}>Submit Order</ButtonPrimary>
        )}
        <ButtonWhiteNoHover>Continue Shopping</ButtonWhiteNoHover>
      </OrderSummaryDetailsWrapper>
    </OrderSummaryWrapper>
  );
};
export default CartOrderSummary;
