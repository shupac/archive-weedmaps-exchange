// @flow
import React from 'react';
import { LicenseRow, LicenseNumber, LicenseType } from './styles';

type License = {
  licenseType: string,
  number: number,
};

type Props = {
  license: License,
};

const LicenseItem = ({ license }: Props) => (
  <LicenseRow>
    <LicenseType>
      {license.licenseType}:{` `}
    </LicenseType>
    <LicenseNumber>{license.number && license.number}</LicenseNumber>
  </LicenseRow>
);

export default LicenseItem;
