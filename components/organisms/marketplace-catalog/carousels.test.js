import React from 'react';
import { shallow } from 'enzyme';
import { mockCategoryProducts } from 'mocks/category-products';
import CatalogCarousel from 'components/molecules/carousel';
import ProductCard from 'components/molecules/product-card';
import Loader from 'components/atoms/loader';

import { CategoryCarousels } from './carousels';

const mockStore = {
  buyerProducts: {
    getCategoryProducts: jest.fn(),
    categoryProducts: mockCategoryProducts,
    categoryProductsLoading: false,
    setCategoryProductsData: jest.fn(),
  },
};

const mockGotoProduct = jest.fn();

function setup({ store }) {
  const component = (
    <CategoryCarousels store={store} gotoProduct={mockGotoProduct} />
  );
  const wrapper = shallow(component);
  return wrapper;
}

describe('CategoryCarousels', () => {
  it('should fetch products on mount', () => {
    setup({ store: mockStore });
    expect(mockStore.buyerProducts.getCategoryProducts).toHaveBeenCalled();
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

  it('should go to the product detail page when card is clicked', () => {
    const wrapper = setup({ store: mockStore });
    wrapper
      .find(ProductCard)
      .first()
      .simulate('click');
    expect(mockGotoProduct).toHaveBeenCalledWith(
      '4e12ea30-ccd8-455e-841b-1e4b0c7ac799',
    );
  });

  it('should render the loader when loading', () => {
    const thisStore = {
      ...mockStore,
      buyerProducts: {
        ...mockStore.buyerProducts,
        categoryProductsLoading: true,
      },
    };
    const wrapper = setup({ store: thisStore });
    expect(wrapper.find(Loader).exists()).toEqual(true);
  });

  it('should reset store on unmount', () => {
    const wrapper = setup({ store: mockStore });
    const instance = wrapper.instance();
    instance.componentWillUnmount();

    const { setCategoryProductsData } = mockStore.buyerProducts;
    expect(setCategoryProductsData).toHaveBeenCalledWith([]);
  });
});
