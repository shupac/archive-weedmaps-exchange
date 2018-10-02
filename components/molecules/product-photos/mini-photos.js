// @flow
import React, { Fragment } from 'react';
import type { ImageType } from 'lib/data-access/models/image';
import { MiniPhoto } from './styles';

type Props = {
  onClick: string => void,
  isFeatured?: boolean,
  photo: ImageType,
};

const MiniPhotos = ({ photo, onClick, isFeatured }: Props) => (
  <Fragment>
    <MiniPhoto
      style={{ backgroundImage: `url(${photo.smallUrl})` }}
      onClick={() => onClick(photo.id)}
      isFeatured={isFeatured}
    />
  </Fragment>
);

export default MiniPhotos;
