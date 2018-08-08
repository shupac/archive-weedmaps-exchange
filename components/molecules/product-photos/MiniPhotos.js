// @flow
import React, { Fragment } from 'react';
import type { ProductImage } from '@/lib/types/products';
import { MiniPhoto } from './styles';

type Props = {
  onClick: string => void,
  isFeatured?: boolean,
  photo: ProductImage,
};

const MiniPhotos = ({ photo, onClick, isFeatured }: Props) => (
  <Fragment>
    <MiniPhoto
      style={{ backgroundImage: `url(${photo.small_url})` }}
      onClick={() => onClick(photo.small_url)}
      isFeatured={isFeatured}
    />
  </Fragment>
);

export default MiniPhotos;
