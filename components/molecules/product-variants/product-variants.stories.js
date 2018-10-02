import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { ProductVariants } from './';

const variants = [
  {
    id: 'cb429ae1-cb29-46b8-adcc-1eb234dc266b',
    name: 'Gram Packs',
    size: 1,
    unit: 'gram',
    price: 20,
    amount: 151,
    inStock: true,
  },
  {
    id: '630580e0-c20b-48fc-8ea1-e03abe831b05',
    name: 'Ounce Packs',
    size: 28,
    unit: 'gram',
    price: 45,
    amount: 22,
    inStock: true,
  },
];

// const withErrorEntry = [...variantData, errorEntry];

export default storiesOf('Product Variants')
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ padding: 24 }}>
      <ProductVariants variants={variants} />
    </div>
  ));
// .add('With Quantity Error', () => (
//   <div style={{ padding: 24 }}>
//     <ProductVariants variants={withErrorEntry} />
//   </div>
// ));
