import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '@ghostgroup/ui';
import { mockProducts } from 'lib/mocks/product-card';
import {
  CardWrapper,
  Grouped,
  Name,
  PriceUnit,
  Row,
  Price,
  Product,
  OutOfStock,
} from './styles';
import ProductCard, { getPrice, getUnit } from './';

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

describe('Get Unit', () => {
  it('should return g from gram', () => {
    const unit = getUnit('gram');
    expect(unit).toEqual('g');
  });

  it('should return oz from any fluid_ounce', () => {
    const oz = getUnit('fluid_ounce');
    expect(oz).toEqual('oz');
    const liter = getUnit('liter');
    expect(liter).toEqual('oz');
    const gal = getUnit('gallon');
    expect(gal).toEqual('oz');
  });

  it('should return the unit if its neither gram or fluid_ounce', () => {
    const unit = getUnit('unit');
    expect(unit).toEqual('unit');
    const anotherUnit = getUnit('whatever');
    expect(anotherUnit).toEqual('whatever');
  });
});

describe('Product Card', () => {
  describe('With One Price Set', () => {
    it('should render the product card', () => {
      const component = shallow(
        <ProductCard {...mockProducts[0]} onClick={jest.fn()} width="200px" />,
      );
      expect(component.find(CardWrapper).exists()).toEqual(true);
      expect(component.find(Name).exists()).toEqual(true);
      expect(component.find(Grouped).exists()).toEqual(true);
      expect(component.find(Row).length).toEqual(2);
      expect(component.find(Price).exists()).toEqual(true);
      expect(component.find(PriceUnit).exists()).toEqual(true);
      const card = component
        .find(CardWrapper)
        .dive()
        .find(Card)
        .dive();
      expect(card).toHaveStyleRule('width: 200px');
      expect(card).toHaveStyleRule('cursor: pointer');
      const noWidth = shallow(<ProductCard {...mockProducts[0]} />)
        .find(CardWrapper)
        .dive()
        .find(Card)
        .dive();
      expect(noWidth).toHaveStyleRule('width: 217px');
      expect(noWidth).toHaveStyleRule('cursor: default');
      expect(component.find(Product).dive()).toHaveStyleRule('opacity: 1');
    });

    it('should render out of stock products', () => {
      const component = shallow(
        <ProductCard {...mockProducts[0]} outOfStock />,
      );
      expect(component.find(CardWrapper).exists()).toEqual(true);
      expect(component.find(Grouped).exists()).toEqual(true);
      expect(component.find(Name).exists()).toEqual(true);
      expect(component.find(PriceUnit).exists()).toEqual(true);
      expect(component.find(Row).exists()).toEqual(true);
      expect(component.find(Price).exists()).toEqual(true);
      expect(component.find(OutOfStock).exists()).toEqual(true);
      expect(component.find(Product).dive()).toHaveStyleRule('opacity: 0.4');
    });
  });
});
