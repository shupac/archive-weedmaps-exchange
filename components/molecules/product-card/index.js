// @flow
import React from 'react';
import Shiitake from 'shiitake';

import {
  CardWrapper,
  Product,
  ImageWrapper,
  Info,
  Brand,
  Name,
  PriceUnit,
  Row,
  Price,
  Category,
  OutOfStock,
} from './styles.js';

type Props = {
  imageUrl: string,
  brand: string,
  name: string,
  priceUnit: string,
  minPrice?: number,
  maxPrice?: number,
  category: string,
  outOfStock?: boolean,
  width?: string,
  onClick?: () => void,
};

const ProductCard = ({
  imageUrl,
  brand,
  name,
  priceUnit,
  minPrice,
  maxPrice,
  category,
  outOfStock = false,
  width,
  onClick,
}: Props) => (
  <CardWrapper width={width} onClick={onClick}>
    <Product outOfStock={outOfStock}>
      <ImageWrapper>
        <img src={imageUrl} alt={name} />
      </ImageWrapper>

      <Info>
        <Brand>
          <Shiitake lines={1}>{brand}</Shiitake>
        </Brand>

        <Name>
          <Shiitake lines={2}>{name}</Shiitake>
        </Name>

        <PriceUnit>price / {priceUnit}</PriceUnit>

        <Row>
          <Price>
            ${minPrice}
            -$
            {maxPrice}
          </Price>
          <Category>{category}</Category>
        </Row>
      </Info>
    </Product>

    {outOfStock && <OutOfStock>Out of Stock</OutOfStock>}
  </CardWrapper>
);

export default ProductCard;
