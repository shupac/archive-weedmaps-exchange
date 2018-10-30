// @flow
import React, { Fragment } from 'react';
import type { ProductDetail } from 'lib/types/products';
import { clearTags } from 'lib/common/strings';
import {
  DescriptionWrapper,
  Brand,
  Description,
  Header,
  PricingTitle,
  PricingUnit,
  PricingWrapper,
  Title,
} from './styles';

type Props = {
  productDetail: ProductDetail,
};

export const getPrice = (minPrice: number, maxPrice: number) => {
  if (minPrice === maxPrice) return `$${minPrice}`;
  return `$${minPrice} - $${maxPrice}`;
};

const ProductDescription = ({ productDetail }: Props) => {
  if (!productDetail) {
    return (
      <Fragment>
        <Header>
          <Title>No Product Available</Title>
        </Header>
      </Fragment>
    );
  }

  const { name, brand, description, minPrice, maxPrice } = productDetail;

  return (
    <DescriptionWrapper>
      <Header>
        <Title>{name}</Title>
        <PricingWrapper>
          <PricingTitle>{getPrice(minPrice, maxPrice)}</PricingTitle>
          <PricingUnit>price / g</PricingUnit>
        </PricingWrapper>
      </Header>
      <Brand>{brand}</Brand>
      <Description>{clearTags(description)}</Description>
    </DescriptionWrapper>
  );
};

export default ProductDescription;
