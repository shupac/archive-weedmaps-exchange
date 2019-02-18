// @flow
import React, { Fragment } from 'react';
import { formatDollars } from 'lib/common/strings';
import uniqby from 'lodash.uniqby';
import errorDictionary from 'lib/common/cart-errors';
import { ButtonWhiteNoHover } from 'components/atoms/button';
import LoadingButton from 'components/atoms/loading-button';
import StyledLink from 'components/atoms/styled-link';
import { type CartType } from 'lib/data-access/models/cart';
import uniqueKey from 'lib/common/unique-key';
import {
  OrderSummaryDetailsWrapper,
  OrderSummaryWrapper,
  OrderDetail,
  OrderSummaryHeader,
  OrderTotalDetail,
  ErrorMessage,
  ContinueWrapper,
  Asterisk,
} from './styles';

type Props = {
  cart: CartType,
  onSubmit?: () => void,
  quantity?: number,
  isLoading?: boolean,
};

const CartOrderSummary = ({ cart, quantity, onSubmit, isLoading }: Props) => {
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
                    {errorDictionary[cartError.error] ||
                      errorDictionary.general}
                  </ErrorMessage>
                ))
              ) : (
                <LoadingButton
                  onClick={onSubmit}
                  isLoading={isLoading || false}
                  disabled={isLoading}
                  loadingText="Submitting"
                  size={{
                    width: '100%',
                    height: '40px',
                  }}
                >
                  Submit Order
                </LoadingButton>
              )}
              <ContinueWrapper>
                <StyledLink href="/buyer/marketplace/discover">
                  <ButtonWhiteNoHover>Continue Shopping</ButtonWhiteNoHover>
                </StyledLink>
              </ContinueWrapper>
            </Fragment>
          )}
        </OrderSummaryDetailsWrapper>
      </OrderSummaryWrapper>
      <Asterisk>*Prices shown do not reflect applicable taxes.</Asterisk>
    </Fragment>
  );
};
export default CartOrderSummary;
