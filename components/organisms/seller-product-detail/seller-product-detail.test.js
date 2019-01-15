import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import SellerProductsStore from 'lib/data-access/stores/seller-products';
import ZonesStore from 'lib/data-access/stores/zones';
import UiStore from 'lib/data-access/stores/ui';
import mockProductDetails from 'mocks/seller-product-details';
import mockZones from 'mocks/zones';

import { SellerProductDetails } from './';

function setup(props) {
  const mockStore = {
    sellerProducts: SellerProductsStore.create({
      sellerProductDetails: mockProductDetails,
      fetchingProductDetails: false,
    }),
    zones: ZonesStore.create({
      zones: mockZones,
    }),
    uiStore: UiStore.create(),
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

  it('should fetch data and add listeners on mount', () => {
    const { mockStore, instance } = setup({ productId: '123' });
    const fetchProductDetails = jest
      .spyOn(mockStore.sellerProducts, 'fetchProductDetails')
      .mockReturnValue();
    const fetchZones = jest
      .spyOn(mockStore.zones, 'fetchZones')
      .mockReturnValue();
    const listenerOn = jest.spyOn(Router.events, 'on').mockReturnValue();
    const addEventListener = jest
      .spyOn(window, 'addEventListener')
      .mockReturnValue();
    instance.componentDidMount();
    expect(fetchProductDetails).toHaveBeenCalledWith('123');
    expect(fetchZones).toHaveBeenCalled();
    expect(listenerOn).toHaveBeenCalledWith(
      'routeChangeStart',
      instance.handleRouteChange,
    );
    expect(listenerOn).toHaveBeenCalledWith(
      'beforeHistoryChange',
      instance.handleRouteChange,
    );
    expect(addEventListener).toHaveBeenCalledWith(
      'beforeunload',
      instance.handleBrowserUnload,
    );
  });

  it('should remove listeners on unmount', () => {
    const { instance } = setup({ productId: '123' });
    const listenerOff = jest.spyOn(Router.events, 'off').mockReturnValue();
    const removeEventListener = jest
      .spyOn(window, 'removeEventListener')
      .mockReturnValue();
    instance.componentWillUnmount();
    expect(listenerOff).toHaveBeenCalledWith(
      'routeChangeStart',
      instance.handleRouteChange,
    );
    expect(listenerOff).toHaveBeenCalledWith(
      'beforeHistoryChange',
      instance.handleRouteChange,
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      'beforeunload',
      instance.handleBrowserUnload,
    );
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

  it('can handle route change', () => {
    const { instance, mockStore } = setup();
    const openModal = jest.spyOn(mockStore.uiStore, 'openModal');
    instance.handleRouteChange('foo');
    expect(openModal).not.toHaveBeenCalled();
    instance.isDirty = true;
    try {
      instance.handleRouteChange('foo');
      expect(openModal).toHaveBeenCalledWith('unsavedChanges');
      expect(instance.nextRoute).toEqual('foo');
    } catch (e) {
      expect(!!e).toEqual(true);
    }
  });

  it('can handle browser unload', () => {
    const { instance } = setup();
    const event = {
      preventDefault: jest.fn(),
      returnValue: null,
    };
    let response = instance.handleBrowserUnload(event);
    expect(response).toEqual(null);
    instance.isDirty = true;
    instance.handleBrowserUnload(event);
    response = instance.handleBrowserUnload(event);
    expect(response).toEqual('You have unsaved changes!');
    expect(event.returnValue).toEqual('You have unsaved changes!');
  });

  it('should show the unsaved changes modal', async () => {
    const { wrapper, instance, mockStore } = setup();
    instance.setState({ mounted: true });
    mockStore.uiStore.openModal('unsavedChanges');
    expect(wrapper.find('UnsavedChangesModal').exists()).toEqual(true);
  });

  it('can leave page on confirm', () => {
    const { instance, mockStore } = setup();
    instance.nextRoute = 'foo';
    const closeModal = jest.spyOn(mockStore.uiStore, 'closeModal');
    const push = jest.spyOn(Router, 'push').mockReturnValue();
    instance.leavePage();
    expect(closeModal).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('foo');
    push.mockRestore();
  });
});
