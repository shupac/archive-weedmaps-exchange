// @flow
import * as React from 'react';
import SubHeaderWrap from './styles';

type Props = {
  children?: React.Node,
};

export const Subheader = ({ children }: Props) => (
  <SubHeaderWrap>{children}</SubHeaderWrap>
);

export default Subheader;
