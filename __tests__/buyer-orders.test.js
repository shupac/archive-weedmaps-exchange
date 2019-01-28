import { shallow } from 'enzyme';
import BuyerOrdersStore from 'lib/data-access/stores/buyer-orders';
import BuyerCart from 'lib/data-access/stores/buyer-cart';
import UiStore from 'lib/data-access/stores/ui';
import mockPurchaseOrders from 'lib/mocks/purchase-orders';
import BuyerPurchaseOrder from 'components/organisms/buyer-purchase-order';
import { BuyerOrdersPage } from 'pages/buyer-orders';

function setup(props) {
  const mockStore = {
    buyerOrders: BuyerOrdersStore.create({
      ordersList: mockPurchaseOrders,
      orderData: mockPurchaseOrders[0],
    }),
    uiStore: UiStore.create(),
    buyerCart: BuyerCart.create(),
  };

  const router = {
    pathname: '/buyer/orders/123',
    query: { orderId: mockPurchaseOrders[0].id },
  };

  const component = (
    <BuyerOrdersPage {...props} store={mockStore} router={router} />
  );

  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });

  return { wrapper, mockStore };
}

describe('BuyerOrdersPage', () => {
  it('should render the component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should trigger cancel order for purchase order', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const cancelOrder = jest.spyOn(instance, 'cancelOrder').mockReturnValue();
    wrapper.find(BuyerPurchaseOrder).prop('onCancelOrder')();
    expect(cancelOrder).toHaveBeenCalledWith(mockPurchaseOrders[0].id);
    cancelOrder.mockRestore();
  });

  it('should trigger reorder for purchase order', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const reorder = jest.spyOn(instance, 'reorder').mockReturnValue();
    wrapper.find(BuyerPurchaseOrder).prop('onReorder')();
    expect(reorder).toHaveBeenCalledWith(mockPurchaseOrders[0].id);
    reorder.mockRestore();
  });

  it('should handle cancel order', () => {
    const {
      wrapper,
      mockStore: { buyerOrders },
    } = setup();
    const instance = wrapper.instance();
    const cancelOrder = jest
      .spyOn(buyerOrders, 'cancelOrder')
      .mockReturnValue();
    instance.cancelOrder('123');
    expect(cancelOrder).toHaveBeenCalledWith('123');
  });

  it('should handle reorder', async () => {
    const { wrapper, mockStore } = setup();
    const { buyerOrders, uiStore, buyerCart } = mockStore;
    const instance = wrapper.instance();
    const reorder = jest.spyOn(buyerOrders, 'reorder').mockReturnValue(
      Promise.resolve({
        itemsAdded: 4,
      }),
    );
    const notifyToast = jest.spyOn(uiStore, 'notifyToast').mockReturnValue();
    const fetchCart = jest.spyOn(buyerCart, 'fetchCart').mockReturnValue();
    await instance.reorder('123');
    expect(reorder).toHaveBeenCalledWith('123');
    expect(notifyToast).toHaveBeenCalledWith({
      title: 'You added 4 items to you cart',
      link: { label: 'VIEW CART', route: '/buyer/cart' },
      status: 'SUCCESS',
      autoDismiss: 4000,
    });
    expect(fetchCart).toHaveBeenCalled();
  });

  it('should handle reorder with 1 item added', async () => {
    const { wrapper, mockStore } = setup();
    const { buyerOrders, uiStore, buyerCart } = mockStore;
    const instance = wrapper.instance();
    const reorder = jest.spyOn(buyerOrders, 'reorder').mockReturnValue(
      Promise.resolve({
        itemsAdded: 1,
      }),
    );
    const notifyToast = jest.spyOn(uiStore, 'notifyToast').mockReturnValue();
    const fetchCart = jest.spyOn(buyerCart, 'fetchCart').mockReturnValue();
    await instance.reorder('123');
    expect(reorder).toHaveBeenCalledWith('123');
    expect(notifyToast).toHaveBeenCalledWith({
      title: 'You added 1 item to you cart',
      link: { label: 'VIEW CART', route: '/buyer/cart' },
      status: 'SUCCESS',
      autoDismiss: 4000,
    });
    expect(fetchCart).toHaveBeenCalled();
  });

  it('should handle failed reorder', async () => {
    const { wrapper, mockStore } = setup();
    const { buyerOrders, uiStore, buyerCart } = mockStore;
    const instance = wrapper.instance();
    const reorder = jest
      .spyOn(buyerOrders, 'reorder')
      .mockReturnValue(Promise.resolve(false));
    const notifyToast = jest.spyOn(uiStore, 'notifyToast').mockReturnValue();
    const fetchCart = jest.spyOn(buyerCart, 'fetchCart').mockReturnValue();
    await instance.reorder('123');
    expect(reorder).toHaveBeenCalledWith('123');
    expect(notifyToast).toHaveBeenCalledWith({
      title: 'There were some issues with your request.',
      status: 'ERROR',
    });
    expect(fetchCart).toHaveBeenCalled();
  });
});
