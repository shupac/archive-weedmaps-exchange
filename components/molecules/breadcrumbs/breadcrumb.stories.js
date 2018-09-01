import React from 'react';
import { storiesOf } from '@storybook/react';
import Breadcrumbs from './';

const mockLinks = [
  { label: 'Catalog', route: '/catalog', param: null },
  { label: 'Flower', route: '/route', param: 'indica' },
  { label: 'Indica' },
];

export default storiesOf('Breadcrumbs', module).add('Default', () => (
  <Breadcrumbs links={mockLinks} />
));
