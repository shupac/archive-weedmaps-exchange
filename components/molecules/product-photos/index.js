// @flow
import React, { Component } from 'react';
import find from 'lodash.find';
import type { ImageType } from 'lib/data-access/models/image';
import { ProductPhotosWrapper, MiniPhotoWrapper } from './styles';
import MiniPhotos from './mini-photos';
import FeaturedPhoto from './featured-photo';

type Props = {
  productPhotos: ImageType[],
};

type State = {
  featuredPhoto?: ImageType,
};

export class ProductPhotos extends Component<Props, State> {
  state = {
    featuredPhoto: this.props.productPhotos[0],
  };

  changeFeaturePhoto = (photoId: string) => {
    const { productPhotos } = this.props;
    const clickedPhoto = find(productPhotos, { id: photoId });
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
                key={photo.id}
                photo={photo}
                onClick={this.changeFeaturePhoto}
                isFeatured={featuredPhoto && photo.id === featuredPhoto.id}
              />
            ))}
        </MiniPhotoWrapper>
      </ProductPhotosWrapper>
    );
  }
}

export default ProductPhotos;
