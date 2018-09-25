import React from 'react';
import { shallow } from 'enzyme';
import { mockProduct } from 'lib/mocks/search-results';
import SearchBar from 'components/molecules/search-bar';
import FilterPanel from 'components/molecules/filter-panel';
import ProductCard from 'components/molecules/product-card';
import { Catalog } from './';

const mockStore = {
  buyerProducts: {
    categoryProducts: [mockProduct],
    searchResults: [mockProduct],
  },
};

const mockRouter = {
  query: '',
};

describe('Marketplace Catalog', () => {
  it('should render the searchbar', () => {
    const component = <Catalog store={mockStore} router={mockRouter} />;
    const wrapper = shallow(component, { disableLifecycleMethods: true });
    const searchBar = wrapper.find(SearchBar);
    expect(searchBar.exists()).toEqual(true);
  });

  it('should render the filter panel', () => {
    const component = <Catalog store={mockStore} router={mockRouter} />;
    const wrapper = shallow(component, { disableLifecycleMethods: true });
    const filterPanel = wrapper.find(FilterPanel);
    expect(filterPanel.exists()).toEqual(true);
  });

  it('should render a product card', () => {
    const component = <Catalog store={mockStore} router={mockRouter} />;
    const wrapper = shallow(component, { disableLifecycleMethods: true });
    const productCard = wrapper.find(ProductCard);
    expect(productCard.exists()).toEqual(true);
  });
});
