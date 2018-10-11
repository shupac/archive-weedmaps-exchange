// @flow
import React, { Fragment } from 'react';
import { LicenseNumber, LicenseType } from './styles';

type License = {
  licenseType: string,
  number: number,
};

type Props = {
  license: License,
};

const LicenseItem = ({ license }: Props) => (
  <Fragment>
    <LicenseType>
      {license.licenseType}:{` `}
    </LicenseType>
    <LicenseNumber>{license.number && license.number}</LicenseNumber>
  </Fragment>
);

export default LicenseItem;
