import React from 'react';
import { storiesOf } from '@storybook/react';
import VendorCart from './';

export default storiesOf('Vendor Cart', module).add('Default', () => (
  <div style={{ width: '784px', margin: '50px' }}>
    <VendorCart />
  </div>
));
