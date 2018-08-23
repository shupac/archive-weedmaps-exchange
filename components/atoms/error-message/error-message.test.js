import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './';

describe('ErrorMessage', () => {
  it('should render error state 404', () => {
    const tree = shallow(<ErrorMessage statusCode={404} />);
    expect(tree.exists()).toEqual(true);
  });
  it('should render error state 500', () => {
    const tree = shallow(<ErrorMessage statusCode={500} />);
    expect(tree.exists()).toEqual(true);
  });
  it('should render error state undefined', () => {
    const tree = shallow(<ErrorMessage statusCode={1000} />);
    expect(tree.exists()).toEqual(true);
  });
});
