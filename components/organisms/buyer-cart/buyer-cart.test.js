import React from 'react';
import { shallow } from 'enzyme';
import mockCart from 'lib/mocks/cart';
import { mockLocations } from 'lib/mocks/location';
import BuyerSettings from 'lib/data-access/stores/buyer-settings';
import BuyerCart from 'lib/data-access/stores/buyer-cart';
import { BuyerCart as BuyerCartComponent } from './';

function setup() {
  const mockStore = {
    buyerSettings: BuyerSettings.create(
      {},
      { client: { fetch: jest.fn().mockReturnValue(mockLocations) } },
    ),
    buyerCart: BuyerCart.create(
      { cartItemCount: 2 },
      { fetch: jest.fn().mockReturnValue({ data: mockCart }) },
    ),
  };
  const component = <BuyerCartComponent store={mockStore} />;
  const wrapper = shallow(component);
  return { wrapper, mockStore };
}

describe('Buyer Cart Page', () => {
  it('should render the Breadcrumbs', () => {
    const { wrapper } = setup();
    console.log('SETUP ', wrapper);
  });
  it('should render the AddressManager', () => {});
});
