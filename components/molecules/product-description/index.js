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

  return (
    <DescriptionWrapper>
      <Header>
        <Title>{productDetail.name}</Title>
        <PricingWrapper>
          <PricingTitle>{`$${productDetail.minPrice} - $${
            productDetail.maxPrice
          }`}</PricingTitle>
          <PricingUnit>price / g</PricingUnit>
        </PricingWrapper>
      </Header>
      <Brand>{productDetail.brand}</Brand>
      <Description>{clearTags(productDetail.description)}</Description>
    </DescriptionWrapper>
  );
};

export default ProductDescription;
