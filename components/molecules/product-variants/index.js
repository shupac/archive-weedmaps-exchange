// @flow
import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { type CartErrorType } from 'lib/data-access/models/cart';
import { Formik, Form } from 'formik';
import type { FormikActions } from 'formik';
import { formatDollars } from 'lib/common/strings';
import { Cart } from 'components/atoms/icons/cart';
import { type StoreType } from 'lib/types/store';
import type { VariantType } from 'lib/data-access/models/variant';
import { ALERT_STATUS } from 'lib/common/constants';
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
  store: StoreType,
};

type State = {
  cartErrors: any,
};

const tableHead = [
  'variant',
  'unit price',
  'inventory',
  'quantity',
  'subtotal',
];

export class ProductVariants extends Component<Props, State> {
  static displayName = 'ProductVariants';

  state = {
    cartErrors: [],
  };

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

  transformFormValues = (values: FormValueType) => {
    const { variants } = this.props;
    const entries = Object.entries(values);
    const variantIds = new Set(variants.map(variant => variant.id));
    const stripped = entries.filter(
      item => variantIds.has(item[0]) && typeof item[1] === 'number',
    );
    // $FlowFixMe
    return stripped.map(item => ({
      variant_id: item[0],
      quantity: item[1],
    }));
  };

  handleSubmit = async (
    values: FormValueType,
    { setSubmitting }: FormikActions,
  ) => {
    const { buyerCart } = this.props.store;
    const formatted = this.transformFormValues(values);
    // $FlowFixMe
    const { cartErrors } = await buyerCart.addCartItems(formatted);
    this.setState({
      cartErrors,
    });
    this.notifyCartAddSuccess(cartErrors);
    setSubmitting(false);
  };

  handleResetCartErrors = (id: string) => {
    this.setState(state => ({
      cartErrors: state.cartErrors.filter(cartError => cartError.itemId !== id),
    }));
  };

  notifyCartAddSuccess(errors: CartErrorType[]) {
    const { uiStore, buyerProducts } = this.props.store;

    const alertContent = {
      title: `You added ${buyerProducts.productDetails.name} to your cart`,
      link: { label: 'VIEW CART', route: '/buyer/cart' },
      status: ALERT_STATUS.SUCCESS,
      autoDismiss: 4000,
    };
    if (errors.length > 0) {
      alertContent.title = `There were some issues with your request. Please see below`;
      alertContent.status = ALERT_STATUS.ERROR;
    }
    uiStore.notifyToast(alertContent);
  }

  render() {
    const { variants } = this.props;
    const { cartErrors } = this.state;

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
                    cartError={cartErrors.find(err => err.itemId === item.id)}
                    resetCartErrors={this.handleResetCartErrors}
                  />
                ))}
                <TotalsRow>
                  <p>
                    {quantityTotal} {quantityTotal === 1 ? 'Item' : 'Items'}
                  </p>
                  <p>{dollarTotal}</p>
                </TotalsRow>
                <ButtonRow>
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

export default inject('store')(ProductVariants);
