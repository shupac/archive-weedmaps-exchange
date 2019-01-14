/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */
// @flow

import React from 'react';
import { Tabs, Icons } from '@ghostgroup/ui';
import {
  AddBusinessButton,
  ListingHeadersTabsWrapper,
  ListingTab,
} from './styles';

const { Plus } = Icons;

export const listingTypes = [
  { label: 'DISPENSARIES', value: 'dispensary' },
  { label: 'DELIVERIES', value: 'delivery' },
  { label: 'DOCTORS', value: 'doctor' },
];

const ListingHeaderTab = ({
  selectedListingType,
  handleTabSelect,
}: {
  selectedListingType: string,
  handleTabSelect: (listingType: string) => void,
}) => (
  <ListingHeadersTabsWrapper>
    <Tabs disableSelectionIndicatorBar>
      {listingTypes.map(listing => (
        <ListingTab
          key={listing.value}
          isSelected={listing.value === selectedListingType}
        >
          <a role="button" onClick={() => handleTabSelect(listing.value)}>
            {listing.label}
          </a>
        </ListingTab>
      ))}
    </Tabs>
    <AddBusinessButton state="primary">
      <Plus size="16px" fill="white" />
      Business
    </AddBusinessButton>
  </ListingHeadersTabsWrapper>
);

export default ListingHeaderTab;
