import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { WmLogoMini } from '../icons';

const Img = styled.div`
  display: flex;
  img {
    user-select: none;
    border-radius: 50%;
    box-shadow: 0 1px 3px 0 ${theme.style.shadow};
  }
`;

export const Avatar = ({ avatarUrl, altTag, w, h }) => {
  const img = avatarUrl ? (
    <img src={avatarUrl} alt={altTag} width={w} height={h} />
  ) : (
    <WmLogoMini width={w} height={h} fill="#a7a7a7" />
  );

  return <Img> {img} </Img>;
};

Avatar.defaultProps = {
  w: 40,
  h: 40,
  altTag: 'weedmaps avatar',
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  altTag: PropTypes.string,
  w: PropTypes.number,
  h: PropTypes.number,
};

Avatar.displayName = 'Avatar';

export default Avatar;
