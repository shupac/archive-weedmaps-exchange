// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Flex } from '@ghostgroup/grid-styled';

const AspectRatioWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: ${({ aspectRatio }) => 100 / aspectRatio}%;
`;

const AspectRatioContentWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type Props = {
  aspectRatio: number,
  children?: React$Element<any>,
};

const AspectRatio = ({ aspectRatio, children, ...props }: Props) => (
  <AspectRatioWrapper aspectRatio={aspectRatio}>
    <AspectRatioContentWrapper alignItems="stretch">
      {children && React.cloneElement(children, { ...props })}
    </AspectRatioContentWrapper>
  </AspectRatioWrapper>
);

export default AspectRatio;
