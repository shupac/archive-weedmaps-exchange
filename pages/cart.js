// @flow
import React, { Component } from 'react';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import provide from 'lib/data-access/stores/provider';
import ShowIfRoute from 'components/atoms/show-if-route';
import BuyerCart from 'components/organisms/buyer-cart';
import CartConfirmation from 'components/organisms/cart-confirmation';
import { PageContent, PageLayout } from 'components/layouts/page-layout';

type Props = {
  url: any,
};

export class Cart extends Component<Props> {
  static displayName = 'Cart';

  render() {
    const { url } = this.props;
    const { pathname } = url;

    return (
      <PageLayout pathname={pathname}>
        <PageContent>
          <ShowIfRoute match="/buyer/cart">
            <BuyerCart />
          </ShowIfRoute>

          <ShowIfRoute match="/buyer/cart/confirmation(.*)">
            <CartConfirmation orderId={url.query.orderId} />
          </ShowIfRoute>
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(AuthConnector(inject('store')(Cart)));
