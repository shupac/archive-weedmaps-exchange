// @flow
import React from 'react';
import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { Icons } from '@ghostgroup/ui';

const { icon } = theme.style;

const LoaderWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  loaderText?: string,
  size?: string,
};

export const LoaderWrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  text-align: center;
`;

export const Loader = ({ loaderText, size = '48px' }: Props) => (
  <LoaderWrap>
    <Icons.Spinner size={size} fill={icon.dark} />
    {loaderText && <p>{loaderText}</p>}
  </LoaderWrap>
);

export default Loader;
