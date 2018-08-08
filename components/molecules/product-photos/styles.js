import styled from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';

const { shadow, background, state: WmColor } = WmTheme.style;

export const ProductPhotosWrapper = styled.div`
  margin-left: 16px;
`;
ProductPhotosWrapper.displayName = 'ProductPhotosWrapper';

export const FeaturedPhotoWrapper = styled.div`
  height: 336px;
  width: 400px;
  border-radius: 3px;
  background-color: ${background.light};
  box-shadow: 0 1px 3px 0 ${shadow};
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
FeaturedPhotoWrapper.displayName = 'FeaturedPhoto';

export const MiniPhotoWrapper = styled.div`
  display: flex;
  margin-top: 8px;
`;
MiniPhotoWrapper.displayName = 'MiniPhotoWrapper';

export const MiniPhoto = styled.div`
  height: 72px;
  width: 72px;
  border-radius: 3px;
  box-shadow: 0 0 3px 0 ${shadow};
  margin-right: 10px;
  :last-of-type {
    margin-right: 0;
  }
  background-size: cover;
  background-position: center center;
  border: ${({ isFeatured }) =>
    isFeatured ? `1px solid ${WmColor.primary}` : 'none'};
  cursor: pointer;
`;
MiniPhoto.displayName = 'MiniPhoto';
