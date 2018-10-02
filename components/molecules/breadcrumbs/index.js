// @flow
import React from 'react';
import BreadcrumbLink from 'components/atoms/breadcrumb-link';
import { BreadcrumbWrap, ActiveCrumb } from './styles';

type Links = {
  label: string,
  route: string,
};

type Props = {
  links: Links[],
  activeLabel: string,
};

export const Breadcrumbs = ({ links, activeLabel }: Props) => (
  <BreadcrumbWrap>
    {links.map(({ label, route }) => (
      <BreadcrumbLink label={label} route={route} key={label} />
    ))}
    <ActiveCrumb>{activeLabel}</ActiveCrumb>
  </BreadcrumbWrap>
);

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
