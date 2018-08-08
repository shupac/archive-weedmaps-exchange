// @flow
import React, { Fragment } from 'react';
import type { ProductImage } from '@/lib/types/products';
import { FeaturedPhotoWrapper } from './styles';

const FeaturedPhoto = ({ featuredPhoto }: { featuredPhoto?: ProductImage }) => (
  <Fragment>
    {featuredPhoto ? (
      <FeaturedPhotoWrapper
        style={{ backgroundImage: `url(${featuredPhoto.large_url})` }}
      />
    ) : (
      <FeaturedPhotoWrapper>No picture Available</FeaturedPhotoWrapper>
    )}
  </Fragment>
);

export default FeaturedPhoto;
