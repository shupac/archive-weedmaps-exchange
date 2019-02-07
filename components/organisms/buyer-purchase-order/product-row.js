// @flow
import React from 'react';
import { Link } from 'lib/routes';
import { type OrderItemType } from 'lib/data-access/models/purchase-order';
import { formatDollars } from 'lib/common/strings';
import {
  ProductRowWrapper,
  ProductWrapper,
  ProductPhoto,
  ProductDescription,
  Subtotal,
} from './styles';

type Props = {
  item: OrderItemType,
};

const ProductRow = ({ item }: Props) => {
  const {
    amount,
    avatarImage,
    categories,
    price,
    productActive,
    productId,
    productName,
    variantName,
  } = item;

  let category = categories.parent;
  if (categories.child) category += ` > ${categories.child}`;

  return (
    <ProductRowWrapper>
      <ProductWrapper isPublished={productActive}>
        <ProductPhoto
          style={{
            backgroundImage: `url(${avatarImage.smallUrl})`,
          }}
        />
        <Link href={`/buyer/marketplace/catalog/product/${productId}`}>
          <a>
            <ProductDescription>
              <span>{productName}</span>
              <span>{variantName}</span>
            </ProductDescription>
          </a>
        </Link>
      </ProductWrapper>

      <div>{category}</div>

      <div>{formatDollars(Number(price))}</div>

      <div>{amount}</div>

      <Subtotal>{formatDollars(Number(parseFloat(price) * amount))}</Subtotal>
    </ProductRowWrapper>
  );
};

export default ProductRow;
