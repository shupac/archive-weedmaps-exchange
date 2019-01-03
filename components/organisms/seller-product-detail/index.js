// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
import Breadcrumbs from 'components/molecules/breadcrumbs';
import Loader, { LoaderWrapper } from 'components/atoms/loader';

import {
  SellerProductWrapper,
  Layout,
  ProductName,
  VariantWrapper,
  AvailabilityWrapper,
  VariantHeader,
  VariantInfo,
  AddVariantButton,
  InstructionsWrapper,
  ZonesLink,
} from './styles';

type Props = {
  store: StoreType,
  productId: string,
};

type State = {
  mounted: boolean,
};

export class SellerProductDetails extends Component<Props, State> {
  state = {
    mounted: false,
  };

  constructBreadcrumb = () => {
    const baseCrumb = {
      label: 'Products',
      route: '/seller/products',
    };

    return [baseCrumb];
  };

  componentDidMount() {
    const { productId, store } = this.props;

    store.sellerProducts.fetchProductDetails(productId);
    store.sellerSettings.fetchZones();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });
  }

  render() {
    const { store } = this.props;

    const { mounted } = this.state;

    const {
      fetchingProductDetails,
      sellerProductDetails,
    } = store.sellerProducts;

    if (!mounted || fetchingProductDetails) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    const { product } = sellerProductDetails;
    const { name } = product;

    return (
      <SellerProductWrapper>
        <Breadcrumbs links={this.constructBreadcrumb()} activeLabel="Product" />
        <ProductName>{name}</ProductName>
        <Layout>
          <VariantWrapper>
            <VariantHeader>Variants</VariantHeader>
            <VariantInfo>
              Add variants for each version of this product, like different
              weights or packs. Then you can configure the selling options for
              each variant and quantity to allocate to each zone.
            </VariantInfo>
            <AddVariantButton>Add Variant</AddVariantButton>
            <InstructionsWrapper>
              Modify the variants and zone allocations to be created:
              <ZonesLink>View Zones</ZonesLink>
            </InstructionsWrapper>
          </VariantWrapper>
          <AvailabilityWrapper />
        </Layout>
      </SellerProductWrapper>
    );
  }
}

export default inject('store')(observer(SellerProductDetails));
