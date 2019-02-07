// @flow
import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import WmTheme from '@ghostgroup/ui.theme';

const A = styled.a`
  display: block;
  text-decoration: none;
  color: ${WmTheme.style.state.primary};
  cursor: pointer;
  width: fit-content;
`;

type Props = {
  href: string,
  children?: React.ChildrenArray<*>,
};

export default ({ href, children }: Props) => (
  <Link href={href}>
    <A>{children}</A>
  </Link>
);
