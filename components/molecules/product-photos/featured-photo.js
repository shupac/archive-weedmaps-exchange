// @flow
import React, { Fragment } from 'react';
import type { ImageType } from 'lib/data-access/models/image';
import { FeaturedPhotoWrapper } from './styles';

const FeaturedPhoto = ({
  featuredPhoto,
  modalHandler,
}: {
  featuredPhoto?: ImageType,
  modalHandler: () => void,
}) => (
  <Fragment>
    {featuredPhoto ? (
      <FeaturedPhotoWrapper
        style={{ backgroundImage: `url(${featuredPhoto.largeUrl})` }}
        onClick={modalHandler}
      />
    ) : (
      <FeaturedPhotoWrapper>No picture Available</FeaturedPhotoWrapper>
    )}
  </Fragment>
);

export default FeaturedPhoto;
