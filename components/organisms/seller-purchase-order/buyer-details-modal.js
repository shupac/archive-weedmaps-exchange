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
  buyerName: string,
  buyerEmail: string,
  buyerPhone: string,
  buyerLicenses: string,
  buyerDeliveryInstructions: string,
  buyerAddress: string,
  buyerLicenses: LicenseType[],
};

const BuyerDetailsModal = ({
  buyerName,
  buyerEmail,
  buyerPhone,
  buyerLicenses,
  buyerDeliveryInstructions,
  buyerAddress,
}: Props) => (
  <Modal header="Buyer Details">
    <SellerDetailsWrapper>
      <DetailsTitle>Buyer Name</DetailsTitle>
      <DetailDescription>{buyerName}</DetailDescription>
      <DetailsTitle>Shipping Address</DetailsTitle>
      <DetailDescription>{buyerAddress}</DetailDescription>
      <DetailsTitle>Delivery Instructions</DetailsTitle>
      <DetailDescription>{buyerDeliveryInstructions}</DetailDescription>
      <DetailsTitle>Contact Phone</DetailsTitle>
      {buyerPhone ? (
        <DetailDescription>
          {normalizePhoneNumber(buyerPhone)}
        </DetailDescription>
      ) : (
        <DetailDescription>N/A</DetailDescription>
      )}
      <DetailsTitle>Contact Email</DetailsTitle>
      <DetailDescription>{buyerEmail || 'N/A'}</DetailDescription>
      <DetailsTitle>License(s)</DetailsTitle>
      {buyerLicenses.length > 0 ? (
        buyerLicenses.map(licenses => (
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

export default BuyerDetailsModal;
