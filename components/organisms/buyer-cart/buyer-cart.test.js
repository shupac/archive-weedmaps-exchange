import React from 'react';
import { shallow } from 'enzyme';
import mockCart, { emptyMockCart } from 'lib/mocks/cart';
import { mockLocations } from 'lib/mocks/location';
import BuyerSettings from 'lib/data-access/stores/buyer-settings';
import BuyerCart from 'lib/data-access/stores/buyer-cart';
import UiStore from 'lib/data-access/stores/ui';
import LocationModal from 'components/molecules/location-modal';
import { BuyerCart as BuyerCartComponent } from './';

function setup() {
  const mockStore = {
    buyerSettings: BuyerSettings.create(
      { locations: mockLocations, updateActiveLocation: jest.fn() },
      { client: { fetch: jest.fn().mockReturnValue(mockLocations) } },
    ),
    buyerCart: BuyerCart.create(
      { cart: mockCart, loadingCart: false },
      { fetch: jest.fn().mockReturnValue({ data: mockCart }) },
    ),
    uiStore: UiStore.create(),
  };
  const component = <BuyerCartComponent store={mockStore} />;
  const wrapper = shallow(component);
  return { wrapper, mockStore };
}

describe('Buyer Cart Page', () => {
  it('should render Loading state when loadingCart is true', () => {
    const mockStore = {
      buyerCart: BuyerCart.create(
        { cart: mockCart },
        { fetch: jest.fn().mockReturnValue({ data: mockCart }) },
      ),
    };
    const wrapper = shallow(<BuyerCartComponent store={mockStore} />);
    expect(wrapper.find('Loader').exists()).toEqual(true);
  });
  it('should render empty cart page when there is no item in the cart', () => {
    const mockStore = {
      buyerCart: BuyerCart.create(
        { cart: emptyMockCart, loadingCart: false },
        { fetch: jest.fn().mockReturnValue({ data: mockCart }) },
      ),
    };
    const wrapper = shallow(<BuyerCartComponent store={mockStore} />);
    expect(wrapper.find('EmptyCartPage').exists()).toEqual(true);
  });
  it('should render the Breadcrumbs', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Breadcrumbs').exists()).toEqual(true);
  });
  it('should render the AddressManager', () => {
    const mockStoreActiveModal = {
      buyerSettings: BuyerSettings.create(
        { locations: mockLocations, updateActiveLocation: jest.fn() },
        { client: { fetch: jest.fn().mockReturnValue(mockLocations) } },
      ),
      buyerCart: BuyerCart.create(
        { cart: mockCart, loadingCart: false },
        { fetch: jest.fn().mockReturnValue({ data: mockCart }) },
      ),
      uiStore: UiStore.create({ activeModal: 'cartModal' }),
    };
    const component = <BuyerCartComponent store={mockStoreActiveModal} />;
    const wrapper = shallow(component);
    expect(wrapper.find(LocationModal).exists()).toEqual(true);
  });
  it('will call dispose on unmount', () => {
    const { wrapper } = setup();
    const dispose = jest.spyOn(wrapper.instance(), 'dispose');
    wrapper.unmount();
    expect(dispose).toHaveBeenCalled();
  });
});
