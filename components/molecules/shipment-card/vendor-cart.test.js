import React from 'react';
import { shallow } from 'enzyme';
import { mockErrorCart } from 'lib/mocks/cart';
import ShipmentCard from './';
import ProductRow from './product-row';

function setup() {
  const mockStore = {
    buyerCart: {
      cartItemCount: 2,
      cartErrors: [...mockErrorCart.cartErrors],
      updateCartItem: jest.fn(),
      cartErrorsByItemId: {
        'd054b34f-428e-4583-a2a4-27f4e5aea6f3': 'minimum_purchase',
      },
    },
  };
  const props = {
    count: 3,
    index: 0,
    cartItem: mockErrorCart.items,
  };
  const productProps = {
    setRowSubtotals: jest.fn(),
    item: mockErrorCart.items[0],
    cartError: mockErrorCart.cartErrors[0],
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
    expect(
      shipmentWrapper
        .find('VendorCartHeader')
        .dive()
        .text(),
    ).toEqual('Shipment 1 of 3:THClear Co');
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
    expect(
      productRowWrapper
        .find('SubtotalWrapper')
        .dive()
        .text(),
    ).toEqual('$100,000.00');
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
      5,
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
});
