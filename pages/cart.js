// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import ShowIfRoute from 'components/atoms/show-if-route';
import BuyerCart from 'components/organisms/buyer-cart';
import CartConfirmation from 'components/organisms/cart-confirmation';
import { PageContent, PageLayout } from 'components/layouts/page-layout';

type Props = {
  router: any,
};

export class Cart extends Component<Props> {
  static displayName = 'Cart';

  render() {
    const { router } = this.props;
    return (
      <PageLayout>
        <PageContent>
          <ShowIfRoute match="/buyer/cart">
            <BuyerCart />
          </ShowIfRoute>

          <ShowIfRoute match="/buyer/cart/confirmation(.*)">
            <CartConfirmation orderId={router.query.orderId} />
          </ShowIfRoute>
        </PageContent>
      </PageLayout>
    );
  }
}

export default withRouter(AuthConnector(inject('store')(Cart)));
