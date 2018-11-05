// @flow
import React, { Fragment } from 'react';
import type { ProductDetail } from 'lib/types/products';
import { clearTags } from 'lib/common/strings';
import { getPrice, getUnit } from 'components/molecules/product-card';
import {
  DescriptionWrapper,
  Column,
  Brand,
  Description,
  Header,
  Row,
  Price,
  Unit,
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

  const { name, brand, description, priceRanges } = productDetail;

  return (
    <DescriptionWrapper>
      <Header>
        <Column>
          <Title>{name}</Title>
          <Brand>{brand}</Brand>
        </Column>
        <Column>
          {priceRanges &&
            priceRanges.map(prices => (
              <Row>
                <Price>{getPrice(prices.minPrice, prices.maxPrice)}</Price>
                <Unit>/ {getUnit(prices.unit)}</Unit>
              </Row>
            ))}
        </Column>
      </Header>

      <Description>{clearTags(description)}</Description>
    </DescriptionWrapper>
  );
};

export default ProductDescription;
