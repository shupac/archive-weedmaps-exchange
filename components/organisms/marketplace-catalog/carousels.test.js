import React from 'react';
import { shallow } from 'enzyme';
import { mockCategoryProducts } from 'mocks/category-products';
import { mockProduct } from 'mocks/search-results';
import ProductCard from 'components/molecules/product-card';
import CatalogCarousel from 'components/molecules/carousel';
import { CategoryCarousels } from './carousels';

const mockStore = {
  buyerProducts: {
    getCategoryProducts: jest.fn(),
    categoryProducts: mockCategoryProducts,
  },
};

function setup({ store }) {
  const component = <CategoryCarousels store={store} />;
  const wrapper = shallow(component);
  return wrapper;
}

describe('CategoryCarousels', () => {
  it('should fetch products on mount', () => {
    setup({ store: mockStore });
    expect(mockStore.buyerProducts.getCategoryProducts).toHaveBeenCalled();
  });

  // TODO: temp test. Fix with WMX-453
  it('should return product cards', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();

    const mockCards = [1, 2, 3, 4, 5, 6].map(item => (
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

    expect(instance.getProductCards()).toEqual(mockCards);
  });

  it('should render the CategoryCarousel', () => {
    const wrapper = setup({ store: mockStore });
    expect(
      wrapper
        .find(CatalogCarousel)
        .first()
        .props().title,
    ).toEqual('Concentrates');
    expect(
      wrapper
        .find(CatalogCarousel)
        .last()
        .props().title,
    ).toEqual('Edibles');
  });
});
