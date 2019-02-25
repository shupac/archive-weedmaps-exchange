// @flow
import React from 'react';
import { formatDollars } from 'lib/common/strings';
import type { VariantType } from 'lib/data-access/models/variant';
import { ErrorIcon } from 'components/atoms/icons/error';
import TextInput from 'components/atoms/text-input';
import { type CartErrorType } from 'lib/data-access/models/cart';
import { cartErrorMsg } from 'lib/common/cart-errors';
import { TableRow, Stock, QuantityAlert, ResetLink } from './styles';

type Props = {
  variant: VariantType,
  error: any,
  fieldValue: number,
  handleChange: () => void,
  quantity?: number,
  resetField: (string, number, boolean) => void,
  cartError?: CartErrorType,
  resetCartErrors: string => void,
};

const VariantRow = ({
  variant,
  quantity,
  handleChange,
  error,
  resetField,
  fieldValue,
  cartError,
  resetCartErrors,
}: Props) => {
  const inStock: boolean = !!(
    variant.inStock &&
    !(cartError && cartError.error === 'location_unavailable')
  );

  return (
    <TableRow>
      <p style={{ fontWeight: 600 }}>{variant.name}</p>
      <p>{formatDollars(variant.price)}</p>
      <Stock data-test-id="stock" inStock={inStock}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </Stock>
      <TextInput
        name={variant.id}
        type="number"
        disabled={!inStock}
        onChange={handleChange}
        min="1"
        errorMessage={error}
        value={inStock ? fieldValue : ''}
      />
      <span>
        {inStock
          ? quantity && !error && formatDollars(quantity * variant.price)
          : 'N/A'}
      </span>
      {cartError && (
        <QuantityAlert>
          <div style={{ marginRight: '10px' }}>
            <ErrorIcon width="20" height="18" />
          </div>
          {cartErrorMsg[cartError.error]}{' '}
          {cartError.error === 'quantity_unavailable' && (
            <span>
              {variant.amount}
              <ResetLink
                onClick={() => {
                  resetField(variant.id, variant.amount, false);
                  resetCartErrors(variant.id);
                }}
              >
                Reset Quantity
              </ResetLink>
            </span>
          )}
        </QuantityAlert>
      )}
    </TableRow>
  );
};

export default VariantRow;
