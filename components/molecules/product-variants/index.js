// @flow
import React, { Component } from 'react';
import { type UIStoreType } from 'lib/data-access/stores/ui';
import { Formik, Form } from 'formik';
import type { FormikActions } from 'formik';
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

type FormValueType = {
  [key: string]: number | '',
};

type Props = {
  variants: VariantType[],
  handleCartSuccess: ({ quantityTotal: number, dollarTotal: number }) => void,
  mockAddToCart: () => void,
};

const tableHead = [
  'variant',
  'unit price',
  'inventory',
  'quantity',
  'subtotal',
];

export class ProductVariants extends Component<Props> {
  calculateTotal = (formVals: FormValueType) => {
    const { variants } = this.props;
    const total = variants.reduce((acc, item) => {
      const quantity = Number(formVals[item.id]);
      if (!this.validateQuantity(quantity)) {
        return acc + item.price * quantity || 0;
      }
      return acc;
    }, 0);

    return formatDollars(total);
  };

  calculateQuantity = (values: FormValueType) =>
    Object.values(values).reduce((acc, value) => {
      const quantity = Number(value);
      if (!this.validateQuantity(quantity)) {
        return acc + quantity;
      }
      return acc;
    }, 0);

  validateQuantity = (value: number) => {
    if (value === '') {
      return false;
    }
    if (value < 0) {
      return 'Must be positive value';
    } else if (value % 1 !== 0) {
      return 'Must be whole value';
    }
    return false;
  };

  validateForm = (formVals: FormValueType) => {
    const errors = {};
    Object.entries(formVals).forEach(([key, val]) => {
      // $FlowFixMe
      const error = this.validateQuantity(val);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };

  handleSubmit = async (
    values: FormValueType,
    { setSubmitting }: FormikActions,
  ) => {
    const { handleCartSuccess, mockAddToCart } = this.props;
    await mockAddToCart();
    setSubmitting(false);
    const toastContent = {
      quantityTotal: this.calculateQuantity(values),
      dollarTotal: this.calculateTotal(values),
    };
    handleCartSuccess(toastContent);
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
          validate={this.validateForm}
          onSubmit={this.handleSubmit}
          render={({
            values,
            handleChange,
            errors,
            isValid,
            setFieldValue,
            isSubmitting,
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
                    type="submit"
                    state="primary"
                    disabled={!isValid || isSubmitting || quantityTotal < 1}
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
