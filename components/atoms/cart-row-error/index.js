import React, { Fragment } from 'react';
import { type CartErrorType } from 'lib/data-access/models/cart';
import ErrorIcon from 'components/atoms/icons/error';
import { cartErrorMsg } from 'lib/common/cart-errors';
import AlertDanger from './styles';

type Props = {
  errorType: CartErrorType,
  removeHandler: number => void,
  changeHandler: number => void,
  availableAmount: number,
};

export const CartError = ({
  errorType,
  availableAmount,
  changeHandler,
  removeHandler,
}: Props) => (
  <AlertDanger>
    <ErrorIcon width="16px" height="14px" />
    <span> {cartErrorMsg[errorType]}</span>
    {errorType === 'quantity_unavailable' && (
      <Fragment>
        {availableAmount}
        <a onClick={() => changeHandler(availableAmount)}>Reset Quantity</a>
      </Fragment>
    )}
    {errorType === 'location_unavailable' && (
      <a onClick={() => removeHandler(0)}>Remove</a>
    )}
  </AlertDanger>
);

export default CartError;
