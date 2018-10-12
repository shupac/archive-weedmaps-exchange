import React from 'react';
import { shallow } from 'enzyme';
import { productPhotos as mockProductPhotos } from 'lib/mocks/product-photos';
import MiniPhotos from './mini-photos';
import FeaturedPhoto from './featured-photo';
import ProductPhotos from './';

describe('Product Photos', () => {
  const props = {
    productPhotos: mockProductPhotos,
    changeFeaturePhoto: jest.fn(),
    featuredProduct: mockProductPhotos[0],
  };
  it('should render the feature and mini photos', () => {
    const component = shallow(<ProductPhotos {...props} />).dive();
    expect(component.find(FeaturedPhoto).length).toEqual(1);
    expect(component.find(MiniPhotos).length).toEqual(2);
  });
  it('should check if mini photo isFeatured is true', () => {
    const component = shallow(<ProductPhotos {...props} />);
    expect(
      component
        .find(MiniPhotos)
        .at(0)
        .props().isFeatured,
    ).toEqual(true);
  });
  it('should check if mini photo isFeatured is false', () => {
    const component = shallow(<ProductPhotos {...props} />);
    expect(
      component
        .find(MiniPhotos)
        .at(1)
        .props().isFeatured,
    ).toEqual(false);
  });
  it('should render the changeFeaturePhoto', () => {
    const component = shallow(<ProductPhotos {...props} />);
    component
      .find(MiniPhotos)
      .last()
      .simulate('click');
    expect(props.changeFeaturePhoto).toHaveBeenCalled();
  });
});
