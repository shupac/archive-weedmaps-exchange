// @flow
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';

type Props = {
  height?: string,
  width?: string,
  src?: string,
};

export const FailIcon = ({ height, width, src }: Props) => (
  <img
    className="wm-icon"
    alt="Weedmaps"
    src={src}
    height={height}
    width={width}
  />
);

FailIcon.defaultProps = {
  height: '120px',
  width: '120px',
  src: '/static/images/404.svg',
};

export default FailIcon;
