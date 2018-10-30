import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '@ghostgroup/ui';

import {
  CardWrapper,
  Brand,
  Name,
  PriceUnit,
  Row,
  Price,
  Category,
  Product,
  OutOfStock,
} from './styles';
import ProductCard, { getPrice } from './';

const product = {
  id: '123',
  brand: 'West Coast Cure',
  name: 'Strawberry Pineapple Kush OG',
  priceUnit: 'g',
  minPrice: 8.95,
  maxPrice: 10.95,
  imageUrl:
    'https://drh2acu5z204m.cloudfront.net/items/2V0X0y2a1i101k2N1Z32/Image%202018-07-25%20at%201.48.53%20PM.png?X-CloudApp-Visitor-Id=3106914&v=f0996046',
  category: 'Indica',
};

describe('Get Price', () => {
  it('should return a price range', () => {
    const price = getPrice(150, 300);
    expect(price).toEqual('$150-$300');
  });

  it('should return a single price', () => {
    const price = getPrice(150, 150);
    expect(price).toEqual('$150');
  });
});

describe('Product Card', () => {
  it('should render the product card', () => {
    const component = shallow(<ProductCard {...product} width="200px" />);
    expect(component.find(CardWrapper).length).toEqual(1);
    expect(component.find(Brand).length).toEqual(1);
    expect(component.find(Name).length).toEqual(1);
    expect(component.find(PriceUnit).length).toEqual(1);
    expect(component.find(Row).length).toEqual(1);
    expect(component.find(Price).length).toEqual(1);
    expect(component.find(Category).length).toEqual(1);
    expect(
      component
        .find(CardWrapper)
        .dive()
        .find(Card)
        .dive(),
    ).toHaveStyleRule('width: 200px');
    expect(
      component
        .find(CardWrapper)
        .dive()
        .find(Card)
        .dive(),
    ).toHaveStyleRule('cursor: pointer');
  });

  it('should render out of stock products', () => {
    const component = shallow(<ProductCard {...product} outOfStock />);
    expect(component.find(CardWrapper).length).toEqual(1);
    expect(component.find(Brand).length).toEqual(1);
    expect(component.find(Name).length).toEqual(1);
    expect(component.find(PriceUnit).length).toEqual(1);
    expect(component.find(Row).length).toEqual(1);
    expect(component.find(Price).length).toEqual(1);
    expect(component.find(Category).length).toEqual(1);
    expect(component.find(OutOfStock).length).toEqual(1);
    expect(component.find(Product).dive()).toHaveStyleRule('opacity: 0.4');
  });
});
