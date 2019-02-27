import { shallow } from 'enzyme';
import { Router } from 'lib/routes';
import findByTestId from 'lib/jest/find-by-test-id';
import ToggleSwitch from '@ghostgroup/ui.toggle';
import ComboCheckbox from 'components/atoms/combo-checkbox';
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

describe('Seller Product Detail Product Form', () => {
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

  it('should handle contains cannabis checkbox click', () => {
    const { wrapper, formikProps } = setup();
    const checkbox = wrapper.find(ComboCheckbox);
    const event = { target: null };
    checkbox.props().onChange(false, event);
    expect(formikProps.handleChange).toHaveBeenCalledWith({
      target: {
        value: {
          ...mockProductDetails.product,
          containsCannabis: false,
        },
        name: 'product',
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

  it('should toggle the zones legend drawer', () => {
    const { wrapper, instance } = setup();
    const toggleBtn = findByTestId(wrapper, 'zones-link');
    toggleBtn.simulate('click', {
      preventDefault: () => {},
    });
    expect(instance.state).toEqual({
      drawerOpen: true,
    });
  });

  it('should navigate to manage zones page', () => {
    const { wrapper } = setup();
    const pushRoute = jest.spyOn(Router, 'pushRoute').mockReturnValue();
    const manageZonesBtn = findByTestId(wrapper, 'manage-zones-button');
    manageZonesBtn.simulate('click', {
      preventDefault: () => {},
    });
    expect(pushRoute).toHaveBeenCalled();
  });

  it('should call preventDefault when Enter is pressed', () => {
    const { wrapper } = setup();
    const { onKeyDown } = wrapper.find('StyledForm').props();
    const preventDefault = jest.fn();
    onKeyDown({ key: 'a', preventDefault });
    expect(preventDefault).not.toHaveBeenCalled();
    onKeyDown({ key: 'Enter', preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });
});
