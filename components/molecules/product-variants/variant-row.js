// @flow
import React from 'react';
import { formatDollars } from 'lib/common/strings';
import type { VariantType } from 'lib/data-access/models/variant';
import { ErrorIcon } from 'components/atoms/icons/error';
import TextInput from 'components/atoms/forms/text-input';
import { TableRow, Stock, QuantityAlert, ResetLink } from './styles';

type Props = {
  variant: VariantType,
  error: any,
  fieldValue: number,
  handleChange: () => void,
  quantity?: number,
  resetField: (string, number, boolean) => void,
};

const VariantRow = ({
  variant,
  quantity,
  handleChange,
  error,
  resetField,
  fieldValue,
}: Props) => (
  <TableRow>
    <p style={{ fontWeight: 600 }}>{variant.name}</p>
    <p>{formatDollars(variant.price)}</p>
    <Stock data-test-id="stock" inStock={variant.inStock}>
      {variant.inStock ? 'In Stock' : 'Out of Stock'}
    </Stock>
    <TextInput
      name={variant.id}
      type="number"
      disabled={!variant.inStock}
      onChange={handleChange}
      min="1"
      hasError={variant.hasQuantityAlert || error}
      errorMessage={error}
      value={fieldValue}
    />
    {quantity && !error && formatDollars(quantity * variant.price)}
    {variant.hasQuantityAlert && (
      <QuantityAlert>
        <div style={{ marginRight: '10px' }}>
          <ErrorIcon width="20" height="18" />
        </div>
        Available Quantity: 10{' '}
        <ResetLink
          onClick={() => resetField(variant.id, variant.amount, false)}
        >
          Reset Quantity
        </ResetLink>
      </QuantityAlert>
    )}
  </TableRow>
);

export default VariantRow;
