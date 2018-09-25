// @flow
import React from 'react';
import { type StoreType } from 'lib/types/store';
import { type AttributesLicenses } from 'lib/types/products';
import { ModalBody, SellerDetails } from './styles';
import ModalWithHeader from './';

export type Seller = {
  name: string,
  email?: string,
  phone?: string,
  licenses?: AttributesLicenses[],
};

type Props = {
  store: StoreType,
  seller: Seller,
};

const SellerDetailModal = ({ store, seller }: Props) => (
  <ModalWithHeader
    store={store}
    header="Seller Details"
    width="620px"
    height="56px"
  >
    <ModalBody>
      <SellerDetails>
        Seller Name
        {console.log('this is the seller', seller)}
        <span>{seller.name}</span>
      </SellerDetails>
      <SellerDetails>
        Contact Phone
        <span>{seller.phone || 'N/A'}</span>
      </SellerDetails>
      <SellerDetails>
        Contact Email
        <span>{seller.email || 'N/A'}</span>
      </SellerDetails>
      <SellerDetails>
        License(s)
        {seller.licenses ? (
          seller.licenses.map(license => (
            <span>
              <b>{license.type}:</b> {license.number}
            </span>
          ))
        ) : (
          <span>N/A</span>
        )}
      </SellerDetails>
    </ModalBody>
  </ModalWithHeader>
);

export default SellerDetailModal;
