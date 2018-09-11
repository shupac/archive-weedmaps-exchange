import React from 'react';
import { shallow } from 'enzyme';
import { mockCategories } from 'lib/mocks/category-card';
import SearchBar from 'components/molecules/search-bar';
import { Discover } from './';

const mockCategoryStore = {
  categoryStore: {
    departments: mockCategories,
  },
};

describe('Marketplace Discover', () => {
  it('should render category cards', () => {
    const component = shallow(<Discover store={mockCategoryStore} />);
    const catCard = component.find('CategoryCard');
    expect(catCard.exists()).toEqual(true);
  });
  it('should render the searchbar', () => {
    const component = shallow(<Discover store={mockCategoryStore} />);
    const searchBar = component.find(SearchBar);
    expect(searchBar.exists()).toEqual(true);
  });
});
