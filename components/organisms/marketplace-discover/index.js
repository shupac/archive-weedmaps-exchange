// @flow
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { Router } from 'lib/routes';
import SearchBar from 'components/molecules/search-bar';
import CategoryCard from 'components/molecules/category-card';
import Carousel from 'components/molecules/carousel';
import ProductCard from 'components/molecules/product-card';
import { type ProductCardType } from 'models/buyer-product';
import EmptyState from 'components/atoms/empty-state';
import Loader, { LoaderWrapper } from 'components/atoms/loader';
import { type DepartmentType } from 'models/department';
import { CATALOG_QUERY_PARAMS } from 'lib/common/constants';

type Props = {
  store: any,
};

type State = {
  mounted: boolean,
};

export class Discover extends Component<Props, State> {
  state = {
    mounted: false,
  };

  dispose = reaction(
    () => {
      const { authStore } = this.props.store;
      return authStore.selectedLocation;
    },
    () => {
      this.fetchDepartmentData();
      this.fetchFeaturedProductsData();
    },
    { name: 'Fetch department and featured products data' },
  );

  componentDidMount() {
    this.fetchDepartmentData();
    this.fetchFeaturedProductsData();
    // eslint-disable-next-line
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.props.store.buyerProducts.setFeaturedProductsData([]);
    this.dispose();
  }

  fetchDepartmentData() {
    const { buyerSettings } = this.props.store;
    buyerSettings.getDepartments();
  }

  fetchFeaturedProductsData() {
    const { buyerProducts } = this.props.store;
    buyerProducts.getFeaturedProducts();
  }

  goToProduct = (productId: string) =>
    Router.pushRoute(`/buyer/marketplace/catalog/product/${productId}`);

  renderFullState = (
    departments: DepartmentType[],
    featuredProducts: ProductCardType[],
  ) => [
    <Carousel title="Categories" cardMargin={16}>
      {departments.map(({ id, name, avatarImageUrl, iconImageUrl }) => (
        <CategoryCard
          key={id}
          id={id}
          title={name}
          icon={iconImageUrl}
          image={avatarImageUrl}
        />
      ))}
    </Carousel>,
    <Carousel key="featured-products" title="Featured Products" cardMargin={16}>
      {featuredProducts.map(product => (
        <ProductCard
          key={product.id}
          onClick={() => this.goToProduct(product.id)}
          {...product}
        />
      ))}
    </Carousel>,
  ];

  render() {
    const { store } = this.props;
    const { departments, departmentsLoading } = store.buyerSettings;
    const { featuredProducts, featuredProductsLoading } = store.buyerProducts;
    const { mounted } = this.state;
    const loading = !mounted || departmentsLoading || featuredProductsLoading;

    if (loading) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    return (
      <Fragment>
        <SearchBar
          route="marketplace"
          routeParams={{ tab: 'catalog' }}
          queryParams={CATALOG_QUERY_PARAMS}
        />
        {departments.length !== 0 || featuredProducts.length !== 0 ? (
          this.renderFullState(departments, featuredProducts)
        ) : (
          <EmptyState
            image="no_products_available"
            title="No Products Available"
            body="There are currently no products available, please try again later."
          />
        )}
      </Fragment>
    );
  }
}

export default inject('store')(observer(Discover));
