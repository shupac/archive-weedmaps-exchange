import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import ProductDescription from './';

const onePrice = {
  name: 'Blueberry Gummies',
  brand: 'THClear Co',
  description:
    'THClear blueberry gummies is made with lots of high-grade THC that delivers an unbelievably tasty flavor that leaves a blueberry aroma followed by strong feelings of happiness, creativity and euphoria. Many edible-lovers enjoy this tasty treat for its wonderful natural effects that aid in relieving stress, pain and anxiety.',
  priceRanges: [{ minPrice: '25', maxPrice: '30', unit: 'gram' }],
};

const twoPrices = {
  name: 'Blueberry Gummies',
  brand: 'THClear Co',
  description:
    'THClear blueberry gummies is made with lots of high-grade THC that delivers an unbelievably tasty flavor that leaves a blueberry aroma followed by strong feelings of happiness, creativity and euphoria. Many edible-lovers enjoy this tasty treat for its wonderful natural effects that aid in relieving stress, pain and anxiety.',
  priceRanges: [
    { minPrice: '25', maxPrice: '30', unit: 'gram' },
    { minPrice: '20', maxPrice: '80', unit: 'unit' },
  ],
};

const threePrices = {
  name: 'Blueberry Gummies',
  brand: 'THClear Co',
  description:
    'THClear blueberry gummies is made with lots of high-grade THC that delivers an unbelievably tasty flavor that leaves a blueberry aroma followed by strong feelings of happiness, creativity and euphoria. Many edible-lovers enjoy this tasty treat for its wonderful natural effects that aid in relieving stress, pain and anxiety.',
  priceRanges: [
    { minPrice: '25', maxPrice: '30', unit: 'gram' },
    { minPrice: '20', maxPrice: '80', unit: 'unit' },
    { minPrice: '100', maxPrice: '200', unit: 'fluid_ounce' },
  ],
};

export default storiesOf('Product Description', module)
  .addDecorator(centered)
  .add('With One Price', () => <ProductDescription productDetail={onePrice} />)
  .add('With Two Prices', () => (
    <ProductDescription productDetail={twoPrices} />
  ))
  .add('With Three Prices', () => (
    <ProductDescription productDetail={threePrices} />
  ));
