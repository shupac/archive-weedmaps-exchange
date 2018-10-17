// @flow
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import EmptyCartPage from 'components/organisms/buyer-cart/empty-cart';
import Breadcrumbs from 'components/molecules/breadcrumbs/index';
import { CartWrapper } from './styles';

type Props = {
  store: StoreType,
};

export class BuyerCart extends Component<Props> {
  render() {
    const { buyerCart } = this.props.store;
    return (
      <Fragment>
        {buyerCart.cartItemCount > 0 ? (
          <CartWrapper>
            <Breadcrumbs
              links={[
                { label: 'Buyer Home', route: '/buyer/marketplace/discover' },
              ]}
              activeLabel="Shopping Cart"
            />
          </CartWrapper>
        ) : (
          <EmptyCartPage />
        )}
      </Fragment>
    );
  }
}

export default inject('store')(observer(BuyerCart));
