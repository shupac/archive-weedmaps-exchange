// @flow
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import SearchBar from 'components/molecules/search-bar';
import ProductDescription from 'components/molecules/product-description';
import ProductPhotos from 'components/molecules/product-photos';
import LicenseList from 'components/molecules/license-list';
import ProductVariants from 'components/molecules/product-variants';
import Breadcrumbs from 'components/molecules/breadcrumbs';
import { GridLayout, MainPanel } from './styles';

type Props = {
  store: {
    buyerProducts: any,
  },
  productIdQuery: string,
};

export class ProductDetails extends Component<Props> {
  componentDidMount() {
    const { productIdQuery } = this.props;

    const { buyerProducts } = this.props.store;
    // productIdQuery = 7e0fb515-f87b-4d07-82fb-d2168aa859dc
    buyerProducts.getProductDetails(productIdQuery);
  }

  constructBreadcrumb = () => {
    const { buyerProducts } = this.props.store;
    const baseCrumb = {
      label: 'Catalog',
      route: '/buyer/marketplace/catalog',
    };
    const crumbTrail = buyerProducts.productBreadcrumb.map(({ id, name }) => ({
      label: name,
      route: `/buyer/marketplace/catalog?catalog=${id}`,
    }));

    return [baseCrumb, ...crumbTrail];
  };

  render() {
    const { buyerProducts } = this.props.store;

    return (
      <Fragment>
        <SearchBar />
        <Breadcrumbs
          links={this.constructBreadcrumb()}
          activeLabel={buyerProducts.productDetails.name}
        />
        <GridLayout>
          <div>
            <ProductPhotos
              productPhotos={buyerProducts.productDetails.galleryImages}
            />
            <LicenseList
              brandName={buyerProducts.productDetails.brand}
              licenseList={buyerProducts.productDetails.licenses}
            />
          </div>

          <MainPanel>
            <ProductDescription productDetail={buyerProducts.productDetails} />
            <ProductVariants variants={buyerProducts.productVariants} />
          </MainPanel>
        </GridLayout>
      </Fragment>
    );
  }
}

export default inject('store')(observer(ProductDetails));
