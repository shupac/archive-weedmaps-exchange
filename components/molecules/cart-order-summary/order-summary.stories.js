import React from 'react';
import { storiesOf } from '@storybook/react';
import mockCart, { mockErrorCart } from 'lib/mocks/cart';
import CartOrderSummary from './';

const props = {
  cart: mockCart,
  onSubmit: () => console.log('hi'),
};

const propsWithError = {
  cart: mockErrorCart,
  onSubmit: () => console.log('hi'),
};

export default storiesOf('CartOrderSummary', module)
  .add('Default', () => <CartOrderSummary {...props} />)
  .add('Error', () => <CartOrderSummary {...propsWithError} />);
