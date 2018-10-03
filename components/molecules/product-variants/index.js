// @flow
import * as React from 'react';
import { Formik, Form } from 'formik';
import { formatDollars } from 'lib/common/strings';
import { Cart } from 'components/atoms/icons/cart';
import { WmTheme, Icons } from '@ghostgroup/ui';
import type { VariantType } from 'lib/data-access/models/variant';

import {
  TableHead,
  TableWrap,
  TotalsRow,
  ButtonRow,
  ActionButton,
} from './styles';
import VariantRow from './variant-row';

type Props = {
  variants: VariantType[],
};

const tableHead = [
  'variant',
  'unit price',
  'inventory',
  'quantity',
  'subtotal',
];

export class ProductVariants extends React.Component<Props> {
  calculateTotal = (formVals: { id: string, quantity: number }) => {
    const { variants } = this.props;
    if (!variants) return false;
    const total = variants.reduce((acc, item) => {
      const quantity = Number(formVals[item.id]);
      if (!this.validateQuantity(quantity)) {
        return acc + item.price * quantity || 0;
      }
      return acc;
    }, 0);
    return formatDollars(total);
  };

  calculateQuantity = (values: ?{ id: string, quantity: number }) =>
    Object.values(values).reduce((acc, value) => {
      const quantity = Number(value);
      if (!this.validateQuantity(quantity)) {
        return acc + quantity;
      }
      return acc;
    }, 0);

  validateQuantity = (value: number) => {
    if (value <= 0) {
      return 'Must be positive value';
    } else if (value % 1 !== 0) {
      return 'Must be whole value';
    }
    return false;
  };

  render() {
    const { variants } = this.props;

    return (
      <TableWrap>
        <TableHead>
          {tableHead.map(item => (
            <p key={item}>{item} </p>
          ))}
        </TableHead>
        <Formik
          data-test-id="form"
          validate={values => {
            const errors = {};

            Object.entries(values).forEach(([key, val]) => {
              if (typeof val !== 'number') throw new Error();
              const error = this.validateQuantity(val);
              if (error) {
                errors[key] = error;
              }
            });
            return errors;
          }}
          // onSubmit={(values, actions) => {}}
          render={({
            values,
            handleChange,
            errors,
            validateForm,
            isValid,
            setFieldValue,
          }) => {
            if (!variants) return null;

            const quantityTotal = this.calculateQuantity(values);
            const dollarTotal = this.calculateTotal(values);

            return (
              <Form>
                {variants.map(item => (
                  <VariantRow
                    data-test-id="data-row"
                    key={item.id}
                    variant={item}
                    quantity={values && values[item.id]}
                    handleChange={handleChange}
                    error={errors[item.id] && errors[item.id]}
                    resetField={setFieldValue}
                    fieldValue={values[item.id]}
                  />
                ))}
                <TotalsRow>
                  <p>
                    {quantityTotal} {quantityTotal === 1 ? 'Item' : 'Items'}
                  </p>
                  <p>{dollarTotal}</p>
                </TotalsRow>
                <ButtonRow>
                  <ActionButton state="secondary">
                    <Icons.Plus fill={WmTheme.style.state.dark} size="26px" />
                    ADD TO WATCHLIST
                  </ActionButton>
                  <ActionButton
                    data-test-id="add-to-cart-button"
                    onClick={validateForm}
                    state="primary"
                    disabled={!isValid}
                  >
                    {' '}
                    <Cart
                      fill="white"
                      size={{ width: '26px', height: '26px' }}
                    />
                    ADD TO CART
                  </ActionButton>
                </ButtonRow>
              </Form>
            );
          }}
        />
      </TableWrap>
    );
  }
}

export default ProductVariants;
