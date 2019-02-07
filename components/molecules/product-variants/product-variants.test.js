import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import WmTheme from '@ghostgroup/ui.theme';
import TextInput from 'components/atoms/forms/text-input';
import { mockVariants } from 'lib/mocks/product-details';
import { ProductVariants } from './index';
import VariantRow from './variant-row';
import { QuantityAlert, ResetLink, Stock, TableWrap } from './styles';

function setup(cartResp) {
  const mockStore = {
    buyerCart: {
      addCartItems: jest.fn().mockReturnValue(Promise.resolve(cartResp)),
    },
    uiStore: {
      notifyToast: jest.fn(),
    },
    buyerProducts: {
      productDetails: {
        name: 'name',
      },
    },
  };
  const component = shallow(
    <ProductVariants variants={mockVariants} store={mockStore} />,
  );
  return { mockStore, component };
}

describe('Product Variants', () => {
  it('should render a variant grid if data exists', () => {
    const { mockStore } = setup();
    const component = shallow(
      <ProductVariants variants={mockVariants} store={mockStore} />,
    );

    expect(component.find(TableWrap).exists()).toEqual(true);
  });
  it('should give the correct variant', () => {
    const { mockStore } = setup();
    const component = shallow(
      <ProductVariants variants={mockVariants} store={mockStore} />,
    );

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
    const { mockStore } = setup();
    const component = shallow(
      <ProductVariants variants={mockVariants} store={mockStore} />,
    );
    expect(
      component
        .find('[data-test-id="form"]')
        .dive()
        .find('[data-test-id="add-to-cart-button"]')
        .props().disabled,
    ).toEqual(true);
  });
  it('should have the button enabled if there is a quantity', () => {
    const { mockStore } = setup();
    const component = mount(
      <ThemeProvider theme={WmTheme}>
        <ProductVariants variants={mockVariants} store={mockStore} />
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
    const { mockStore } = setup();
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
    const component = shallow(
      <ProductVariants variants={outOfStockVariant} store={mockStore} />,
    );
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
  describe('when there are cartErrors', () => {
    it('will render inline error alert with Reset Quantity link', () => {
      const variant = {
        id: '82244edd-60a6-4c0d-8984-9570b720c204',
        name: '50 Units',
        size: 50,
        unit: 'unit',
        price: 50,
        amount: 499,
        inStock: true,
      };
      const cartError = {
        itemId: 'a4844a49-7f92-4e2f-be6d-60bb072a4447',
        error: 'quantity_unavailable',
      };
      const component = shallow(
        <VariantRow
          variant={variant}
          error={false}
          fieldValue={3}
          handleChange={jest.fn()}
          resetField={jest.fn()}
          cartError={cartError}
        />,
      );
      expect(
        component
          .find(QuantityAlert)
          .dive()
          .find(ResetLink)
          .exists(),
      ).toEqual(true);
    });
    it('handles Reset Quantity link clicks', () => {
      const variant = {
        id: '82244edd-60a6-4c0d-8984-9570b720c204',
        name: '50 Units',
        size: 50,
        unit: 'unit',
        price: 50,
        amount: 499,
        inStock: true,
      };
      const cartError = {
        itemId: 'a4844a49-7f92-4e2f-be6d-60bb072a4447',
        error: 'quantity_unavailable',
      };
      const resetField = jest.fn();
      const component = shallow(
        <VariantRow
          variant={variant}
          error={false}
          fieldValue={3}
          handleChange={jest.fn()}
          resetField={resetField}
          cartError={cartError}
          resetCartErrors={jest.fn()}
        />,
      );
      component
        .find(QuantityAlert)
        .dive()
        .find(ResetLink)
        .simulate('click');
      expect(resetField).toHaveBeenCalled();
    });
    it('will make the ResetLink disappear once it is clicked', () => {
      const { mockStore } = setup();
      const component = shallow(
        <ProductVariants variants={mockVariants} store={mockStore} />,
      );
      component.setState({
        cartErrors: [
          {
            itemId: 'cb429ae1-cb29-46b8-adcc-1eb234dc266b',
            error: 'quantity_unavailable',
          },
        ],
      });
      component
        .find('Formik')
        .dive()
        .find('VariantRow')
        .first()
        .dive()
        .find(ResetLink)
        .simulate('click');
      expect(
        component
          .find('Formik')
          .dive()
          .find('VariantRow')
          .first()
          .dive()
          .find(ResetLink)
          .exists(),
      ).toEqual(false);
    });
    it('will show an available variant as in-stock after an error', () => {
      const variant = {
        id: '82244edd-60a6-4c0d-8984-9570b720c204',
        name: '50 Units',
        size: 50,
        unit: 'unit',
        price: 50,
        amount: 499,
        inStock: true,
      };
      const cartError = {
        itemId: 'a4844a49-7f92-4e2f-be6d-60bb072a4447',
        error: 'quantity_unavailable',
      };
      const component = shallow(
        <VariantRow
          variant={variant}
          error={false}
          fieldValue={3}
          handleChange={jest.fn()}
          resetField={jest.fn()}
          cartError={cartError}
        />,
      );
      expect(
        component
          .find(Stock)
          .text()
          .includes('In Stock'),
      ).toEqual(true);
    });
    it('will not render a Reset Quantity button if the variant is no longer available', () => {
      const variant = {
        id: '82244edd-60a6-4c0d-8984-9570b720c204',
        name: '50 Units',
        size: 50,
        unit: 'unit',
        price: 50,
        amount: 499,
        inStock: true,
      };
      const cartError = {
        itemId: 'a4844a49-7f92-4e2f-be6d-60bb072a4447',
        error: 'location_unavailable',
      };
      const component = shallow(
        <VariantRow
          variant={variant}
          error={false}
          fieldValue={3}
          handleChange={jest.fn()}
          resetField={jest.fn()}
          cartError={cartError}
        />,
      );
      expect(
        component
          .find(QuantityAlert)
          .dive()
          .find(ResetLink)
          .exists(),
      ).toEqual(false);
    });
    it('will display a variant as out-of-stock if no longer available', () => {
      const variant = {
        id: '82244edd-60a6-4c0d-8984-9570b720c204',
        name: '50 Units',
        size: 50,
        unit: 'unit',
        price: 50,
        amount: 499,
        inStock: true,
      };
      const cartError = {
        itemId: 'a4844a49-7f92-4e2f-be6d-60bb072a4447',
        error: 'location_unavailable',
      };
      const component = shallow(
        <VariantRow
          variant={variant}
          error={false}
          fieldValue={3}
          handleChange={jest.fn()}
          resetField={jest.fn()}
          cartError={cartError}
        />,
      );
      expect(
        component
          .find(Stock)
          .text()
          .includes('Out of Stock'),
      ).toEqual(true);
    });
  });
  describe('can calculate', () => {
    it('the total price', () => {
      const component = new ProductVariants({
        variants: mockVariants,
      });
      const total = component.calculateTotal({
        'cb429ae1-cb29-46b8-adcc-1eb234dc266b': 4,
      });
      expect(total).toEqual('$80.00');
    });
    it('the total quantity', () => {
      const component = new ProductVariants({
        variants: mockVariants,
      });
      const quantity = component.calculateQuantity({
        'cb429ae1-cb29-46b8-adcc-1eb234dc266b': 4,
      });
      expect(quantity).toEqual(4);

      const nonValid = component.calculateQuantity({
        'cb429ae1-cb29-46b8-adcc-1eb234dc266b': -4,
      });
      expect(nonValid).toEqual(0);
    });
  });
  it('can validate form quantities', () => {
    const component = new ProductVariants({
      variants: mockVariants,
    });
    // Test validation for negative values
    const negativeError = component.validateQuantity(-2);
    expect(negativeError).toEqual('Must be positive value');

    // Test validation for non-whole values
    const fractionError = component.validateQuantity(2.5);
    expect(fractionError).toEqual('Must be whole value');

    // Test validation for empty strings
    const stringError = component.validateQuantity('');
    expect(stringError).toBe(false);

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
      const component = new ProductVariants({
        variants: mockVariants,
      });
      const negative = component.validateForm(formVals);
      expect(negative).toEqual({
        '67879046-6491-4f6b-869b-75e94adeb9f0': 'Must be positive value',
      });
    });
  });
  describe('when submitting the form', () => {
    it('can format the form values for the API', () => {
      const component = new ProductVariants({
        variants: mockVariants,
      });
      const transformed = component.transformFormValues({
        '630580e0-c20b-48fc-8ea1-e03abe831b05': 12,
      });
      expect(transformed).toEqual([
        {
          variant_id: '630580e0-c20b-48fc-8ea1-e03abe831b05',
          quantity: 12,
        },
      ]);
    });
    it('filters nonexistent form values for the API', () => {
      const component = new ProductVariants({
        variants: mockVariants,
      });
      const transformed = component.transformFormValues({
        'cb429ae1-cb29-46b8-adcc-1eb234dc266b': 5,
        '888c600e-0d09-4acf-95ae-90c28ad3552c': 8,
        '630580e0-c20b-48fc-8ea1-e03abe831b05': 12,
      });
      expect(transformed).toEqual([
        {
          variant_id: 'cb429ae1-cb29-46b8-adcc-1eb234dc266b',
          quantity: 5,
        },
        {
          variant_id: '630580e0-c20b-48fc-8ea1-e03abe831b05',
          quantity: 12,
        },
      ]);
    });
    it('can handle when there are no cart errors ', () => {
      const { component, mockStore } = setup({ cartErrors: [] });
      const instance = component.instance();
      const formVals = { '40de494e-c0bb-425d-af96-9760c9f27f4f': 3 };
      const setSubmitting = jest.fn();
      instance.handleSubmit(formVals, { setSubmitting });
      expect(mockStore.buyerCart.addCartItems).toHaveBeenCalled();
    });
    it('can handle when there are cart errors', () => {
      const { component, mockStore } = setup({
        cartErrors: [{ error: 'error' }],
      });
      const instance = component.instance();
      const formVals = { '40de494e-c0bb-425d-af96-9760c9f27f4f': 3 };
      const setSubmitting = jest.fn();
      instance.handleSubmit(formVals, { setSubmitting });
      expect(mockStore.buyerCart.addCartItems).toHaveBeenCalled();
    });
  });
});
