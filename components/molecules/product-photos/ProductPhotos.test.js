import React from 'react';
import { shallow, mount } from 'enzyme';
import { productPhotos as mockProductPhotos } from 'lib/mocks/product-photos';
import MiniPhotos from './MiniPhotos';
import FeaturedPhoto from './FeaturedPhoto';
import ProductPhotos from './';

describe('Product Photos', () => {
  it('should render the feature and mini photos', () => {
    const component = shallow(
      <ProductPhotos productPhotos={mockProductPhotos} />,
    ).dive();
    expect(component.find(FeaturedPhoto).length).toEqual(1);
    expect(component.find(MiniPhotos).length).toEqual(5);
  });
  it('should check if mini photo isFeatured is true', () => {
    const photo = {
      small_url: 'weedmaps.com/images/blue-dream-small.jpg',
      medium_url: 'weedmaps.com/images/blue-dream-medium.jpg',
      large_url: 'weedmaps.com/images/blue-dream-large.jpg',
    };
    const state = {
      featuredPhoto: {
        small_url: 'weedmaps.com/images/blue-dream-small.jpg',
        medium_url: 'weedmaps.com/images/blue-dream-medium.jpg',
        large_url: 'weedmaps.com/images/blue-dream-large.jpg',
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
      small_url: 'http://via.placeholder.com/400x400',
      medium_url: 'weedmaps.com/images/blue-dream-medium.jpg',
      large_url: 'http://via.placeholder.com/400x400',
    };
    const state = {
      featuredPhoto: {
        small_url: 'weedmaps.com/images/blue-dream-small.jpg',
        medium_url: 'weedmaps.com/images/blue-dream-medium.jpg',
        large_url: 'weedmaps.com/images/blue-dream-large.jpg',
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
    const photo = {
      small_url: 'weedmaps.com/images/blue-dream-small.jpg',
      medium_url: 'weedmaps.com/images/blue-dream-medium.jpg',
      large_url: 'weedmaps.com/images/blue-dream-large.jpg',
    };
    const component = mount(
      <ProductPhotos productPhotos={mockProductPhotos} photo={photo} />,
    );
    expect(component.state('featuredPhoto')).toEqual({
      large_url: 'http://via.placeholder.com/400x400/d4201e',
      medium_url: 'weedmaps.com/images/blue-dream-medium.jpg',
      small_url: 'http://via.placeholder.com/400x400/d4201e',
    });

    component
      .find(MiniPhotos)
      .at(2)
      .simulate('click');

    expect(component.state('featuredPhoto')).toEqual({
      small_url: 'http://via.placeholder.com/400x400/bd8cfd',
      medium_url: 'weedmaps.com/images/blue-dream-medium.jpg',
      large_url: 'http://via.placeholder.com/400x400/bd8cfd',
    });
  });
});
