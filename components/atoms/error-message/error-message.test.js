import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from './';

describe('ErrorMessage', () => {
  it('should render error state 404', () => {
    const tree = renderer.create(<ErrorMessage statusCode={404} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render error state 500', () => {
    const tree = renderer.create(<ErrorMessage statusCode={500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render error state undefined', () => {
    const tree = renderer.create(<ErrorMessage statusCode={1000} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
