// @flow
import React, { Component, Fragment } from 'react';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { Link } from 'lib/routes';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import {
  type CartErrorType,
  type CartItemType,
} from 'lib/data-access/models/cart';
import { formatDollars } from 'lib/common/strings';
import CartError from 'components/atoms/cart-row-error';
import DecreaseQuantity from 'components/atoms/icons/decrease-quantity';
import IncreaseQuantity from 'components/atoms/icons/increase-quantity';
import {
  ProductWrapper,
  ProductPhoto,
  ProductDescription,
  RemoveItem,
  SubtotalWrapper,
  QuantityButton,
  QuantityInput,
  QuantityWrapper,
  UpdateLink,
  Border,
} from './styles';

type Props = {
  item: CartItemType,
  setRowSubtotals: (rowId: string, itemtotals: number) => void,
  store: StoreType,
  cartError: CartErrorType,
  rowSubTotal: () => number,
};

export class ProductRow extends Component<Props> {
  @observable
  quantity = this.props.item.amount;

  @observable
  desiredQuantity = this.props.item.amount;

  @observable
  showUpdateLink = false;

  @computed
  get rowSubTotal(): number {
    return this.quantity * this.props.item.price;
  }
  unset = autorun(() =>
    this.props.setRowSubtotals(this.props.item.id, this.rowSubTotal),
  );

  dispose = reaction(
    () => this.desiredQuantity,
    desiredQuantity => {
      if (desiredQuantity !== this.quantity) {
        this.showUpdateLink = true;
      } else {
        this.showUpdateLink = false;
      }
    },
  );

  @action
  handleChange = ({ target }: { target: HTMLInputElement }) => {
    this.desiredQuantity = target.value;
  };

  onUpdate = (quantity: number) => {
    const { buyerCart } = this.props.store;
    const { item } = this.props;

    buyerCart.updateCartItem({
      id: item.id,
      quantity,
    });
  };

  @action
  onQuantityChange = (quantity: number) => {
    this.quantity = quantity;
  };

  componentWillUnmount() {
    this.unset();
    this.dispose();
  }

  render() {
    const { item, cartError } = this.props;
    const outOfStock = cartError && cartError.error === `location_unavailable`;

    return (
      <Fragment>
        <Link
          href={`/buyer/marketplace/catalog/product/${item.variant.product.id}`}
        >
          <ProductWrapper>
            <a>
              {' '}
              <ProductPhoto
                style={{
                  backgroundImage: `url(${
                    item.variant.product.avatarImage.smallUrl
                  })`,
                }}
              />
              <ProductDescription>
                <span>{item.variant.product.name}</span>
                <span>{item.variant.name || 'name'}</span>
              </ProductDescription>
            </a>
          </ProductWrapper>
        </Link>

        <p style={{ textAlign: 'right' }}>
          {outOfStock ? 'N/A' : formatDollars(item.price)}
        </p>
        <QuantityWrapper outOfStock={outOfStock}>
          <QuantityButton
            onClick={() => this.onUpdate(Math.max(1, this.quantity - 1))}
            disabled={this.quantity <= 0}
          >
            <DecreaseQuantity />
          </QuantityButton>

          <QuantityInput
            type="number"
            value={this.desiredQuantity}
            onChange={this.handleChange}
          />
          {this.showUpdateLink && (
            <UpdateLink
              onClick={() => this.onUpdate(parseInt(this.desiredQuantity, 10))}
            >
              UPDATE
            </UpdateLink>
          )}

          <QuantityButton onClick={() => this.onUpdate(this.quantity + 1)}>
            <IncreaseQuantity />
          </QuantityButton>
        </QuantityWrapper>
        <RemoveItem onClick={() => this.onUpdate(0)}>Remove</RemoveItem>
        <SubtotalWrapper>
          {outOfStock ? 'N/A' : formatDollars(this.rowSubTotal)}
        </SubtotalWrapper>
        {cartError && (
          <CartError
            errorType={cartError.error}
            // @TODO: pass in variant amount once available
            availableAmount={12}
            changeHandler={this.onQuantityChange}
            removeHandler={this.onUpdate}
          />
        )}
        <Border />
      </Fragment>
    );
  }
}

export default inject('store')(observer(ProductRow));
