// @flow
import React, { Component } from 'react';
import find from 'lodash.find';
import type { ProductImage } from 'lib/types/products';
import { ProductPhotosWrapper, MiniPhotoWrapper } from './styles';
import MiniPhotos from './MiniPhotos';
import FeaturedPhoto from './FeaturedPhoto';

type Props = {
  productPhotos: Array<ProductImage>,
};

type State = {
  featuredPhoto?: ProductImage,
};

export default class ProductPhotos extends Component<Props, State> {
  state = {
    featuredPhoto: this.props.productPhotos[0],
  };

  changeFeaturePhoto = (photoId: string) => {
    const { productPhotos } = this.props;
    const clickedPhoto = find(productPhotos, { small_url: photoId });
    this.setState({ featuredPhoto: clickedPhoto });
  };

  render() {
    const { featuredPhoto } = this.state;
    const { productPhotos } = this.props;

    return (
      <ProductPhotosWrapper>
        <FeaturedPhoto featuredPhoto={featuredPhoto} />
        <MiniPhotoWrapper>
          {productPhotos &&
            productPhotos.map(photo => (
              <MiniPhotos
                key={photo.small_url}
                photo={photo}
                onClick={this.changeFeaturePhoto}
                isFeatured={
                  featuredPhoto && photo.small_url === featuredPhoto.small_url
                }
              />
            ))}
        </MiniPhotoWrapper>
      </ProductPhotosWrapper>
    );
  }
}
