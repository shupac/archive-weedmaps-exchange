// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CatalogCarousel from 'components/molecules/carousel';
import ProductCard from 'components/molecules/product-card';
import { type CarouselCategoriesTypes } from 'lib/data-access/models/carousel-categories';
import { mockProduct } from 'lib/mocks/product-search';
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
    // TODO: Remove test array and replace with carouselCategories.products when available

    return (
      <CatalogWrapper>
        {carouselCategories.map(category => (
          <CatalogCarousel
            key={category.id}
            title={category.name}
            cardMargin={16}
          >
            {[1, 2, 3, 4, 5, 6].map(item => (
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
