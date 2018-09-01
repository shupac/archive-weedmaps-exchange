import React from 'react';
import { shallow } from 'enzyme';
import BreadcrumbLink from './';

describe('Breadcrumb Link', () => {
  it('should render the link', () => {
    const component = shallow(
      <BreadcrumbLink label="BreadCrumb" route="/test" param="indica" />,
    );
    expect(component.find('ActiveLink').exists()).toEqual(true);
  });
});
