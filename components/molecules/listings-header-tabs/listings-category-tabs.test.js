import React from 'react';
import { shallow } from 'enzyme';
import { ListingTab } from './styles';
import ListingHeaderTab, { listingTypes } from './index';

describe('ListingHeaderTab', () => {
  it('should render listing tabs', () => {
    const props = {
      selectedListingType: 'DISPENSARIES',
      handleTabSelect: jest.fn(),
    };
    const tree = shallow(
      <ListingHeaderTab listingTypes={listingTypes} {...props} />,
    );
    expect(
      tree
        .find(ListingTab)
        .at(0)
        .children()
        .text(),
    ).toEqual('DISPENSARIES');
    expect(
      tree
        .find(ListingTab)
        .at(1)
        .children()
        .text(),
    ).toEqual('DELIVERIES');
    expect(
      tree
        .find(ListingTab)
        .at(2)
        .children()
        .text(),
    ).toEqual('DOCTORS');
  });
  it('should change to the correct tab when clicking', () => {
    const handleTabSelect = jest.fn();
    const selectedListingType = 'dispensary';

    const tree = shallow(
      <ListingHeaderTab
        listingTypes={listingTypes}
        handleTabSelect={handleTabSelect}
        selectedListingType={selectedListingType}
      />,
    );
    expect(
      tree
        .find(ListingTab)
        .at(0)
        .props().isSelected,
    ).toEqual(true);
    expect(
      tree
        .find(ListingTab)
        .at(1)
        .props().isSelected,
    ).toEqual(false);

    tree
      .find('a')
      .at(1)
      .simulate('click');

    expect(handleTabSelect).toHaveBeenCalledWith('delivery');
    tree.setProps({ selectedListingType: 'delivery' });
    expect(
      tree
        .find(ListingTab)
        .at(0)
        .props().isSelected,
    ).toEqual(false);
    expect(
      tree
        .find(ListingTab)
        .at(1)
        .props().isSelected,
    ).toEqual(true);
  });
});
