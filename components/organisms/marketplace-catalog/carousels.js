// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import CatalogCarousel from 'components/molecules/carousel';
import ProductCard from 'components/molecules/product-card';
import { type CategoryProductsType } from 'models/category-products';
import Loader, { LoaderWrapper } from 'components/atoms/loader';
import styled from 'styled-components';

const CatalogWrapper = styled.div``;

class CategoryCarousels extends Component<CategoryProductsType> {
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
  }

  componentWillUnmount() {
    const { buyerProducts } = this.props.store;
    buyerProducts.setCategoryProductsData([]);
    this.dispose();
  }

  render() {
    const { store, gotoProduct } = this.props;
    const { categoryProductsLoading, categoryProducts } = store.buyerProducts;

    if (categoryProductsLoading) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    return (
      <CatalogWrapper>
        {categoryProducts.map(category => (
          <CatalogCarousel
            key={category.id}
            title={category.name}
            cardMargin={16}
          >
            {category.products.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => gotoProduct(product.id)}
              />
            ))}
          </CatalogCarousel>
        ))}
      </CatalogWrapper>
    );
  }
}

export default inject('store')(observer(CategoryCarousels));
export { CategoryCarousels };
