import React from 'react';
import { shallow } from 'enzyme';
import BuyerCart from 'lib/data-access/stores/buyer-cart';
import { mockErrorCart } from 'lib/mocks/cart';
import ShipmentCard from './';
import ProductRow from './product-row';

function setup(store: any) {
  const mockFetchClient = {
    fetch: jest.fn(),
  };

  const mockBuyerCartStore = BuyerCart.create(
    {
      cart: mockErrorCart,
    },
    {
      client: mockFetchClient,
    },
  );

  const mockStore = { buyerCart: store || mockBuyerCartStore };

  const props = {
    count: 3,
    index: 0,
    cartItems: mockBuyerCartStore.cart.items,
  };
  const productProps = {
    setRowSubtotals: jest.fn(),
    item: mockBuyerCartStore.cart.items[0],
    cartError: mockBuyerCartStore.cart.cartErrors[0],
  };
  const productRowWrapper = shallow(
    <ProductRow store={mockStore} {...productProps} />,
  ).dive();
  const shipmentWrapper = shallow(
    <ShipmentCard store={mockStore} {...props} />,
  ).dive();
  return { productRowWrapper, shipmentWrapper };
}

describe('ShipmentCart', () => {
  it('should render the shipment card', () => {
    const { shipmentWrapper } = setup();
    expect(shipmentWrapper.find('VendorCartHeader').text()).toEqual(
      'Shipment 1 of 3:THClear Co',
    );
  });

  it('should show inline error in the shipment cart', () => {
    const { shipmentWrapper } = setup();

    expect(shipmentWrapper.find('ErrorMessage').text()).toEqual(
      '<ErrorIcon /> THClear Co has a minimum order amount of $10,000.00.',
    );
  });
});

describe('ProductRow', () => {
  it('should render the product row', () => {
    const { productRowWrapper } = setup();

    expect(
      productRowWrapper
        .find('ProductDescription')
        .find('span')
        .first()
        .text(),
    ).toEqual('BATH BOMB - LAVENDER');
    expect(
      productRowWrapper
        .find('ProductDescription')
        .find('span')
        .last()
        .text(),
    ).toEqual('50 Units');
    expect(productRowWrapper.find('RowTotal').text()).toEqual('$100,000.00');
    expect(
      productRowWrapper.find('QuantityWrapper').props().outOfStock,
    ).toEqual(false);
    expect(
      productRowWrapper.find('ProductPhoto').props().style.backgroundImage,
    ).toEqual(
      'url(https://images-acceptance.internal-weedmaps.com/products/000/055/416/avatar/square/1508885935-bathbomb-LAVENDER.png)',
    );
  });

  it('should handle remove item', () => {
    const { productRowWrapper } = setup();
    const instance = productRowWrapper.instance();
    const onUpdate = jest.spyOn(instance, 'onUpdate').mockReturnValue();
    productRowWrapper.find('RemoveItem').simulate('click');
    expect(onUpdate).toHaveBeenCalledWith(0);
  });

  it('should handle subtracting quantity', () => {
    const { productRowWrapper } = setup();
    const instance = productRowWrapper.instance();
    const onUpdate = jest.spyOn(instance, 'onUpdate').mockReturnValue();
    expect(productRowWrapper.find('QuantityInput').props().value).toEqual(100);
    productRowWrapper
      .find('QuantityButton')
      .first()
      .simulate('click');
    expect(onUpdate).toHaveBeenCalledWith(99);
  });

  it('should handle adding quantity', () => {
    const { productRowWrapper } = setup();
    const instance = productRowWrapper.instance();
    const onUpdate = jest.spyOn(instance, 'onUpdate').mockReturnValue();
    expect(productRowWrapper.find('QuantityInput').props().value).toEqual(100);
    productRowWrapper
      .find('QuantityButton')
      .last()
      .simulate('click');
    expect(onUpdate).toHaveBeenCalledWith(101);
  });

  it('should handle when you input quantity', () => {
    const { productRowWrapper } = setup();
    expect(productRowWrapper.find('UpdateLink').exists()).toEqual(false);
    productRowWrapper
      .find('QuantityInput')
      .simulate('change', { target: { value: 10 } });
    expect(productRowWrapper.find('UpdateLink').exists()).toEqual(true);
    const onUpdate = jest
      .spyOn(productRowWrapper.instance(), 'onUpdate')
      .mockReturnValue();
    productRowWrapper.find('UpdateLink').simulate('click');
    expect(onUpdate).toHaveBeenCalledWith(10);
  });

  it('should render the CartError when there is an error', () => {
    const { productRowWrapper } = setup();
    expect(productRowWrapper.find('CartError').exists()).toEqual(true);
    expect(productRowWrapper.find('CartError').props().availableAmount).toEqual(
      null,
    );
  });

  it('should handle when component unmounts', () => {
    const { productRowWrapper } = setup();
    const dispose = jest.spyOn(productRowWrapper.instance(), 'dispose');
    const unset = jest.spyOn(productRowWrapper.instance(), 'unset');
    productRowWrapper.unmount();
    expect(dispose).toHaveBeenCalled();
    expect(unset).toHaveBeenCalled();
  });

  describe('when there is an updated quantity available', () => {
    let productRowWrapper;
    beforeEach(() => {
      const mockFetchClient = {
        fetch: jest.fn(),
      };
      const mockBuyerCartStore = BuyerCart.create(
        {
          cart: {
            ...mockErrorCart,
            cartErrors: [
              {
                itemId: 'fd12602a-fd03-4bd1-bc75-cdcc2b1f5dcd',
                error: 'quantity_unavailable',
              },
            ],
          },
        },
        {
          client: mockFetchClient,
        },
      );
      // eslint-disable-next-line
      productRowWrapper = setup(mockBuyerCartStore).productRowWrapper;
    });

    it('should call update when reset quantity is clicked', () => {
      expect(productRowWrapper.find('CartError').exists()).toEqual(true);
      const onUpdate = jest
        .spyOn(productRowWrapper.instance(), 'onUpdate')
        .mockReturnValue();
      productRowWrapper
        .find('CartError')
        .props()
        .onResetQuantity(100);
      expect(onUpdate).toHaveBeenCalledWith(100);
    });
  });
});
