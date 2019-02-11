// @flow
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { type StoreType } from 'lib/types/store';
import SearchBar from 'components/molecules/search-bar';
import EmptyState from 'components/atoms/empty-state';
import ProductDescription from 'components/molecules/product-description';
import ProductPhotos from 'components/molecules/product-photos';
import LicenseList from 'components/molecules/license-list';
import ProductVariants from 'components/molecules/product-variants';
import Breadcrumbs from 'components/molecules/breadcrumbs';
import { CATALOG_QUERY_PARAMS } from 'lib/common/constants';

import { GridLayout, MainPanel } from './styles';

type Props = {
  store: StoreType,
  productId: string,
};

export class ProductDetails extends Component<Props> {
  dispose = reaction(
    () => {
      const { authStore } = this.props.store;
      return authStore.selectedLocation;
    },
    () => {
      this.getProductDetails();
    },
    { name: 'Fetch product detail data' },
  );

  componentDidMount() {
    this.getProductDetails();
    this.fetchDepartmentData();
  }

  componentWillUnmount() {
    this.dispose();
  }

  fetchDepartmentData() {
    const { buyerSettings } = this.props.store;
    buyerSettings.getDepartments();
  }

  getProductDetails = () => {
    const { productId } = this.props;
    const { buyerProducts } = this.props.store;
    buyerProducts.getProductDetails(productId);
  };

  constructBreadcrumb = () => {
    const { buyerProducts } = this.props.store;
    const baseCrumb = {
      label: 'Catalog',
      route: '/buyer/marketplace/catalog',
    };
    const crumbTrail = buyerProducts.productBreadcrumb.map(({ id, name }) => ({
      label: name,
      route: `/buyer/marketplace/catalog?categories=${id}`,
    }));

    return [baseCrumb, ...crumbTrail];
  };

  render() {
    const { buyerProducts } = this.props.store;

    const {
      name,
      avatarImage,
      galleryImages,
      brand,
      licenses,
    } = buyerProducts.productDetails;

    const photos = [...galleryImages];
    if (avatarImage) photos.unshift(avatarImage);

    if (!buyerProducts.productDetailsSuccess) {
      return (
        <EmptyState
          image="no_products_available"
          title="Product Not Found"
          body="Try changing your location or searching again."
          route="/buyer/marketplace/discover"
          buttonLabel="Browse Products"
        />
      );
    }
    return (
      <Fragment>
        <SearchBar
          route="marketplace"
          routeParams={{ tab: 'catalog' }}
          queryParams={CATALOG_QUERY_PARAMS}
        />
        <Breadcrumbs links={this.constructBreadcrumb()} activeLabel={name} />
        <GridLayout>
          <div>
            <ProductPhotos productPhotos={photos} store={this.props.store} />
            <LicenseList brandName={brand} licenseList={licenses} />
          </div>
          <MainPanel>
            <ProductDescription productDetail={buyerProducts.productDetails} />
            <ProductVariants
              variants={buyerProducts.productVariants}
              productName={name}
            />
          </MainPanel>
        </GridLayout>
      </Fragment>
    );
  }
}

export default inject('store')(observer(ProductDetails));
