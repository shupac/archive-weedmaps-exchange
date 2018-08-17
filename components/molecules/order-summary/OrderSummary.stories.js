import React from 'react';
import { storiesOf } from '@storybook/react';
import OrderSummary from './';

const mockData = {
  quantity: 123,
  subTotal: 100,
  shipping: 10,
  total: 110,
};

export default storiesOf('OrderSummary', module).add('Default', () => (
  <OrderSummary {...mockData} />
));
