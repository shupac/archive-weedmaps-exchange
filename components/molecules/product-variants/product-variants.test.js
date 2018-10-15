import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';
import TextInput from 'components/atoms/forms/text-input';
import { mockVariants } from 'lib/mocks/product-details';
import ProductVariants from './index';
import { TableWrap } from './styles';

describe('Product Variants', () => {
  it('should render a variant grid if data exists', () => {
    const component = shallow(<ProductVariants variants={mockVariants} />);
    expect(component.find(TableWrap).exists()).toEqual(true);
  });
  it('should give the correct variant', () => {
    const component = shallow(<ProductVariants variants={mockVariants} />);

    expect(
      component
        .find('[data-test-id="form"]')
        .dive()
        .find('[data-test-id="data-row"]').length,
    ).toEqual(2);

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
    ).toEqual('Gram Packs');

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
    ).toEqual('$20.00');

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
    const component = shallow(<ProductVariants variants={mockVariants} />);
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
        <ProductVariants variants={mockVariants} />
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
  it('will display N/A when variant is Out of Stock', () => {
    const outOfStockVariant = [
      {
        id: 'cb429ae1-cb29-46b8-adcc-1eb234dc266b',
        name: 'Gram Packs',
        size: 1,
        unit: 'gram',
        price: 20,
        amount: 151,
        inStock: false,
      },
    ];
    const component = shallow(<ProductVariants variants={outOfStockVariant} />);
    expect(
      component
        .find('Formik')
        .dive()
        .find('VariantRow')
        .first()
        .dive()
        .find('span')
        .text(),
    ).toEqual('N/A');
  });
  describe('can calculate', () => {
    it('the total price', () => {
      const component = new ProductVariants({ variants: mockVariants });
      const total = component.calculateTotal({
        'cb429ae1-cb29-46b8-adcc-1eb234dc266b': 4,
      });
      expect(total).toEqual('$80.00');
    });
    it('the total quantity', () => {
      const component = new ProductVariants({ variants: mockVariants });
      const quantity = component.calculateQuantity({
        'cb429ae1-cb29-46b8-adcc-1eb234dc266b': 4,
      });
      expect(quantity).toEqual(4);
    });
  });
  it('can validate form quantities', () => {
    const component = new ProductVariants({ variants: mockVariants });
    // Test validation for negative values
    const negativeError = component.validateQuantity(-2);
    expect(negativeError).toEqual('Must be positive value');

    // Test validation for non-whole values
    const fractionError = component.validateQuantity(2.5);
    expect(fractionError).toEqual('Must be whole value');

    // Test validation for valid values
    const legitVal = component.validateQuantity(2);
    expect(legitVal).toBe(false);
  });

  describe('will validate the form', () => {
    it('when value is not a number', () => {
      const formVals = {
        'b3527898-b6e5-4fa7-8de0-35e4e43277db': 10,
        '67879046-6491-4f6b-869b-75e94adeb9f0': -12,
      };
      const component = new ProductVariants({ variants: mockVariants });
      const negative = component.validateForm(formVals);
      expect(negative).toEqual({
        '67879046-6491-4f6b-869b-75e94adeb9f0': 'Must be positive value',
      });
    });
  });
});
