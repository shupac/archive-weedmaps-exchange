// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CatalogCarousel from 'components/molecules/carousel';
import ProductCard from 'components/molecules/product-card';
import { type CarouselCategoriesTypes } from 'lib/data-access/models/carousel-categories';
import styled from 'styled-components';

const CatalogWrapper = styled.div``;

class CategoryCarousels extends Component<CarouselCategoriesTypes> {
  componentDidMount() {
    const { categoryStore } = this.props.store;

    categoryStore.getCarouselCategories('64d05017-4339-4cda-9e57-0da061bf6b00');
  }

  render() {
    const { store } = this.props;
    const { carouselCategories } = store.categoryStore;

    return (
      <CatalogWrapper>
        {carouselCategories.map(category => (
          <CatalogCarousel
            key={category.id}
            title={category.name}
            cardMargin={16}
          >
            {category.products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                brand={product.brand}
                name={product.name}
                priceUnit={product.unit}
                minPrice={product.minPrice}
                maxPrice={product.maxPrice}
                imageUrl={product.imageUrl}
                category={product.category}
                outOfStock={product.inStock}
                onClick={() => {}}
              />
            ))}
          </CatalogCarousel>
        ))}
      </CatalogWrapper>
    );
  }
}

export default inject('store')(observer(CategoryCarousels));
