import React from 'react';
import { shallow } from 'enzyme';
import ProductDescription from './';
import { Brand, Description, Price, Title } from './styles';

const product = {
  id: '123',
  brand: 'West Coast Cure',
  name: 'Strawberry Pineapple Kush OG',
  priceRanges: [
    {
      priceUnit: 'gram',
      minPrice: 8.95,
      maxPrice: 10.95,
    },
  ],
  description: 'hello',
  category: 'Indica',
};

describe('ProductDescription', () => {
  it('should render the product description', () => {
    const component = shallow(<ProductDescription productDetail={product} />);
    console.log(component.find(Price).debug());
    expect(
      component
        .find(Title)
        .dive()
        .text(),
    ).toEqual('Strawberry Pineapple Kush OG');
    expect(
      component
        .find(Price)
        .dive()
        .text(),
    ).toEqual('$8.95-$10.95');
    expect(
      component
        .find(Brand)
        .dive()
        .text(),
    ).toEqual('West Coast Cure');
    expect(
      component
        .find(Description)
        .dive()
        .text(),
    ).toEqual('hello');
  });

  it('should render with noproduct description', () => {
    const component = shallow(<ProductDescription {...product} />);
    expect(
      component
        .find(Title)
        .dive()
        .text(),
    ).toEqual('No Product Available');
  });
});
