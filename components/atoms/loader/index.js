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
};

export const Loader = ({ loaderText }: Props) => (
  <LoaderWrap>
    <Icons.Spinner size="70px" fill={icon.dark} />
    {loaderText && <p>{loaderText}</p>}
  </LoaderWrap>
);

export default Loader;
