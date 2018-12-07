// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import get from 'lodash.get';
import { type StoreType } from 'lib/types/store';
import { type CartItemType, type CartType } from 'lib/data-access/models/cart';
import { formatDollars } from 'lib/common/strings.js';
import ErrorIcon from 'components/atoms/icons/error';
import ProductRow from './product-row';
import {
  VendorCartHeader,
  SubtotalWrapper,
  Table,
  TotalsRow,
  TableBody,
  ColLabel,
  ColLabelRight,
  Border,
  ErrorMessage,
} from './styles';

type Props = {
  store: StoreType,
  count?: number,
  index: ?number,
  cartItems: CartItemType[],
  cart: CartType,
};

export class ShipmentCard extends Component<Props> {
  @observable
  rowSubtotals = {};

  @computed
  get shipmentSubTotal(): number {
    return Object.values(this.rowSubtotals).reduce((acc, value) => {
      if (typeof value === 'number') {
        return acc + value;
      }
      return acc;
    }, 0);
  }

  @action
  setRowSubtotals = (rowId: string, itemtotals: number) => {
    this.rowSubtotals = {
      ...this.rowSubtotals,
      [rowId]: itemtotals,
    };
  };

  render() {
    const { cartItems, index, store, count } = this.props;
    const { buyerCart } = store;
    const shipmentBrand = cartItems && get(cartItems[0], 'brandName', '');
    const minimumPurchasePrice =
      cartItems &&
      get(cartItems[0], 'variant.product.brand.minimumPurchasePrice', 0);

    return (
      <Table>
        <VendorCartHeader>
          Shipment {index + 1} of {count}:<span>{shipmentBrand}</span>
        </VendorCartHeader>
        <TableBody>
          <ColLabel align="left">product</ColLabel>
          <ColLabel align="right">unit price</ColLabel>
          <ColLabel>quantity</ColLabel>
          <ColLabelRight>subtotal</ColLabelRight>
          <Border style={{ marginTop: 0 }} />
          {cartItems &&
            cartItems.map(cartItem => (
              <ProductRow
                key={cartItem.id}
                item={cartItem}
                setRowSubtotals={this.setRowSubtotals}
                cartError={buyerCart.cartErrorsByItemId[cartItem.id]}
              />
            ))}
        </TableBody>

        <TotalsRow>
          <SubtotalWrapper>
            Subtotal: <b>{formatDollars(this.shipmentSubTotal)}</b>
            {this.shipmentSubTotal < minimumPurchasePrice && (
              <ErrorMessage>
                <ErrorIcon width="16px" height="14px" /> {shipmentBrand} has a
                minimum order amount of {formatDollars(minimumPurchasePrice)}.
              </ErrorMessage>
            )}
          </SubtotalWrapper>
        </TotalsRow>
      </Table>
    );
  }
}

export default inject('store')(observer(ShipmentCard));
