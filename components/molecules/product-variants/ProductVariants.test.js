import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';
import { mockVariants } from 'lib/mocks/product-details';
import ProductVariants from './index';
import { TableWrap } from './styles';
import TextInput from '../../atoms/forms/text-input';

const variantData = mockVariants.filter(item => item.type === 'variant');
describe('Product Variants', () => {
  it('should render a variant grid if data exists', () => {
    const component = shallow(<ProductVariants variants={variantData} />);
    expect(component.find(TableWrap).exists()).toEqual(true);
  });
  it('should give the correct variant', () => {
    const component = shallow(<ProductVariants variants={variantData} />);

    expect(
      component
        .find('[data-test-id="form"]')
        .dive()
        .find('[data-test-id="data-row"]').length,
    ).toEqual(3);

    expect(
      component
        .find('[data-test-id="form"]')
        .dive()
        .find('[data-test-id="data-row"]')
        .first()
        .dive()
        .find('p')
        .first()
        .text(),
    ).toEqual('1 Gram Bag');

    expect(
      component
        .find('[data-test-id="form"]')
        .dive()
        .find('[data-test-id="data-row"]')
        .first()
        .dive()
        .find('p')
        .last()
        .text(),
    ).toEqual('$15.99');

    expect(
      component
        .find('[data-test-id="form"]')
        .dive()
        .find('[data-test-id="data-row"]')
        .first()
        .dive()
        .find('[data-test-id="stock"]')
        .props().inStock,
    ).toEqual(true);
  });
  it('should have the button disabled if there is no quantity', () => {
    const component = shallow(<ProductVariants variants={variantData} />);
    expect(
      component
        .find('[data-test-id="form"]')
        .dive()
        .find('[data-test-id="add-to-cart-button"]')
        .props().disabled,
    ).toEqual(true);
  });
  it('should have the button enabled if there is a quantity', () => {
    const component = mount(
      <ThemeProvider theme={WmTheme}>
        <ProductVariants variants={variantData} />
      </ThemeProvider>,
    );

    component
      .find(TextInput)
      .first()
      .find('input')
      .simulate('change', {
        target: {
          name: 12341254,
          value: 1,
        },
      });
    expect(
      component
        .find('[data-test-id="add-to-cart-button"]')
        .first()
        .props().disabled,
    ).toEqual(false);
  });
});
