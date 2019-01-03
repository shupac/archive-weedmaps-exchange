import { shallow } from 'enzyme';
import SellerSettingsStore from 'lib/data-access/stores/seller-settings';
import SellerProductsStore from 'lib/data-access/stores/seller-products';
import mockProductDetails from 'mocks/seller-product-details';
import mockZones from 'mocks/zones';

import { SellerProductDetails } from './';

function setup(props) {
  const mockStore = {
    sellerProducts: SellerProductsStore.create({
      sellerProductDetails: mockProductDetails,
    }),
    sellerSettings: SellerSettingsStore.create({
      zones: mockZones,
    }),
  };

  const component = <SellerProductDetails store={mockStore} {...props} />;
  const wrapper = shallow(component, { disableLifecycleMethods: true });
  return { wrapper, mockStore };
}

describe('Seller Product Details Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should fetch data on mount', () => {
    const { wrapper, mockStore } = setup({ productId: '123' });
    const instance = wrapper.instance();
    const fetchProductDetails = jest
      .spyOn(mockStore.sellerProducts, 'fetchProductDetails')
      .mockReturnValue();
    const fetchZones = jest
      .spyOn(mockStore.sellerSettings, 'fetchZones')
      .mockReturnValue();
    instance.componentDidMount();
    expect(fetchProductDetails).toHaveBeenCalledWith('123');
    expect(fetchZones).toHaveBeenCalled();
  });
});
