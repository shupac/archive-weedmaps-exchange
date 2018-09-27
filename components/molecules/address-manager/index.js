// @flow
import React from 'react';
import { truncate } from 'lib/common/strings';
import {
  AddButton,
  AddressManagerWrapper,
  AddressManagerHeader,
  AddressManagerBody,
  SelectHeader,
  AddressDropdown,
} from './styles';

type AddressObject = {
  text: string,
  value: string,
};

type Props = {
  addresses: AddressObject[],
  selectedAddress: AddressObject,
  onSelectAddress: (address: AddressObject) => void,
  addNewAddress: () => void,
};

const AddressManager = ({
  addresses,
  selectedAddress,
  onSelectAddress,
  addNewAddress,
}: Props) => {
  const addressText = item => ({ text: truncate(item.text, 25), ...item });

  return (
    <AddressManagerWrapper>
      <AddressManagerHeader>Shipping Address</AddressManagerHeader>
      <SelectHeader>Choose Address</SelectHeader>
      <AddressManagerBody>
        <AddressDropdown
          dropdownLabel="addressDropdown"
          onChange={address => onSelectAddress(address)}
          placeholder="Select Address"
          initialSelection={selectedAddress}
          itemToString={addressText}
          items={addresses}
          searchable={false}
        />
        <AddButton onClick={addNewAddress}>Add New Address</AddButton>
      </AddressManagerBody>
    </AddressManagerWrapper>
  );
};
export default AddressManager;
