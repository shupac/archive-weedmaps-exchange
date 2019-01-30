import { shallow } from 'enzyme';
import { mockBrand } from 'lib/mocks/brands';
import { mockWmxUser } from 'lib/mocks/user';
import { mockOrg } from 'lib/mocks/organization';
import Loader from 'components/atoms/loader';
import { GeneralSettings } from './';

function setup(brand) {
  const mockStore = {
    authStore: {
      wmxUser: mockWmxUser,
      org: mockOrg,
      brand,
      activeSellerBrand: {
        text: 'Harmony Extracts',
        value: 'e98a5787-2e60-4302-b566-c6454a69a91f',
      },
      updateBrand: jest.fn(),
    },
  };
  const component = <GeneralSettings store={mockStore} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  const instance = wrapper.instance();
  return { wrapper, instance, mockStore };
}

describe('GeneralSettings', () => {
  it('should render the component', () => {
    const { wrapper } = setup(mockBrand);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should handle shipping fee change', () => {
    const { instance } = setup(mockBrand);
    instance.handleShippingFeeChange('10');
    expect(instance.shippingFee).toEqual('10');
  });

  it('should handle minimum purchase change', () => {
    const { instance } = setup(mockBrand);
    instance.handleMinPurchaseChange('10');
    expect(instance.minimumPurchasePrice).toEqual('10');
  });

  it('should handle input change', () => {
    const { instance } = setup(mockBrand);
    const event = {
      currentTarget: {
        name: 'min-delivery-eta',
        value: '10',
      },
    };
    instance.handleInputChange(event);
    expect(instance.deliveryEta).toEqual({
      etaMin: {
        value: 10,
        unit: 'hr',
      },
      etaMax: {
        value: 2,
        unit: 'week',
      },
      error: '',
    });
  });

  it('should handle select change', () => {
    const { instance } = setup(mockBrand);
    instance.handleSelectChange({ text: 'Day(s)', value: 'day' }, 'etaMin');
    expect(instance.deliveryEta).toEqual({
      etaMin: {
        value: 1,
        unit: 'day',
      },
      etaMax: {
        value: 2,
        unit: 'week',
      },
      error: '',
    });
  });

  it('should handle submit change', () => {
    const { instance, mockStore } = setup(mockBrand);
    const event = {
      currentTarget: {
        name: 'etaMin',
        value: '10',
      },
    };
    instance.handleShippingFeeChange('10');
    instance.handleMinPurchaseChange('10');
    instance.handleInputChange(event);
    instance.handleSelectChange({ text: 'Day(s)', value: 'day' }, 'etaMin');

    instance.handleSubmit();

    const brand = {
      delivery_eta: {
        eta_max: 10,
        eta_max_unit: 'week',
        eta_min: 1,
        eta_min_unit: 'day',
      },
      id: 'e98a5787-2e60-4302-b566-c6454a69a91f',
      minimum_purchase_price: '10',
      name: 'Harmony Extracts',
      shipping_fee: '10',
    };
    expect(mockStore.authStore.updateBrand).toHaveBeenCalledWith(brand);
  });

  it('should handle cancel change', () => {
    const { instance } = setup(mockBrand);
    const event = {
      currentTarget: {
        name: 'min-delivery-eta',
        value: '10',
      },
    };
    instance.handleShippingFeeChange('10');
    instance.handleMinPurchaseChange('10');
    instance.handleInputChange(event);
    instance.handleSelectChange({ text: 'Day(s)', value: 'day' }, 'etaMin');
    instance.handleCancel();

    expect(instance.shippingFee).toEqual(100);
    expect(instance.minimumPurchasePrice).toEqual(80);
    expect(instance.deliveryEta).toEqual({
      etaMin: {
        value: 1,
        unit: 'hr',
      },
      etaMax: {
        value: 2,
        unit: 'week',
      },
      error: '',
    });
  });

  it('should throw an error if min delivery eta is more than the max', () => {
    const { instance } = setup(mockBrand);
    const minDeliveryEvent = {
      currentTarget: {
        name: 'min-delivery-eta',
        value: '10',
      },
    };
    const maxDeliveryEvent = {
      currentTarget: {
        name: 'max-delivery-eta',
        value: '100',
      },
    };
    instance.handleInputChange(minDeliveryEvent);
    instance.handleInputChange(maxDeliveryEvent);
    instance.handleSelectChange({ text: 'Day(s)', value: 'day' }, 'etaMin');
    instance.handleSelectChange({ text: 'Hours(s)', value: 'hr' }, 'etaMax');
    expect(instance.deliveryEta).toEqual({
      etaMin: {
        value: 10,
        unit: 'day',
      },
      etaMax: {
        value: 100,
        unit: 'hr',
      },
      error: 'The min. value must be less than the max. value',
    });
  });

  it('should throw an error if there is no min delivery eta', () => {
    const { instance } = setup(mockBrand);
    const minDeliveryEvent = {
      currentTarget: {
        name: 'min-delivery-eta',
        value: '',
      },
    };
    instance.handleInputChange(minDeliveryEvent);
    expect(instance.deliveryEta).toEqual({
      etaMin: {
        value: '',
        unit: 'hr',
      },
      etaMax: {
        value: 2,
        unit: 'week',
      },
      error: 'Please select min. value',
    });
  });

  it('should show a loader if brand does not exist', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Loader).exists()).toEqual(true);
  });
});
