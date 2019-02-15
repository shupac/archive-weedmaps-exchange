// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import get from 'lodash.get';
import { type StoreType } from 'lib/types/store';
import { type CartItemType } from 'lib/data-access/models/cart';
import { formatDollars } from 'lib/common/strings.js';
import ErrorIcon from 'components/atoms/icons/error';
import ProductRow from './product-row';
import {
  VendorCartHeader,
  SubtotalWrapper,
  Table,
  TableBody,
  ColLabel,
  ColLabelRight,
  Border,
  ErrorMessage,
  NoteInput,
  NoteInputLabel,
} from './styles';

type Props = {
  store: StoreType,
  count?: number,
  index: ?number,
  cartItems: CartItemType[],
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

  get brandId() {
    const { cartItems } = this.props;
    return get(cartItems[0], 'variant.product.brand.id', 0);
  }

  onNoteChange = (text: string) => {
    const { store } = this.props;
    const { buyerCart } = store;

    buyerCart.setShipmentNote({
      ...buyerCart.shipmentNote,
      [this.brandId]: text,
    });
  };

  // If every product in a shipment card has unavailable location
  // errors, we do not show the minimum order warning
  hasMinimumErrorState(): boolean {
    const { cartItems, store } = this.props;
    const { buyerCart } = store;

    if (buyerCart.cartErrorsByItemId) {
      return cartItems.every(
        ({ id }) =>
          buyerCart.cartErrorsByItemId[id] &&
          buyerCart.cartErrorsByItemId[id].error === 'location_unavailable',
      );
    }
    return false;
  }

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
          <SubtotalWrapper>
            <span>
              <NoteInputLabel>Notes</NoteInputLabel>
              <NoteInput
                value={get(buyerCart, `shipmentNote[${this.brandId}]`, '')}
                onChange={e => this.onNoteChange(e.target.value)}
                maxLength={255}
                rows={2}
                placeholder="Add a note..."
                data-test-id="notes-input"
              />
            </span>{' '}
            <span>
              Subtotal: <b>{formatDollars(this.shipmentSubTotal)}</b>
            </span>
          </SubtotalWrapper>
          {!this.hasMinimumErrorState() &&
            this.shipmentSubTotal < minimumPurchasePrice && (
              <ErrorMessage>
                <ErrorIcon width="16px" height="14px" /> {shipmentBrand} has a
                minimum order amount of {formatDollars(minimumPurchasePrice)}.
              </ErrorMessage>
            )}
        </TableBody>
      </Table>
    );
  }
}

export default inject('store')(observer(ShipmentCard));
