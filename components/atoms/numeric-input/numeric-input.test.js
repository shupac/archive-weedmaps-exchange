import React from 'react';
import { shallow } from 'enzyme';
import NumericInput from './';

describe('Numeric Input', () => {
  it('should render an input ', () => {
    const input = shallow(<NumericInput />);
    expect(input.exists()).toBe(true);
  });
});
