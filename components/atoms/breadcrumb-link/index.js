// @flow
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'components/atoms/icons/chevron';
import styled from 'styled-components';
import { rem, darken } from 'polished';
import { WmTheme } from '@ghostgroup/ui';

const { state } = WmTheme.style;

const ActiveLink = styled.span`
  display: flex;
  align-items: center;
  > a {
    font-size: ${rem(14)};
    color: ${state.primary};
    text-decoration: none;
    &:hover {
      color: ${darken(0.1, state.primary)};
    }
  }
  > div {
    margin: 0 8px;
  }
`;

ActiveLink.displayName = 'ActiveLink';

type Props = {
  label: string,
  route?: string,
};

export const BreadcrumbLink = ({ label, route }: Props) => (
  <ActiveLink>
    <Link href={route}>
      <a>{label}</a>
    </Link>
    <ChevronRight size={{ width: '8px', height: '8px' }} />
  </ActiveLink>
);

export default BreadcrumbLink;
