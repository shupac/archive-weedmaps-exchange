// @flow
import React from 'react';
import type { ImageType } from 'lib/data-access/models/image';
import { ProductPhotosWrapper, MiniPhotoWrapper } from './styles';
import MiniPhotos from './mini-photos';
import FeaturedPhoto from './featured-photo';

type Props = {
  productPhotos: ImageType[],
  featuredProduct: ImageType,
  changeFeaturePhoto: (id: string) => void,
};

export const ProductPhotos = ({
  productPhotos,
  featuredProduct,
  changeFeaturePhoto,
}: Props) => (
  <ProductPhotosWrapper>
    <FeaturedPhoto featuredPhoto={featuredProduct} />
    <MiniPhotoWrapper>
      {productPhotos &&
        productPhotos.map(photo => (
          <MiniPhotos
            key={photo.id}
            photo={photo}
            onClick={() => changeFeaturePhoto(photo.id)}
            isFeatured={featuredProduct && photo.id === featuredProduct.id}
          />
        ))}
    </MiniPhotoWrapper>
  </ProductPhotosWrapper>
);

export default ProductPhotos;
