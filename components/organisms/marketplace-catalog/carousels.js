// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CatalogCarousel from 'components/molecules/carousel';
import ProductCard from 'components/molecules/product-card';
import { type CategoryProductsType } from 'models/category-products';
import { mockProduct } from 'mocks/search-results';
import styled from 'styled-components';

const CatalogWrapper = styled.div``;

class CategoryCarousels extends Component<CategoryProductsType> {
  componentDidMount() {
    const { buyerProducts } = this.props.store;

    buyerProducts.getCategoryProducts('64d05017-4339-4cda-9e57-0da061bf6b00');
  }

  getProductCards = () =>
    [1, 2, 3, 4, 5, 6].map(item => (
      <ProductCard
        key={item}
        id={mockProduct.id}
        brand={mockProduct.brand}
        name={mockProduct.name}
        priceUnit={mockProduct.unit}
        minPrice={mockProduct.minPrice}
        maxPrice={mockProduct.maxPrice}
        imageUrl={mockProduct.imageUrl}
        category={mockProduct.category}
        outOfStock={mockProduct.inStock}
      />
    ));

  render() {
    const { store } = this.props;
    const { categoryProducts } = store.buyerProducts;
    // TODO: WMX-453 Remove test array and replace with categoryProducts.products when available

    return (
      <CatalogWrapper>
        {categoryProducts.map(category => (
          <CatalogCarousel
            key={category.id}
            title={category.name}
            cardMargin={16}
          >
            {this.getProductCards()}
          </CatalogCarousel>
        ))}
      </CatalogWrapper>
    );
  }
}

export default inject('store')(observer(CategoryCarousels));
export { CategoryCarousels };
