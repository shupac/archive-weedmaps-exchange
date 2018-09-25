import React from 'react';
import { shallow } from 'enzyme';
import { mockProduct } from 'lib/mocks/product';
import { BrandHeader, LicenseNumber, LicenseType } from './styles';
import LicenseList from './';
import LicenseItem from './license-item';

const { included: arr } = mockProduct;
describe('License List', () => {
  it('should render the component with data', () => {
    const brand = arr.find(x => x.type === 'brand');

    const component = shallow(<LicenseList brand={brand} />);
    expect(component.find(BrandHeader).exists()).toBe(true);
  });

  it('should render the component with title if there are no licenses', () => {
    const brand = {
      type: 'brand',
      id: 'ffgdfs-34gfsd-fdsf44-gf5g5g',
      uuid: 'gjf15k-th43ub-86hgn1-95jf8h',
      attributes: {
        name: 'West Coast Cure',
        slug: 'west-coast-cure',
        licenses: [],
      },
    };

    const component = shallow(<LicenseList brand={brand} />);
    expect(component.find(BrandHeader).exists()).toBe(true);
  });
});

describe('License Item', () => {
  it('should render the component with data', () => {
    const brand = arr.find(x => x.type === 'brand');
    const { attributes } = brand;
    const { licenses } = attributes;
    const component = shallow(<LicenseItem license={licenses[0]} />);
    expect(component.find(LicenseNumber).exists()).toBe(true);
    expect(component.find(LicenseType).exists()).toBe(true);
  });
});
