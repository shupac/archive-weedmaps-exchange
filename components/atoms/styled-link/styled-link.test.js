import React from 'react';
import { shallow } from 'enzyme';
import StyledLink from './';

describe('Styled Link', () => {
  it('should render the link', () => {
    const wrapper = shallow(<StyledLink href="/">Foo</StyledLink>);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render the children', () => {
    const child = <div>Foo</div>;
    const wrapper = shallow(<StyledLink href="/">{child}</StyledLink>);
    expect(wrapper.find('div').text()).toEqual('Foo');
  });
});
