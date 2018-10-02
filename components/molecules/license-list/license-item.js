// @flow
import React from 'react';
import { LicenseNumber, LicenseType } from './styles';

type License = {
  licenseType: string,
  number: number,
};

type Props = {
  license: License,
};

const LicenseItem = ({ license }: Props) => (
  <div>
    <LicenseType>
      {license.licenseType}:{` `}
    </LicenseType>
    <LicenseNumber>{license.number && license.number}</LicenseNumber>
  </div>
);

export default LicenseItem;
