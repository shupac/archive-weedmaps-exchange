// @flow
import React, { Component } from 'react';
import Shiitake from 'shiitake';
import { PriceRangeType } from 'lib/data-access/models/product';
import {
  CardWrapper,
  Product,
  ImageWrapper,
  Info,
  Grouped,
  Name,
  PriceUnit,
  Row,
  Price,
  OutOfStock,
} from './styles.js';

type Props = {
  imageUrl: string,
  brand: string,
  name: string,
  priceRanges: PriceRangeType[],
  category: string,
  outOfStock?: boolean,
  width?: string,
};

export const getPrice = (minPrice: number, maxPrice: number) => {
  if (minPrice === maxPrice) return `$${minPrice}`;
  return `$${minPrice}-$${maxPrice}`;
};

export const getUnit = (unit: string) => {
  const ounces = ['fluid_ounce', 'liter', 'gallon'];
  if (ounces.includes(unit)) return 'oz';
  if (unit === 'gram') return 'g';
  return unit;
};

class ProductCard extends Component<Props> {
  static defaultProps = {
    outOfStock: false,
  };

  render() {
    const {
      imageUrl,
      brand,
      name,
      priceRanges,
      category,
      outOfStock,
      width,
    } = this.props;

    return (
      <CardWrapper width={width}>
        <Product outOfStock={outOfStock}>
          <ImageWrapper>
            <img src={imageUrl} alt={name} />
          </ImageWrapper>
          <Info>
            <Row>
              <Grouped>
                <Shiitake lines={1}>{`${category} | ${brand}`}</Shiitake>
              </Grouped>
            </Row>
            <Name>
              <Shiitake lines={2}>{name}</Shiitake>
            </Name>
            {priceRanges &&
              priceRanges.map(({ minPrice, maxPrice, unit }) => (
                <Row>
                  <Price>{getPrice(minPrice, maxPrice)}</Price>
                  <PriceUnit>/{getUnit(unit)}</PriceUnit>
                </Row>
              ))}
          </Info>
        </Product>
        {outOfStock && <OutOfStock>Out of Stock</OutOfStock>}
      </CardWrapper>
    );
  }
}

export default ProductCard;
