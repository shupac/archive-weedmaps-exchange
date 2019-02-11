import React from 'react';
import { shallow } from 'enzyme';
import UiStore from 'lib/data-access/stores/ui';
import AuthStore from 'lib/data-access/stores/auth';
import { LICENSE_TYPES } from 'lib/common/constants';
import mockOrganization from 'lib/mocks/organization';
import mockUserData from 'lib/mocks/user-data';
import ProfileSettingsForm, { FormTemplate } from './profile-form';
import { SettingsProfile } from './';

function setup(org) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockUserData })),
  };
  const mockStore = {
    uiStore: UiStore.create(),
    authStore: AuthStore.create(
      { wmxUser: mockUserData, org },
      { client: mockFetchClient },
    ),
  };
  const component = <SettingsProfile store={mockStore} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  const instance = wrapper.instance();
  return { wrapper, instance, mockStore };
}

function formSetup() {
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
      setQuery: jest.fn(),
    },
    authStore: {
      wmxUser: mockUserData,
    },
  };
  const props = {
    errors: { name: 'address' },
    touched: { name: 'address' },
  };
  const formWrapper = shallow(
    <FormTemplate
      store={store}
      values={mockOrganization}
      licenseTypes={LICENSE_TYPES}
      {...props}
    />,
  );
  const instance = formWrapper.instance();
  return { formWrapper, instance, store };
}

describe('ProfileSettingsForm', () => {
  it('should not render the profile if there is no organization data', () => {
    const { wrapper } = setup(undefined);
    expect(wrapper.find(ProfileSettingsForm).length).toEqual(0);
  });
});

describe('LocationForm', () => {
  it('should render the Location Form with data, if data exists', () => {
    const { formWrapper } = formSetup();
    expect(formWrapper.exists()).toBe(true);
    expect(
      formWrapper.find('[data-test-id="form-name"]').props(),
    ).toHaveProperty('value', 'test');
  });

  it('FormTemplate should have values', () => {
    const { formWrapper } = formSetup();
    expect(formWrapper.props().value).not.toBeNull();
  });

  it('should render the Location Form with blank values if data does not exist', () => {
    const { formWrapper } = formSetup();
    expect(
      formWrapper.find('[data-test-id="form-name"]').props(),
    ).toHaveProperty('value', 'test');
    expect(
      formWrapper.find('[data-test-id="form-phone"]').props(),
    ).toHaveProperty('value', '(123) 456-6789');
    expect(
      formWrapper.find('[data-test-id="form-contact"]').props(),
    ).toHaveProperty('value', 'test contact');
    expect(
      formWrapper.find('[data-test-id="form-email"]').props(),
    ).toHaveProperty('value', 'weedmaps@weedmaps.com');
  });

  it('should not allow cancel or submit if the form state has not been changed', () => {
    const { formWrapper } = formSetup();
    const save = formWrapper.dive().find('[data-test-id="button-submit"]');
    expect(save.props().disabled).toBe(true);
  });

  it('should be able to pop success toast', async () => {
    const { instance, mockStore } = setup();
    const updateOrganization = jest
      .spyOn(mockStore.authStore, 'updateOrganization')
      .mockResolvedValue(true);
    instance.onSubmit(mockOrganization);
    expect(await updateOrganization).toHaveBeenCalled();
  });

  it('should be able to pop error toast', async () => {
    const { instance, mockStore } = setup();
    const updateOrganization = jest
      .spyOn(mockStore.authStore, 'updateOrganization')
      .mockResolvedValue(false);
    instance.onSubmit();
    expect(await updateOrganization).toHaveBeenCalled();
  });
});
