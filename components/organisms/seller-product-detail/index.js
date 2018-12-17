// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import Breadcrumbs from 'components/molecules/breadcrumbs';

import { SellerProductWrapper } from './styles';

type Props = {
  store: StoreType,
  productId: string,
};

export class SellerProductDetails extends Component<Props> {
  constructBreadcrumb = () => {
    const baseCrumb = {
      label: 'Products',
      route: '/seller/products',
    };

    return [baseCrumb];
  };

  render() {
    const { productId } = this.props;

    return (
      <SellerProductWrapper>
        <Breadcrumbs links={this.constructBreadcrumb()} activeLabel="Product" />
        <div>{productId}</div>
      </SellerProductWrapper>
    );
  }
}

export default inject('store')(observer(SellerProductDetails));
