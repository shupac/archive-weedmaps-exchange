// @flow
import * as React from 'react';
import { Link } from 'lib/routes';
import styled from 'styled-components';
import WmTheme from '@ghostgroup/ui.theme';

const A = styled.a`
  display: block;
  text-decoration: none;
  color: ${WmTheme.style.state.primary};
  cursor: pointer;
`;

type Props = {
  route: string,
  children?: React.ChildrenArray<*>,
};

export default ({ route, children }: Props) => (
  <Link route={route}>
    <A>{children}</A>
  </Link>
);
