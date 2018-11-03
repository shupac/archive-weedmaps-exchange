// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import CatalogCarousel from 'components/molecules/carousel';
import ProductCard from 'components/molecules/product-card';
import { type CategoryProductsType } from 'models/category-products';
import styled from 'styled-components';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { NoResults } from './styles';

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
        <NoResults>
          <Icons.Spinner fill={theme.style.icon.dark} />
        </NoResults>
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
