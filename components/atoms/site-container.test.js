import React from 'react';
import { shallow } from 'enzyme';
import SiteWrapper from './site-container';

describe('Site Wrapper', () => {
  it('should have the Site Wrapper styling', () => {
    const component = shallow(<SiteWrapper />);
    expect(component).toHaveStyleRule('width: 100%');
  });
});
