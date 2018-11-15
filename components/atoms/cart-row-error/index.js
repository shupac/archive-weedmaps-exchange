import React, { Fragment } from 'react';
import { type CartErrorType } from 'lib/data-access/models/cart';
import ErrorIcon from 'components/atoms/icons/error';
import { cartErrorMsg } from 'lib/common/cart-errors';
import AlertDanger from './styles';

type Props = {
  errorType: CartErrorType,
  onResetQuantity: number => void,
  onUpdate: number => void,
  availableAmount: number,
};

export const CartError = ({
  errorType,
  availableAmount,
  onResetQuantity,
  onUpdate,
}: Props) => (
  <AlertDanger>
    <ErrorIcon width="16px" height="14px" />
    <span> {cartErrorMsg[errorType]}</span>
    {errorType === 'quantity_unavailable' && (
      <Fragment>
        {availableAmount}
        <a onClick={() => onResetQuantity(availableAmount)}>Reset Quantity</a>
      </Fragment>
    )}
    {errorType === 'location_unavailable' && (
      <a onClick={() => onUpdate(0)}>Remove</a>
    )}
  </AlertDanger>
);

export default CartError;
