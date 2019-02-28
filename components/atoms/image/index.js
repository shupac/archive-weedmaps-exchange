// @flow
import React from 'react';

export const Image = (props: any) => {
  const onError = event => {
    event.target.onerror = null;
    event.target.src = '/static/images/image_missing.png';
    return true;
  };

  // eslint-disable-next-line
  return <img {...props} onError={onError} />;
};

export default Image;
