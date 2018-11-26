import React from 'react';
import { shallow } from 'enzyme';
import { mockFormLocation } from 'lib/mocks/location';
import { LICENSE_TYPES } from 'lib/common/constants';
import { FormTemplate } from './location-form';

function setup() {
  const store = {
    uiStore: {
      modalIsOpen: false,
      onCloseModal: jest.fn(),
    },
    buyerSettings: {
      createNewLocation: jest.fn(),
    },
    addressSuggestions: {
      isAddressCommitted: jest.fn(),
    },
  };
  const props = {
    errors: { name: 'address' },
    touched: { name: 'address' },
  };
  const wrapper = shallow(
    <FormTemplate
      store={store}
      values={mockFormLocation}
      licenseTypes={LICENSE_TYPES}
      {...props}
    />,
  );
  return { wrapper };
}

describe('LocationForm', () => {
  it('should render the Location Form with data, if data exists', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-test-id="form"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="form-name"]').props()).toHaveProperty(
      'value',
      'ShowGrow Irvine',
    );
  });

  it('FormTemplate should have values', () => {
    const { wrapper } = setup();
    expect(wrapper.props().value).not.toBeNull();
  });

  it('should render the Location Form with blank values if data does not exist', () => {
    const { wrapper } = setup();
    expect(wrapper.find('[data-test-id="form"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="form-name"]').props()).toHaveProperty(
      'value',
      'ShowGrow Irvine',
    );
    expect(wrapper.find('[data-test-id="form-phone"]').props()).toHaveProperty(
      'value',
      '(213) 973-5232',
    );
    expect(
      wrapper.find('[data-test-id="form-contact"]').props(),
    ).toHaveProperty('value', 'John Doe');
    expect(wrapper.find('[data-test-id="form-email"]').props()).toHaveProperty(
      'value',
      'john@showgrowirvine.com',
    );
  });

  it('should not allow cancel or submit if the form state has not been changed', () => {
    const { wrapper } = setup();
    const save = wrapper.dive().find('[data-test-id="button-submit"]');
    expect(save.props().disabled).toBe(true);
  });
});
