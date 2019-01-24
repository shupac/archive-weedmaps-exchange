import React from 'react';
import { shallow } from 'enzyme';
import { OrdersFilters } from './';

function setup() {
  const props = {
    setSearch: jest.fn(),
    setDateRange: jest.fn(),
    setFilter: jest.fn(),
    ordersStore: {
      locationsFilterOptions: [
        { label: 'SF Location', id: '244a4623-009f-48de-b294-9d463b9973c6' },
      ],
      brandsFilterOptions: [
        { label: 'GfarmaLabs', id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
      ],
      sellerBrandsFilterOptions: [
        { label: 'GfarmaLabs', id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
      ],
      sellerLocationsFilterOptions: [
        { label: 'LA Loxation', id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
      ],
      sellerZonesFilterOptions: [
        { label: 'SoCal', id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
      ],
    },
  };
  const tree = shallow(<OrdersFilters buyersTable {...props} />);
  const instance = tree.instance();

  return { tree, instance, props };
}

describe('Orders Filters', () => {
  it('should render the component', () => {
    const { tree } = setup();
    expect(tree.exists()).toEqual(true);
  });

  it('will set the status filter', () => {
    const { instance, props } = setup();
    const selections = [{ text: 'NOT STARTED', value: 'not_started' }];
    instance.onSelectFilter('status')(selections);
    expect(props.setFilter).toHaveBeenCalledWith('status', ['not_started']);
  });

  it('will set the locations filter', () => {
    const { instance, props } = setup();
    const selections = [
      { text: 'SF Location', value: '244a4623-009f-48de-b294-9d463b9973c6' },
    ];
    instance.onSelectFilter('location')(selections);
    expect(props.setFilter).toHaveBeenCalledWith('location', [
      '244a4623-009f-48de-b294-9d463b9973c6',
    ]);
  });

  it('will set the brands filter', () => {
    const { instance, props } = setup();
    const selections = [
      { text: 'GfarmaLabs', value: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
    ];
    instance.onSelectFilter('brand')(selections);
    expect(props.setFilter).toHaveBeenCalledWith('brand', [
      'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
    ]);
  });

  it('will set the buyer name filter', () => {
    const { instance, props } = setup();
    const selections = [
      { text: 'SF Location', value: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
    ];
    instance.onSelectFilter('buyer_name')(selections);
    expect(props.setFilter).toHaveBeenCalledWith('buyer_name', [
      'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
    ]);
  });

  it('will set the zone filter', () => {
    const { instance, props } = setup();
    const selections = [
      { text: 'zone1', value: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
    ];
    instance.onSelectFilter('zone')(selections);
    expect(props.setFilter).toHaveBeenCalledWith('zone', [
      'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
    ]);
  });
});
