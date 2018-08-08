import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import ProductCard from './';

export default storiesOf('ProductCard', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <ProductCard
      id="123"
      brand={text('Brand Name', 'West Coast Cure')}
      name={text('Product Name', 'Strawberry Pineapple Kush OG')}
      priceUnit="g"
      minPrice={8.95}
      maxPrice={10.95}
      imageUrl="https://drh2acu5z204m.cloudfront.net/items/2V0X0y2a1i101k2N1Z32/Image%202018-07-25%20at%201.48.53%20PM.png?X-CloudApp-Visitor-Id=3106914&v=f0996046"
      category="Indica"
      outOfStock={boolean('Out of Stock', false)}
    />
  ));
