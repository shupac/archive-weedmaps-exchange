import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  productPhotos as mockProductPhotos,
  emptyProductPhotos,
} from 'lib/mocks/productPhotos';
import ProductPhotos from './';

export default storiesOf('Product Photos', module)
  .add('Default', () => <ProductPhotos productPhotos={mockProductPhotos} />)
  .add('No Product Photos', () => (
    <ProductPhotos productPhotos={emptyProductPhotos} />
  ));
