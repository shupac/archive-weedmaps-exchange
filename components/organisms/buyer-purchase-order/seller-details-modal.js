// @flow
import React from 'react';
import Modal from 'components/atoms/modal';
import { type LicenseType } from 'models/license';
import { normalizePhoneNumber } from 'lib/common/strings';
import {
  SellerDetailsWrapper,
  DetailsTitle,
  DetailDescription,
} from './styles';

type Props = {
  sellerEmail: string,
  sellerPhone?: string,
  brandName: string,
  sellerContactName?: string,
  sellerLicenses: LicenseType[],
};

const SellerDetailsModal = ({
  brandName,
  sellerEmail,
  sellerContactName,
  sellerPhone,
  sellerLicenses,
}: Props) => (
  <Modal header="Seller Details">
    <SellerDetailsWrapper>
      <DetailsTitle>Brand Name</DetailsTitle>
      <DetailDescription>{brandName}</DetailDescription>
      <DetailsTitle>Contact Name</DetailsTitle>
      <DetailDescription>{sellerContactName || 'N/A'}</DetailDescription>
      <DetailsTitle>Contact Phone</DetailsTitle>
      {sellerPhone ? (
        <DetailDescription>
          {normalizePhoneNumber(sellerPhone)}
        </DetailDescription>
      ) : (
        <DetailDescription>N/A</DetailDescription>
      )}
      <DetailsTitle>Contact Email</DetailsTitle>
      <DetailDescription>{sellerEmail || 'N/A'}</DetailDescription>
      <DetailsTitle>License(s)</DetailsTitle>
      {sellerLicenses.length > 0 ? (
        sellerLicenses.map(licenses => (
          <DetailDescription>
            {licenses.licenseType} {licenses.number}
          </DetailDescription>
        ))
      ) : (
        <DetailDescription>N/A</DetailDescription>
      )}
    </SellerDetailsWrapper>
  </Modal>
);

export default SellerDetailsModal;
