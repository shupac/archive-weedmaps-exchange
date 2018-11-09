// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import { type StoreType } from 'lib/types/store';
import { type CartItemType } from 'lib/data-access/models/cart';
import { formatDollars } from 'lib/common/strings.js';
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
} from './styles';

type Props = {
  store: StoreType,
  count?: number,
  index: ?number,
  cartItem: CartItemType[],
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
    const { cartItem, index, store, count } = this.props;
    const { buyerCart } = store;

    return (
      <Table>
        <VendorCartHeader>
          Shipment {index + 1} of {count}:
          <span>{cartItem && cartItem[0].variant.product.brand.name}</span>
        </VendorCartHeader>
        <TableBody>
          <ColLabel align="left">product</ColLabel>
          <ColLabel align="right">unit price</ColLabel>
          <ColLabel>quantity</ColLabel>
          <ColLabelRight>subtotal</ColLabelRight>
          <Border style={{ marginTop: 0 }} />
          {cartItem &&
            cartItem.map(row => (
              <ProductRow
                key={row.id}
                item={row}
                setRowSubtotals={this.setRowSubtotals}
                cartError={buyerCart.cartErrorsByItemId[row.id]}
              />
            ))}
        </TableBody>

        <TotalsRow>
          <SubtotalWrapper>
            Subtotal: <b>{formatDollars(this.shipmentSubTotal)}</b>
          </SubtotalWrapper>
        </TotalsRow>
      </Table>
    );
  }
}

export default inject('store')(observer(ShipmentCard));
