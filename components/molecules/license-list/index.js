// @flow
import React, { Fragment } from 'react';
import type { IncludedAttributes } from 'lib/types/products';
import { BrandHeader } from './styles';
import LicenseItem from './LicenseItem';

const LicenseList = ({ brand }: IncludedAttributes) => {
  const { attributes } = brand;
  const { name, licenses } = attributes;

  return (
    <Fragment>
      <BrandHeader>{name} License(s)</BrandHeader>
      {licenses.map(license => (
        <LicenseItem key={license ? license.number : null} license={license} />
      ))}
    </Fragment>
  );
};

export default LicenseList;
