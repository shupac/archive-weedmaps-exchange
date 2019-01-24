import { shallow } from 'enzyme';
import mockProductDetails from 'mocks/seller-product-details';
import mockZones from 'mocks/zones';

import VariantCard from './variant-card';

function setup(newProps) {
  const variant = mockProductDetails.product.variants[0];

  const props = {
    variant,
    zones: mockZones,
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    errors: {},
    touched: {},
    handleBlur: jest.fn(),
    namePath: 'product.variants',
    index: 0,
  };

  const component = <VariantCard {...props} {...newProps} />;
  const wrapper = shallow(component);
  const instance = wrapper.instance();

  const formData = {
    allocations: variant.allocations,
    errors: {},
    touched: {},
    handleBlur: jest.fn(),
  };
  const Allocations = instance.renderAllocations(formData);
  const arrayHelpers = {
    push: jest.fn(),
    replace: jest.fn(),
    remove: jest.fn(),
  };
  const allocationsWrapper = shallow(<Allocations {...arrayHelpers} />);
  return { wrapper, props, instance, allocationsWrapper, arrayHelpers };
}

describe('Seller Product Details Variant Card', () => {
  it('should render the component', () => {
    const { wrapper, allocationsWrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
    expect(allocationsWrapper.exists()).toEqual(true);
  });

  it('should update the name', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('FormInput').first();
    const event = { target: { value: 'foo' } };
    select.props().onChange(event);
    expect(props.onUpdate).toHaveBeenCalledWith({ name: 'foo' });
  });

  it('should update the sku', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('FormInput').at(1);
    const event = { target: { value: 'foo' } };
    select.props().onChange(event);
    expect(props.onUpdate).toHaveBeenCalledWith({ sku: 'foo' });
  });

  it('should update the size', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('FormInput').at(2);
    const event = { target: { value: '1' } };
    select.props().onChange(event);
    expect(props.onUpdate).toHaveBeenCalledWith({ size: '1' });
  });

  it('should render unit option name', () => {
    const { wrapper } = setup();
    const select = wrapper.find('StyledSelect');
    const option = { value: 'foo', text: 'bar' };
    expect(select.props().itemToString(option)).toEqual(option.text);
  });

  it('should update the zone', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('StyledSelect');
    const option = { value: 'foo', text: 'bar' };
    select.props().onChange(option);
    expect(props.onUpdate).toHaveBeenCalledWith({ unit: 'foo' });
  });

  it('should handle add allocation', () => {
    const { allocationsWrapper, arrayHelpers } = setup();
    allocationsWrapper
      .find('AddAllocation')
      .first()
      .simulate('click');
    expect(arrayHelpers.push).toHaveBeenCalled();
  });

  it('should handle update allocation', () => {
    const { allocationsWrapper, arrayHelpers, props } = setup();
    allocationsWrapper
      .find('AllocationRow')
      .first()
      .props()
      .onUpdate({ foo: 'bar' });
    expect(arrayHelpers.replace).toHaveBeenCalledWith(0, {
      ...props.variant.allocations[0],
      foo: 'bar',
    });
  });

  it('should handle delete allocation', () => {
    const { allocationsWrapper, arrayHelpers } = setup();
    allocationsWrapper
      .find('AllocationRow')
      .first()
      .props()
      .onDelete();
    expect(arrayHelpers.remove).toHaveBeenCalledWith(0);
  });

  it('should calculate available zones', () => {
    const { wrapper, instance, props } = setup();
    props.variant.allocations.push({
      id: 'abc',
      active: false,
      amount: '',
      currency: 'usd',
      price: '',
      isNew: true,
    });
    wrapper.setProps(props);
    expect(instance.getAvailableZones()).toMatchSnapshot();
  });

  it('should handle onBlur for the name', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('FormInput').first();
    const event = { target: { foo: 'bar' } };
    select.props().onBlur(event);
    expect(props.handleBlur).toHaveBeenCalledWith(event);
  });

  it('should handle onBlur for the sku', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('FormInput').at(1);
    const event = { target: { foo: 'bar' } };
    select.props().onBlur(event);
    expect(props.handleBlur).toHaveBeenCalledWith(event);
  });

  it('should handle onBlur for the size', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('FormInput').at(2);
    const event = { target: { foo: 'bar' } };
    select.props().onBlur(event);
    expect(props.handleBlur).toHaveBeenCalledWith(event);
  });

  it('should handle onBlur for the unit', () => {
    const { wrapper, props } = setup();
    const select = wrapper.find('StyledSelect');
    select.props().onBlur();
    expect(props.handleBlur).toHaveBeenCalledWith({
      target: {
        name: 'product.variants.0.unit',
      },
    });
  });

  it('should show errors', () => {
    const { wrapper } = setup({
      errors: {
        name: 'Test error',
        sku: 'Test error',
        size: 'Test error',
        unit: 'Test error',
      },
      touched: {
        name: true,
        sku: true,
        size: true,
        unit: true,
      },
    });
    expect(wrapper.find('FormInputError').length).toEqual(4);
  });
});
