// @flow
import React, { Fragment } from 'react';
import { formatDollars } from 'lib/common/strings';
import uniqby from 'lodash.uniqby';
import errorDictionary from 'lib/common/cart-errors';
import { ButtonPrimary, ButtonWhiteNoHover } from 'components/atoms/button';
import { type CartType } from 'lib/data-access/models/cart';
import uniqueKey from 'lib/common/unique-key';
import {
  OrderSummaryDetailsWrapper,
  OrderSummaryWrapper,
  OrderDetail,
  OrderSummaryHeader,
  OrderTotalDetail,
  ErrorMessage,
  Asterisk,
} from './styles';

type Props = {
  cart: CartType,
  onSubmit?: () => void,
  quantity?: number,
};

const CartOrderSummary = ({ cart, quantity, onSubmit }: Props) => {
  const { total, subtotal, shippingFee, items, cartErrors } = cart;
  quantity = quantity || items.reduce((acc, value) => acc + value.amount, 0);
  const uniqErrors = uniqby(cartErrors, 'error');

  return (
    <Fragment>
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
          {onSubmit && (
            <Fragment>
              {cartErrors.length > 0 ? (
                uniqErrors.map(cartError => (
                  <ErrorMessage key={uniqueKey()}>
                    {errorDictionary[cartError.error]}
                  </ErrorMessage>
                ))
              ) : (
                <ButtonPrimary onClick={onSubmit}>Submit Order</ButtonPrimary>
              )}
              <ButtonWhiteNoHover>Continue Shopping</ButtonWhiteNoHover>
            </Fragment>
          )}
        </OrderSummaryDetailsWrapper>
      </OrderSummaryWrapper>
      <Asterisk>*Prices shown do not reflect applicable taxes.</Asterisk>
    </Fragment>
  );
};
export default CartOrderSummary;
