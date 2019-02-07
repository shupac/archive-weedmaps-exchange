import React from 'react';
import { mount } from 'enzyme';
import SiteWrapper from './site-container';

describe('Site Wrapper', () => {
  it('should have the Site Wrapper styling', () => {
    const component = mount(<SiteWrapper />);
    expect(component).toHaveStyleRule('width: 100%');
  });
});
