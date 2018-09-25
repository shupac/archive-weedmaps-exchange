import React from 'react';
import { mockProduct } from 'lib/mocks/product';
import { storiesOf } from '@storybook/react';
import ProductDetails from './';

const { data, included } = mockProduct;

export default storiesOf('Product Details', module)
  .add('Default', () => <ProductDetails details={data} dataArr={included} />)
  .add('Empty Product', () => (
    <ProductDetails details={undefined} dataArr={undefined} />
  ));
