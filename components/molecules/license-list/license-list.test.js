import React from 'react';
import { shallow } from 'enzyme';
import { BrandHeader, LicenseNumber, LicenseType } from './styles';
import LicenseList from './';
import LicenseItem from './license-item';

const mockLicenses = [
  {
    id: '8c4369fc-a767-4e5c-9863-b5225705d563',
    licenseType: 'Sales',
    number: '420710',
  },
];

describe('License List', () => {
  it('should render the component with data', () => {
    const component = shallow(
      <LicenseList brandName="Brand Name" licenseList={mockLicenses} />,
    );
    expect(component.find(BrandHeader).exists()).toBe(true);
  });

  it('should render the component with title if there are no licenses', () => {
    const component = shallow(
      <LicenseList brandName="Brand Name" licenseList={mockLicenses} />,
    );
    expect(component.find(BrandHeader).exists()).toBe(true);
  });
});

describe('License Item', () => {
  it('should render the component with data', () => {
    const component = shallow(<LicenseItem license={mockLicenses[0]} />);
    expect(component.find(LicenseNumber).exists()).toBe(true);
    expect(component.find(LicenseType).exists()).toBe(true);
  });
});
