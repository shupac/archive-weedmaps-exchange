// @flow
import React from 'react';
import { truncate } from 'lib/common/strings';
import { inject, observer } from 'mobx-react';
import { type StoreType } from 'lib/types/store';
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
  selectedAddress: AddressObject | null,
  onSelectAddress: (address: AddressObject) => void,
  store: StoreType,
};

const AddressManager = ({
  addresses,
  selectedAddress,
  onSelectAddress,
  store,
}: Props) => {
  const addressText = item => ({ text: truncate(item.text, 25), ...item });
  const { uiStore } = store;

  return (
    <AddressManagerWrapper>
      <AddressManagerHeader>Shipping Address</AddressManagerHeader>
      <SelectHeader>Choose Address</SelectHeader>
      <AddressManagerBody>
        <AddressDropdown
          dropdownLabel="addressDropdown"
          onChange={address => onSelectAddress(address.value)}
          placeholder="Select Address"
          initialSelection={selectedAddress}
          itemToString={addressText}
          items={addresses}
          searchable={false}
        />
        <AddButton
          onClick={() => {
            uiStore.openModal('cartModal');
          }}
        >
          Add New Address
        </AddButton>
      </AddressManagerBody>
    </AddressManagerWrapper>
  );
};
export default inject('store')(observer(AddressManager));
