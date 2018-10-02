import React from 'react';
import { shallow, mount } from 'enzyme';
import { productPhotos as mockProductPhotos } from 'lib/mocks/product-photos';
import MiniPhotos from './mini-photos';
import FeaturedPhoto from './featured-photo';
import ProductPhotos from './';

describe('Product Photos', () => {
  it('should render the feature and mini photos', () => {
    const component = shallow(
      <ProductPhotos productPhotos={mockProductPhotos} />,
    ).dive();
    expect(component.find(FeaturedPhoto).length).toEqual(1);
    expect(component.find(MiniPhotos).length).toEqual(2);
  });
  it('should check if mini photo isFeatured is true', () => {
    const photo = {
      smallUrl: 'weedmaps.com/images/blue-dream-small.jpg',
      mediumUrl: 'weedmaps.com/images/blue-dream-medium.jpg',
      largeUrl: 'weedmaps.com/images/blue-dream-large.jpg',
    };
    const state = {
      featuredPhoto: {
        smallUrl: 'weedmaps.com/images/blue-dream-small.jpg',
        mediumUrl: 'weedmaps.com/images/blue-dream-medium.jpg',
        largeUrl: 'weedmaps.com/images/blue-dream-large.jpg',
      },
    };
    const component = shallow(
      <ProductPhotos
        photo={photo}
        {...state}
        productPhotos={mockProductPhotos}
      />,
    );
    expect(
      component
        .find(MiniPhotos)
        .at(0)
        .props().isFeatured,
    ).toEqual(true);
  });
  it('should check if mini photo isFeatured is false', () => {
    const photo = {
      smallUrl: 'http://via.placeholder.com/400x400',
      mediumUrl: 'weedmaps.com/images/blue-dream-medium.jpg',
      largeUrl: 'http://via.placeholder.com/400x400',
    };
    const state = {
      featuredPhoto: {
        smallUrl: 'weedmaps.com/images/blue-dream-small.jpg',
        mediumUrl: 'weedmaps.com/images/blue-dream-medium.jpg',
        largeUrl: 'weedmaps.com/images/blue-dream-large.jpg',
      },
    };
    const component = shallow(
      <ProductPhotos
        photo={photo}
        {...state}
        productPhotos={mockProductPhotos}
      />,
    );
    expect(
      component
        .find(MiniPhotos)
        .at(1)
        .props().isFeatured,
    ).toEqual(false);
  });
  it('should render the changeFeaturePhoto', () => {
    const component = mount(
      <ProductPhotos productPhotos={mockProductPhotos} />,
    );
    expect(component.state('featuredPhoto')).toEqual({
      smallUrl: 'http://via.placeholder.com/400x400/d4201e',
      mediumUrl: 'weedmaps.com/images/blue-dream-medium.jpg',
      largeUrl: 'http://via.placeholder.com/400x400/d4201e',
      id: '1234',
    });
    component
      .find(MiniPhotos)
      .at(1)
      .simulate('click');

    expect(component.state('featuredPhoto')).toEqual({
      smallUrl: 'http://via.placeholder.com/400x400',
      mediumUrl: 'weedmaps.com/images/blue-dream-medium.jpg',
      largeUrl: 'http://via.placeholder.com/400x400',
      id: '5678',
    });
  });
});
