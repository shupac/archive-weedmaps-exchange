import React from 'react';
import { shallow } from 'enzyme';
import BreadcrumbLink from 'components/atoms/breadcrumb-link';
import Breadcrumbs from './';

const mockLinks = [
  { label: 'Catalog', route: '/catalog', param: null },
  { label: 'Flower', route: '/route', param: 'indica' },
  { label: 'Indica' },
];

describe('Breadcrumbs', () => {
  it('should render active links', () => {
    const component = shallow(<Breadcrumbs links={mockLinks} />).dive();
    expect(component.find(BreadcrumbLink).length).toEqual(3);
  });
  it('should render current link', () => {
    const component = shallow(<Breadcrumbs links={mockLinks} />).dive();
    expect(component.find('ActiveCrumb').length).toEqual(1);
  });
});
