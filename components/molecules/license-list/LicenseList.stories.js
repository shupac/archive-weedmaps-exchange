import React from 'react';
import { mockProduct } from 'lib/mocks/product';
import { storiesOf } from '@storybook/react';
import LicenseList from './';

const { included: arr } = mockProduct;
const brand = arr.find(x => x.type === 'brand');
console.log('brand', brand);

const noLicensesBrand = {
  type: 'brand',
  id: 'ffgdfs-34gfsd-fdsf44-gf5g5g',
  uuid: 'gjf15k-th43ub-86hgn1-95jf8h',
  attributes: {
    name: 'West Coast Cure',
    slug: 'west-coast-cure',
    licenses: [],
  },
};

export default storiesOf('License List', module)
  .add('With Licenses', () => <LicenseList brand={brand} />)
  .add('Without Licenses', () => <LicenseList brand={noLicensesBrand} />);
