// @flow
import React, { Fragment } from 'react';
import { BrandHeader } from './styles';
import LicenseItem from './license-item';

type License = {
  licenseType: string,
  number: number,
};

type Props = {
  brandName: string,
  licenseList: License[],
};

const LicenseList = ({ brandName, licenseList }: Props) => (
  <Fragment>
    <BrandHeader>{brandName} License(s)</BrandHeader>
    {licenseList.map(license => (
      <LicenseItem key={license.number} license={license} />
    ))}
  </Fragment>
);

export default LicenseList;
