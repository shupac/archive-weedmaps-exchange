// @flow
import React, { Fragment } from 'react';
import type { Details, Included } from 'lib/types/products';
import {
  Brand,
  Description,
  Header,
  PricingTitle,
  PricingUnit,
  PricingWrapper,
  Title,
} from './styles';

type Props = {
  details: Details,
  dataArr: Included,
};

const ProductDetails = ({ details, dataArr }: Props) => {
  if (!details) {
    return (
      <Fragment>
        <Header>
          <Title>No Product Available</Title>
        </Header>
      </Fragment>
    );
  }

  const { attributes: prod } = details;
  const brand = dataArr.find(x => x.type === 'brand');
  // TODO: update PricingUnit after confirming unit data is processed by Back-End, otherwise gather requirements & refactor.

  return (
    <Fragment>
      <Header>
        <Title>{prod.name}</Title>
        <PricingWrapper>
          <PricingTitle>{`$${prod.priceMin} - $${prod.priceMax}`}</PricingTitle>
          <PricingUnit>price / g</PricingUnit>
        </PricingWrapper>
      </Header>
      <Brand>{brand && brand.attributes.name}</Brand>
      <Description>{prod.description}</Description>
    </Fragment>
  );
};

export default ProductDetails;
