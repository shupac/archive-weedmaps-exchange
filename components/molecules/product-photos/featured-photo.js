// @flow
import React, { Fragment } from 'react';
import type { ImageType } from 'lib/data-access/models/image';
import { FeaturedPhotoWrapper } from './styles';

const FeaturedPhoto = ({ featuredPhoto }: { featuredPhoto?: ImageType }) => (
  <Fragment>
    {featuredPhoto ? (
      <FeaturedPhotoWrapper
        style={{ backgroundImage: `url(${featuredPhoto.largeUrl})` }}
      />
    ) : (
      <FeaturedPhotoWrapper>No picture Available</FeaturedPhotoWrapper>
    )}
  </Fragment>
);

export default FeaturedPhoto;
