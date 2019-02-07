import { shallow } from 'enzyme';
import { mockBrand, mockBrandForForm } from 'lib/mocks/brands';
import GeneralSettingsForm, { FormTemplate } from './general-settings-form';

function setup(isDirty) {
  const ETATimes = [
    { text: 'Minute(s)', value: 'min' },
    { text: 'Hour(s)', value: 'hr' },
    { text: 'Day(s)', value: 'day' },
    { text: 'Week(s)', value: 'week' },
  ];

  const formikProps = {
    values: {
      ...mockBrandForForm,
      etaTimes: ETATimes,
    },
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    handleReset: jest.fn(),
    setFieldValue: jest.fn(),
    dirty: isDirty,
    isSubmitting: false,
    errors: {},
  };

  const parentComponent = (
    <GeneralSettingsForm brand={mockBrand} etaTimes={ETATimes} />
  );
  const childComponent = <FormTemplate {...formikProps} />;
  const parentWrapper = shallow(parentComponent);
  const childWrapper = shallow(childComponent);
  return { childWrapper, parentWrapper };
}

describe('GeneralSettingsForm', () => {
  it('should render the component', () => {
    const { childWrapper } = setup(false);
    expect(childWrapper.exists()).toEqual(true);
  });

  it('should have values', () => {
    const { childWrapper } = setup();
    expect(childWrapper.props().value).not.toBeNull();
  });

  it('should render the form with data, if data exists', () => {
    const { childWrapper } = setup();
    expect(childWrapper.exists()).toBe(true);
    expect(
      childWrapper.find('[data-test-id="shipping-fee"]').props(),
    ).toHaveProperty('value', '100.00');
    expect(
      childWrapper.find('[data-test-id="minimum-purchase"]').props(),
    ).toHaveProperty('value', '80.00');
    expect(
      childWrapper.find('[data-test-id="eta-min"]').props(),
    ).toHaveProperty('value', 1);
    expect(
      childWrapper.find('[data-test-id="eta-min-unit"]').props(),
    ).toHaveProperty('selectedItem', { text: 'Hour(s)', value: 'hr' });
    expect(
      childWrapper.find('[data-test-id="eta-max"]').props(),
    ).toHaveProperty('value', 2);
    expect(
      childWrapper.find('[data-test-id="eta-max-unit"]').props(),
    ).toHaveProperty('selectedItem', { text: 'Hour(s)', value: 'hr' });
  });

  it('should disable submit if the form state has not changed', () => {
    const { childWrapper } = setup();
    const save = childWrapper.find('[data-test-id="button-submit"]');
    expect(save.props().disabled).toBe(true);
  });

  it('should enable submit if the form state has changed', () => {
    const { childWrapper } = setup(true);
    const save = childWrapper.find('[data-test-id="button-submit"]');
    expect(save.props().disabled).toBe(false);
  });
});
