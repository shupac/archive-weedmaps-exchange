import React from 'react';
import { storiesOf } from '@storybook/react';
import { mockProduct } from 'lib/mocks/product';
import { withKnobs } from '@storybook/addon-knobs/react';
import { ProductVariants } from './';

const { included: data } = mockProduct;
const variantData = data.filter(item => item.type === 'variant');

// const errorEntry = {
//   type: 'variant',
//   id: '0917245984',
//   attributes: {
//     name: '1 Ounce',
//     size: 28,
//     unit: 'gram',
//     amount: 10,
//     price: 270,
//     currency: 'usd',
//     inStock: true,
//     hasQuantityAlert: true,
//   },
// };

// const withErrorEntry = [...variantData, errorEntry];

export default storiesOf('Product Variants')
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ padding: 24 }}>
      <ProductVariants variants={variantData} />
    </div>
  ));
// .add('With Quantity Error', () => (
//   <div style={{ padding: 24 }}>
//     <ProductVariants variants={withErrorEntry} />
//   </div>
// ));
