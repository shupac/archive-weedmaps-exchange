// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'lib/routes';
import { reaction } from 'mobx';
import styled from 'styled-components';
import Carousel from 'components/molecules/carousel';
import ProductCard from 'components/molecules/product-card';
import { type CategoryProductsType } from 'models/category-products';
import Loader, { LoaderWrapper } from 'components/atoms/loader';
import EmptyState from 'components/atoms/empty-state';
import { ViewAllButton, StyledLink } from './styles';

const CatalogWrapper = styled.div``;

type State = {
  mounted: boolean,
};

class CategoryCarousels extends Component<CategoryProductsType, State> {
  state = {
    mounted: false,
  };

  dispose = reaction(
    () => {
      const { authStore } = this.props.store;
      return authStore.selectedLocation;
    },
    () => {
      const { buyerProducts } = this.props.store;
      buyerProducts.getCategoryProducts();
    },
    { name: 'Refetch Category Products on location change' },
  );

  componentDidMount() {
    const { buyerProducts } = this.props.store;
    buyerProducts.getCategoryProducts();
    // eslint-disable-next-line
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    const { buyerProducts } = this.props.store;
    buyerProducts.setCategoryProductsData([]);
    this.dispose();
  }

  render() {
    const { store } = this.props;
    const { mounted } = this.state;
    const { categoryProductsLoading, categoryProducts } = store.buyerProducts;

    if (!mounted || categoryProductsLoading) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    if (!categoryProducts.length) {
      return (
        <EmptyState
          image="no_products_available"
          title="No Products Available"
          body="There are currently no products available, please try again later."
        />
      );
    }

    return (
      <CatalogWrapper>
        {categoryProducts.map(category => (
          <Carousel
            key={category.id}
            title={category.name}
            cardMargin={16}
            additionalActions={
              <Link
                key={category.id}
                route="marketplace"
                params={{ tab: 'catalog', categories: category.id }}
              >
                <StyledLink>
                  <ViewAllButton>View All</ViewAllButton>
                </StyledLink>
              </Link>
            }
          >
            {category.products.map(product => (
              <Link href={`/buyer/marketplace/catalog/product/${product.id}`}>
                <StyledLink>
                  <ProductCard key={product.id} {...product} />
                </StyledLink>
              </Link>
            ))}
          </Carousel>
        ))}
      </CatalogWrapper>
    );
  }
}

export default inject('store')(observer(CategoryCarousels));
export { CategoryCarousels };
