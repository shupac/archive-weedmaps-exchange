import { shallow } from 'enzyme';
import { ToggleSwitch } from '@ghostgroup/ui';
import mockProductDetails from 'mocks/seller-product-details';
import mockZones from 'mocks/zones';

import ProductForm from './product-form';

function setup(props) {
  const formikProps = {
    values: mockProductDetails,
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    handleReset: jest.fn(),
    dirty: false,
  };

  const component = (
    <ProductForm zones={mockZones} {...formikProps} {...props} />
  );
  const wrapper = shallow(component);
  const instance = wrapper.instance();
  const Variants = instance.renderVariants({
    variants: mockProductDetails.product.variants,
    zones: mockZones,
  });
  const arrayHelpers = {
    push: jest.fn(),
    replace: jest.fn(),
    remove: jest.fn(),
  };
  const variantsWrapper = shallow(<Variants {...arrayHelpers} />);
  return { wrapper, formikProps, instance, variantsWrapper, arrayHelpers };
}

describe('Seller Product Details Page', () => {
  it('should render the component', () => {
    const { wrapper, variantsWrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
    expect(variantsWrapper.exists()).toEqual(true);
  });

  it('should handle product active toggle', () => {
    const { wrapper, formikProps } = setup();
    const toggle = wrapper.find(ToggleSwitch).first();
    const event = { target: null };
    toggle.props().onChange(event);
    expect(formikProps.handleChange).toHaveBeenCalledWith({
      target: {
        value: !mockProductDetails.active,
        name: 'active',
      },
    });
  });

  it('should handle add variant', () => {
    const { wrapper, arrayHelpers } = setup();
    wrapper
      .find('AddVariantButton')
      .first()
      .simulate('click');
    expect(arrayHelpers.push).toHaveBeenCalled();
  });

  it('should handle update variant', () => {
    const { variantsWrapper, arrayHelpers } = setup();
    variantsWrapper
      .find('VariantCard')
      .first()
      .props()
      .onUpdate({ foo: 'bar' });
    expect(arrayHelpers.replace).toHaveBeenCalledWith(0, {
      ...mockProductDetails.product.variants[0],
      foo: 'bar',
    });
  });

  it('should handle delete variant', () => {
    const { variantsWrapper, arrayHelpers } = setup();
    variantsWrapper
      .find('VariantCard')
      .first()
      .props()
      .onDelete();
    expect(arrayHelpers.remove).toHaveBeenCalledWith(0);
  });

  it('should show the footer when dirty', () => {
    const { wrapper } = setup({ dirty: true });
    expect(wrapper.find('Footer').exists()).toEqual(true);
  });
});
