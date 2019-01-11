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
      fetchingProductDetails: false,
    }),
    sellerSettings: SellerSettingsStore.create({
      zones: mockZones,
    }),
  };

  const component = <SellerProductDetails store={mockStore} {...props} />;
  const wrapper = shallow(component, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  return { wrapper, mockStore, instance };
}

describe('Seller Product Details Page', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render the component after loading', () => {
    const { wrapper, instance } = setup();
    instance.setState({ mounted: true });
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

  it('should render the product form', () => {
    const { instance } = setup();
    const formikProps = {
      values: mockProductDetails,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      handleReset: jest.fn(),
      dirty: false,
      isSubmitting: false,
    };
    const ProductForm = instance.renderForm(mockZones);
    const productFormWrapper = shallow(
      <ProductForm zones={mockZones} {...formikProps} />,
    );
    expect(productFormWrapper.exists()).toEqual(true);
  });

  it('should handle submit form', async () => {
    const { instance, mockStore } = setup();
    const updateSellerProduct = jest
      .spyOn(mockStore.sellerProducts, 'updateSellerProduct')
      .mockReturnValue();
    const actions = {
      resetForm: jest.fn(),
      setSubmitting: jest.fn(),
    };
    await instance.onSubmit(mockProductDetails, actions);
    expect(updateSellerProduct).toHaveBeenCalledWith(mockProductDetails);
    expect(actions.setSubmitting).toHaveBeenCalled();
    expect(actions.resetForm).toHaveBeenCalled();
  });
});
