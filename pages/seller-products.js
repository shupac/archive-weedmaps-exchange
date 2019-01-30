// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import ShowIfRoute from 'components/atoms/show-if-route';
import SellerProducts from 'components/organisms/seller-products';
import SellerProductDetail from 'components/organisms/seller-product-detail';
import { type StoreType } from 'lib/types/store';

type Props = {
  store: StoreType,
  router: any,
};

class SellerProductsPage extends Component<Props> {
  render() {
    const { router } = this.props;
    const {
      query: { productId },
    } = router;

    return (
      <PageLayout>
        <PageContent>
          <ShowIfRoute match="/seller/products">
            <SellerProducts />
          </ShowIfRoute>
          <ShowIfRoute match="/seller/products/:productId">
            <SellerProductDetail productId={productId} />
          </ShowIfRoute>
        </PageContent>
      </PageLayout>
    );
  }
}

export default withRouter(AuthConnector(inject('store')(SellerProductsPage)));
export { SellerProductsPage };
