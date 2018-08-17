// @flow
import React from 'react';
import type { AttributesLicenses } from 'lib/types/products';
import { LicenseNumber, LicenseType } from './styles';

const LicenseItem = ({ license }: AttributesLicenses) => {
  const { number, type } = license;

  return (
    <div>
      <LicenseType>
        {type}:{` `}
      </LicenseType>
      <LicenseNumber>{number}</LicenseNumber>
    </div>
  );
};

export default LicenseItem;
