import React from 'react';
import { shallow } from 'enzyme';
import { mockCategoryProducts } from 'lib/mocks/category-products';
import ProductCard from 'components/molecules/product-card';
import CatalogCarousel from 'components/molecules/carousel';
import CategoryCarousels from './carousels';

describe('CategoryCarousels', () => {
  it('should render the CategoryCarousel', () => {
    const store = {
      buyerProducts: {
        categoryProducts: mockCategoryProducts,
      },
    };
    const tree = shallow(<CategoryCarousels store={store} />, {
      disableLifecycleMethods: true,
    });

    expect(tree.dive().find(ProductCard).length).toEqual(12);
    expect(
      tree
        .dive()
        .find(CatalogCarousel)
        .first()
        .props().title,
    ).toEqual('Concentrates');
    expect(
      tree
        .dive()
        .find(CatalogCarousel)
        .last()
        .props().title,
    ).toEqual('Edibles');
  });
});
