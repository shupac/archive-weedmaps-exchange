import React from 'react';
import { shallow } from 'enzyme';
import { OrdersFilters } from './';

function setup() {
  const props = {
    setSearch: jest.fn(),
    setDateRange: jest.fn(),
    setFilter: jest.fn(),
    buyerOrdersStore: {
      locationsFilterOptions: [
        { label: 'SF Location', id: '244a4623-009f-48de-b294-9d463b9973c6' },
      ],
      brandsFilterOptions: [
        { label: 'GfarmaLabs', id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
      ],
    },
  };
  const tree = shallow(<OrdersFilters {...props} />);
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
    instance.onSelectStatus(selections);
    expect(props.setFilter).toHaveBeenCalledWith('status', ['not_started']);
  });

  it('will set the locations filter', () => {
    const { instance, props } = setup();
    const selections = [
      { text: 'SF Location', value: '244a4623-009f-48de-b294-9d463b9973c6' },
    ];
    instance.onSelectLocations(selections);
    expect(props.setFilter).toHaveBeenCalledWith('location', [
      '244a4623-009f-48de-b294-9d463b9973c6',
    ]);
  });

  it('will set the brands filter', () => {
    const { instance, props } = setup();
    const selections = [
      { text: 'GfarmaLabs', value: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
    ];
    instance.onSelectBrands(selections);
    expect(props.setFilter).toHaveBeenCalledWith('brand', [
      'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
    ]);
  });
});
