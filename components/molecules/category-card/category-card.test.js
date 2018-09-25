import React from 'react';
import { shallow } from 'enzyme';
import { title, image } from 'lib/mocks/category-products';
import CategoryCard from './';
import { CategoryCardWrapper } from './styles';

describe('Category Card', () => {
  it('should render the Category Card', () => {
    const component = shallow(<CategoryCard title={title} image={image} />);
    expect(component.find(CategoryCardWrapper).length).toEqual(1);
  });
});
