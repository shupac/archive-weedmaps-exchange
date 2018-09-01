// @flow
import React from 'react';
import BreadcrumbLink from 'components/atoms/breadcrumb-link';
import { BreadcrumbWrap, ActiveCrumb } from './styles';

type Links = {
  label: string,
  route?: string,
  param?: string | null,
};

type Props = {
  links: [Links],
};

export const Breadcrumbs = ({ links }: Props) => {
  // $FlowFixMe
  const [last, ...rest] = links.reverse();
  return (
    <BreadcrumbWrap>
      {rest.map(({ label, route, param }) => (
        <BreadcrumbLink label={label} route={route} key={label} param={param} />
      ))}
      <ActiveCrumb>{last.label}</ActiveCrumb>
    </BreadcrumbWrap>
  );
};

export default Breadcrumbs;
