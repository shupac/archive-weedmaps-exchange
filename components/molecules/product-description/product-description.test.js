import React from 'react';
import { shallow } from 'enzyme';
import ProductDescription, { getPrice } from './';
import { Brand, Description, PricingTitle, Title } from './styles';

const product = {
  id: '123',
  brand: 'West Coast Cure',
  name: 'Strawberry Pineapple Kush OG',
  priceUnit: 'g',
  minPrice: 8.95,
  maxPrice: 10.95,
  description: 'hello',
  category: 'Indica',
};

describe('Get Price', () => {
  it('should return a price range', () => {
    const price = getPrice(150, 300);
    expect(price).toEqual('$150 - $300');
  });

  it('should return a single price', () => {
    const price = getPrice(150, 150);
    expect(price).toEqual('$150');
  });
});

describe('ProductDescription', () => {
  it('should render the product description', () => {
    const component = shallow(<ProductDescription productDetail={product} />);
    expect(
      component
        .find(Title)
        .dive()
        .text(),
    ).toEqual('Strawberry Pineapple Kush OG');
    expect(
      component
        .find(PricingTitle)
        .dive()
        .text(),
    ).toEqual('$8.95 - $10.95');
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
